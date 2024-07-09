import { HubConnection, HubConnectionBuilder, LogLevel, RetryContext } from '@microsoft/signalr';
import { AnyAction, Dispatch, Middleware } from 'redux';
import { ErrorToast, InfoToast } from '../entities/toasts/Toasts';
import { AppThunkAction } from '../store/stores/ApplicationState';
import { ToastDispatchables } from '../store/stores/toasts/Toasts.Actions';
import { AuthorizedWebService } from './AuthorizedWebService';
import { HubConfig } from "./config/HubConfig";

/**
 * Provides basic functionality for connecting to and managing a web sockets connection.
 */
export abstract class BaseHub<TConfig extends HubConfig> extends AuthorizedWebService {
    public constructor(config: TConfig) {
        super();
        this.config = config;
    }

    protected readonly config: TConfig;
    protected _dispatch?: Dispatch<any>;
    public set dispatch(dispatch: Dispatch<AnyAction>) {
        this._dispatch = dispatch;
    }

    private readonly createConnectionPromise = () => new Promise<HubConnection>((resolve, reject) => {
            this.connectionResolver = resolve;
            this.connectionRejector = reject;
    });
    protected connection: Promise<HubConnection> = this.createConnectionPromise();
    protected connectionResolver?: ((value: HubConnection | PromiseLike<HubConnection>) => void);
    protected connectionRejector?: ((reason?: any) => void);

    public get middleware(): Middleware[] {
        return [
            () => (next) => (action) => {
                try {
                    const hubAction = action as HubAction;
                    if (hubAction.name != this.config.name) {
                        return;
                    }
                    switch (hubAction.type) {
                        case 'HUB_ON':
                            this.start();
                            return;
                        case 'HUB_OFF':
                            this.stop();
                            return;
                        case 'HUB_RESTART':
                            this.restart();
                            return;
                    }
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    next(action);
                }
            }
        ]
    }

    /**
     * Creates a new websockets connection.
     * @returns A new hub connection to the configured endpoint.
     */
    private createConnection(): HubConnection {
        const connection = new HubConnectionBuilder()
            .withUrl(this.config.endpoint, {
                accessTokenFactory: async () => await this.getToken()
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext: RetryContext) => {
                    const retryTimeoutIndex = Math.min(retryContext.previousRetryCount, this.config.retryTimeouts.length - 1);
                    return this.config.retryTimeouts[retryTimeoutIndex];
                }
            })
            .configureLogging(LogLevel.Information)
            .build();
        connection.onreconnecting(this.onReconnecting.bind(this));
        connection.onclose(this.onClose.bind(this));
        return connection;
    }

    /**
     * Starts the hub service.
     */
    protected async start(): Promise<void> {
        try {
            this.connectionRejector && this.connectionRejector(`The ${this.config.name} connection is being restarted.`);
            this.connection = this.createConnectionPromise();
            const connection = this.createConnection();
            await connection.start();
            this.connectionResolver!(connection);
        }
        catch (e) {
            console.error(e);
            this._dispatch && ToastDispatchables.toast(new ErrorToast("Unrecoverable error encountered while starting live updates."), this._dispatch);
        }
    }

    /**
     * Stops the hub service.
     */
    protected async stop(): Promise<void> {
        this.connectionRejector && this.connectionRejector(`The ${this.config.name} connection was terminated.`);
        (await this.connection).stop;
    }

    /**
     * Restarts the hub connection.
     */
    protected async restart(): Promise<void> {
        await this.stop();
        await this.start();
    }

    /**
     * Handles a reconnect event.
     * @param error The error, if it exists.
     */
    protected onReconnecting(error?: Error): void {
        if (error) {
            console.error(error);
        }
        this._dispatch && ToastDispatchables.toast(new ErrorToast("Live updates lost, attempting to reconnect. Refreshing might fix the issue."), this._dispatch);
    }

    /**
     * Handles a close event.
     * @param error The error, if it exists.
     */
    protected onClose(error?: Error): void {
        if (error) {
            console.error(error);
            this._dispatch && ToastDispatchables.toast(new ErrorToast("Live updates terminated unexpectedly."), this._dispatch);
        }
        else {
            this._dispatch && ToastDispatchables.toast(new InfoToast("Live updates have ended."), this._dispatch);
        }
    }

    protected invokeDispatch(fn: (...args: any[]) => void): (...args: any[]) => void {
        if (this._dispatch == undefined) {
            throw new Error("Dispatch not initialized.");
        }
        return (...args) => this._dispatch!(fn(...args));
    }
}

type HubOn = { type: 'HUB_ON', name: string };
type HubOff = { type: 'HUB_OFF', name: string };
type HubRestart = { type: 'HUB_RESTART', name: string };
export type HubAction = HubOn | HubOff | HubRestart;
export const HubActions = {
    hubOn: (name: string): AppThunkAction<HubOn> =>
        (dispatch) => dispatch({ type: 'HUB_ON', name }),
}
export const CreateCompletedPromise = () => {
    return new Promise<void>((resolve) => {
        resolve();
    })
}

export const CreateThrottlePromise = () => {
    let resolver: () => unknown = () => {};
    return [resolver, new Promise<void>((resolve) => {
        resolver = resolve;
    })];
}

export class TimedThrottle {
    public constructor(timeoutDelay: number) {
        this.timeoutDelay = timeoutDelay;

        const lock = new Promise<void>(resolve => {
            this.resolve = resolve;
        });
        this.lock = lock;
    }

    private readonly timeoutDelay: number;
    private timeout?: NodeJS.Timeout | number;
    private readonly lock: Promise<void>;
    private resolve?: () => unknown;

    public scheduleProcess(callback: () => Promise<unknown>): Promise<void> {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            await callback();
            if (this.resolve) {
                this.resolve();
            }
        }, this.timeoutDelay);
        return this.lock;
    }
}
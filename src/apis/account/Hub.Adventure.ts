import { AdventureActions } from "../../store/stores/adventures/AdventureStore.Actions";
import { BaseHub } from "../Hub.Base";
import { AccountApiConfig } from "./config/AccountApiConfig";
import { AdventureHubConfig } from "./config/AdventureHubConfig";

export class AdventureHub extends BaseHub<typeof AdventureHubConfig> {
    protected get audience(): string {
        return AccountApiConfig.audience;
    }
    
    protected async start(): Promise<void> {
        await super.start();
        const connection = await this.connection;
        connection.on('PlayerJoined', this.invokeDispatch(AdventureActions.playerJoined));
        connection.on('PlayerLeft', this.invokeDispatch(AdventureActions.playerLeft));
        connection.on('PushNewEvent', this.invokeDispatch(AdventureActions.pushNewEvent));
        connection.on('SetCommunalDice', this.invokeDispatch(AdventureActions.setCommunalDice));
    }
}
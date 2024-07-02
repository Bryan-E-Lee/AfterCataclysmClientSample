import { BaseApi } from "../Api.Base";
import { AccountApiConfig } from "./config/AccountApiConfig";

export abstract class AccountApi<TConfig> extends BaseApi<TConfig> {
    protected get audience(): string {
        return AccountApiConfig.audience;
    }
}
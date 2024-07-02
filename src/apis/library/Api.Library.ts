import { BaseApi } from "../Api.Base";
import { LibraryApiConfig } from "./config/LibraryApiConfig";

export abstract class LibraryApi<TConfig> extends BaseApi<TConfig> {
    protected get audience(): string {
        return LibraryApiConfig.audience;
    }
}
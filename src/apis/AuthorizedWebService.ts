import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";
import { AuthConfig } from "../config/AuthConfig";

export abstract class AuthorizedWebService {
    protected abstract get audience(): string;

    private async getClient(): Promise<Auth0Client> {
        return await createAuth0Client({
            domain: AuthConfig.domain,
            client_id: AuthConfig.clientId
        });
    }

    protected async getToken(...permissions: string[]): Promise<string> {
        const client = await this.getClient();
        return await client.getTokenSilently({
            audience: this.audience,
            scope: permissions.join(' ')
        });
    }
}
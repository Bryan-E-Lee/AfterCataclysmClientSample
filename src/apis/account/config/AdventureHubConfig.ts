import { HubConfig } from "../../config/HubConfig";

const adventureProdUri = "https://800ac-account-events.azurewebsites.net/api/v1.0/Hubs/Adventure";

export const AdventureHubConfig: HubConfig = Object.freeze({
    name: 'Adventure',
    endpoint: process.env.NODE_ENV === 'production'
        ? adventureProdUri
        : "https://localhost:7288/api/v1.0/Hubs/Adventure",
    retryTimeouts: [
        3000,
        5000,
        10000,
        15000,
        30000
    ]
});
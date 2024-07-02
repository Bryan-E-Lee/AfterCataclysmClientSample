const accountProdUri = "https://800ac-account.azurewebsites.net";

export const AccountApiConfig = Object.seal({
    audience: "https://dev-u78cwas5.us.auth0.com/api/v2/",
    uri: process.env.NODE_ENV === "production"
        ? accountProdUri
        : "https://localhost:7018"
});
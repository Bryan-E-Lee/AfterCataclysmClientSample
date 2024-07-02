const libraryProdUri = 'https://800ac-library.azurewebsites.net';

export const LibraryApiConfig = {
    audience: libraryProdUri,
    uri: process.env.NODE_ENV === 'production'
        ? libraryProdUri
        : 'https://localhost:7184'
};
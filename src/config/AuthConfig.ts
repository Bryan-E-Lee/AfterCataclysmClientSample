export const AuthConfig = {
    domain: 'dev-u78cwas5.us.auth0.com',
    clientId: 'bV0wAKzHXMYGSx4kB4RNEqS8UpdGVp2i'
}

export enum AuthorizedRoles {
    CharacterCreate = 'create:character',
    CharacterUpdate = 'update:character',
    CharacterDelete = 'delete:character',
    LibraryRead = 'read:library',
    LibraryCreate = 'create:library',
    LibraryUpdate = 'update:library',
    LibraryDelete = 'delete:library'
}
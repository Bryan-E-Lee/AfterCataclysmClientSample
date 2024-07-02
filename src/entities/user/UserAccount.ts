export interface UserAccount {
    id: string;
    name: string;
    displayName?: string;
    identifier: string;
    ownedBooks: string[];
}
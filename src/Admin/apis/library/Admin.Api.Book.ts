import { LibraryApi } from "../../../apis/library/Api.Library";
import { ApiResponse } from "../../../apis/responses/ApiResponse";
import { AuthorizedRoles } from "../../../config/AuthConfig";
import { Book } from "../../../entities/library/books/Book";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class AdminBookApi extends LibraryApi<typeof LibraryApiServerConfig.BookApiConfig> {
    public async getAll(): Promise<ApiResponse<Book[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            //TODO: Auth0 does not recognize when it has asked for consent for new permissions, so must use existing permission for now.
            const token= await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method
            });

            if (this.isServerError(response)) {
                throw new Error('Server error while retrieving books.');
            }

            return await this.generateResponse(response, []);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async create(book: Book): Promise<ApiResponse<Book>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('create');
            const token = await this.getToken(AuthorizedRoles.LibraryCreate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(book)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error creating ${book.name}.`);
            }
            
            return this.generateResponse(response);
        }
        catch (e){ 
            console.error(e);
            throw e;
        }
    }
    
    public async update(book: Book): Promise<ApiResponse<Book>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('update', {
                name: ':id',
                value: book.id,
            });
            const token = await this.getToken(AuthorizedRoles.LibraryUpdate);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(book)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error updating ${book.name}.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async delete(id: string): Promise<ApiResponse<void>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('delete', {
                name: ':id',
                value: id
            });
            const token = await this.getToken(AuthorizedRoles.LibraryDelete);
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(token),
                method,
                body: JSON.stringify(token)
            });

            if (this.isServerError(response)) {
                throw new Error(`Server error deleting book.`);
            }

            return this.generateResponse(response);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
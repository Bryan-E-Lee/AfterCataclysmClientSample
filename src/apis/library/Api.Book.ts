import { Book } from "../../entities/library/books/Book";
import { ApiResponse } from "../responses/ApiResponse";
import { LibraryApi } from "./Api.Library";
import { LibraryApiServerConfig } from "./config/LibraryApiServerConfig";

export class BookApi extends LibraryApi<typeof LibraryApiServerConfig.BookApiConfig> {
    public async getAll(): Promise<ApiResponse<Book[]>> {
        try {
            const { uri, method } = this.config.getUriAndMethod('all');
            const response = await fetch(uri, {
                ...this.createDefaultRequestDetails(),
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
}
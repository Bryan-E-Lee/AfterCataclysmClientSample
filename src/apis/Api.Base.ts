
import { AuthorizedWebService } from "./AuthorizedWebService";
import { ApiResponse, SuccessApiResponse, ErrorApiResponse } from "./responses/ApiResponse";
import { ErrorResponse } from "./responses/ErrorResponse";
import { StatusCodes } from "./StatusCodes";
import { ValidationMessage } from "./ValidationMessage";

export abstract class BaseApi<TConfig> extends AuthorizedWebService {
    public constructor(config: TConfig) {
        super();
        this.config = config;
    }
    protected readonly config: TConfig;

    protected async generateResponse<TPayload>(response: Response, defaultPayload?: TPayload): Promise<ApiResponse<TPayload>> {
        if (response.status == StatusCodes.NoContent) {
            defaultPayload = defaultPayload ?? {} as TPayload;
            return new SuccessApiResponse<TPayload>(defaultPayload);
        }
        const result = await response.json();
        if (!response.ok) {
            return this.createValidationResultResponse(result);
        }
        return new SuccessApiResponse(<TPayload>result);
    }

    protected createValidationResultResponse<TPayload>(result: ErrorResponse): ApiResponse<TPayload> {
        const messages = result.messages.map(m => new ValidationMessage(m));
        return new ErrorApiResponse<TPayload>(messages);
    }

    protected isServerError(response: Response): boolean {
        return !response.ok && response.status == StatusCodes.ServerError;
    }

    protected validateServerError(response: Response, onErrorMessage: string): void {
        if (this.isServerError(response)) {
            throw new Error(onErrorMessage);
        }
    }
    
    protected createDefaultRequestDetails(token: string | undefined = undefined) {
        return {
            headers: new Headers({
                ...(token != undefined && { 'Authorization': `Bearer ${token}` }),
                'Content-Type': 'application/json'
            })
        }
    }
}
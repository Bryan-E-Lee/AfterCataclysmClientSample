import { ValidationMessage } from "../ValidationMessage";

export type ApiResponse<TPayload> = SuccessApiResponse<TPayload> | ErrorApiResponse<TPayload>;

export class SuccessApiResponse<TPayload> {
    public constructor(payload: TPayload) {
        this.payload = payload;
    }

    public readonly status = 'Success';
    public readonly payload: TPayload;
    public readonly validationResults: ValidationMessage[] | undefined = undefined;
}

export class ErrorApiResponse<TPayload> {
    public constructor(validationResults: ValidationMessage[]) {
        if (!validationResults.any()) {
            throw new Error('Attempted to generate an error response without validation messages.');
        }
        this.validationResults = validationResults;
    }

    public readonly status = 'Error';
    public readonly payload: TPayload | undefined = undefined;
    public readonly validationResults: ValidationMessage[];
}
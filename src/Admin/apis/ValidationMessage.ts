export type ValidationResult = ValidationMessage | null;

export class ValidationMessage {
    public constructor(
        public readonly message: string,
        public readonly breaking: boolean = true
    ) {}

    public static TopValidationMessage = (messages: ValidationMessage[]) => {
        return messages.length > 0 ? messages[0].message : null;
    };

    public static HasNoBreakingValidation(
        messages: ValidationResult[]
    ): boolean {
        return (
            messages
                .filter((message) => message != null)
                .filter((message) => (<ValidationMessage>message).breaking)
                .length == 0
        );
    }

    public static Trim(messages: ValidationResult[]): ValidationMessage[] {
        return <ValidationMessage[]>(
            messages
                .filter((message) => message != null)
                .sort((message) => (<ValidationMessage>message).sortOrder)
        );
    }

    public static Condense(
        messages: ValidationResult[],
        prefix?: string
    ): string {
        const groupedMessages = messages
            .filter((message) => message != null)
            .map((message) => (<ValidationMessage>message).message)
            .join('</li>\n<li>');
        const fullPrefix = prefix != null && prefix != '' ? `${prefix}\n` : '';
        return messages.length > 1
            ? `${fullPrefix}<ul><li>${groupedMessages}</li></ul>`
            : `${fullPrefix}${groupedMessages}`;
    }

    /**
     * Breaking changes are prioritized over non-breaking results.
     */
    public get sortOrder(): number {
        return this.breaking ? 0 : 1;
    }
}

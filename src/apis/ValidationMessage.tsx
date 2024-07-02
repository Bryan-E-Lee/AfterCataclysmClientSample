import React from "react";
import { getUniqueIdentifier } from '../utils/GUID';

export type ValidationResult = ValidationMessage | null;

const isValidationMessage = (result: ValidationResult): result is ValidationMessage => {
    return result != null;
}

export class ValidationMessage {
    public constructor(
        public readonly message: string,
        public readonly breaking: boolean = true
    ) {
        this.id = getUniqueIdentifier();
    }

    public readonly id: string;

    public static TopValidationMessage(messages: ValidationMessage[]): string | null {
        return messages.length > 0
            ? messages[0].message
            : null;
    }
    
    public static HasNoBreakingValidation(messages: ValidationResult[]): boolean {
        return !messages
            .filter<ValidationMessage>(isValidationMessage)
            .any(message => message.breaking);
    }

    public static Trim(messages: ValidationResult[]): ValidationMessage[] {
        return messages
            .filter<ValidationMessage>(isValidationMessage)
            .sort((m1, m2) => m1.sortOrder - m2.sortOrder);
    }

    public static Condense(messages: ValidationResult[], prefix?: string): JSX.Element {
        const fullPrefix = prefix != null && prefix != ''
            ? <>{prefix}<br/></>
            : <></>;
        const groupedMessages = messages
            .filter<ValidationMessage>(isValidationMessage)
            .map(message => <li key={message.id}>{message.message}</li>);
            
        if (messages.length > 1) {
            return <>{fullPrefix}<ul>{groupedMessages}</ul></>;
        }
        else {
            return <>{fullPrefix}{groupedMessages}</>;
        }
    }

    /**
     * Breaking changes are prioritized over non-breaking results.
     */
    public get sortOrder(): number {
        return this.breaking ? 0 : 1;
    }
}
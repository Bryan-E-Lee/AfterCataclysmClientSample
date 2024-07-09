import { render, screen } from '@testing-library/react';
import 'jest';
import '../utils/ArrayExtensions';
import { ValidationMessage, ValidationResult } from './ValidationMessage';

const CreateValidationMessages = (breaking?: boolean): ValidationMessage[] => {
    return [
        new ValidationMessage('message 1', breaking),
        new ValidationMessage('message 2', breaking),
        new ValidationMessage('message 3', breaking)
    ];
}

describe('validation message', () => {
    describe('top validation message', () => {
        test('returns null no messages', () => {
            expect(ValidationMessage.TopValidationMessage([])).toBeNull();
        })

        const vms = CreateValidationMessages();

        test('returns top message only one', () => {
            const expectation = ValidationMessage.TopValidationMessage(vms.slice(0, 1));
            expect(expectation).toBe('message 1');
        })

        test('returns top message multiple messages', () => {
            expect(ValidationMessage.TopValidationMessage(vms)).toBe('message 1');
        })
    })

    describe('has no breaking validation', () => {
        test('returns true removes null messages', () => {
            const vms: ValidationResult[] = [
                null,
                ...CreateValidationMessages(false),
                null
            ];

            const received = ValidationMessage.HasNoBreakingValidation(vms);

            expect(received).toBe(true);
        })

        test('returns true no breaking messages', () => {
            const vms: ValidationMessage[] = [
                new ValidationMessage('message 1', false),
                new ValidationMessage('message 2', false),
                new ValidationMessage('message 3', false)
            ];

            const expectation = ValidationMessage.HasNoBreakingValidation(vms);

            expect(expectation).toBe(true)
        })

        test('returns false has many breaking messages', () => {
            const vms: ValidationMessage[] = [
                new ValidationMessage('message 1', true),
                new ValidationMessage('message 2', true),
                new ValidationMessage('message 3', true)
            ];

            const expectation = ValidationMessage.HasNoBreakingValidation(vms);

            expect(expectation).not.toBe(true);
        })

        test('returns false has one breaking message', () => {
            const vms: ValidationMessage[] = [
                new ValidationMessage('message 1', false),
                new ValidationMessage('message 2', false),
                new ValidationMessage('message 3', true)
            ];

            const expectation = ValidationMessage.HasNoBreakingValidation(vms);

            expect(expectation).not.toBe(true);
        })
    })

    describe('trim', () => {
        test('removes null messages', () => {
            const vms: ValidationResult[] = [
                null,
                ...CreateValidationMessages(),
                null
            ];

            const messages = ValidationMessage.Trim(vms);

            expect(messages).toHaveLength(3);
            for(const message of messages) {
                expect(message).not.toBeNull();
            }
        })

        test('sorts messages', () => {
            const vms: ValidationResult[] = [
                null,
                new ValidationMessage('message 0', false),
                ...CreateValidationMessages(),
                null,
                new ValidationMessage('message 4', false)
            ];

            const messages = ValidationMessage.Trim(vms);
            expect(messages).toHaveLength(5);
            
            const breakingMessages = messages.slice(0, 2);
            const breakingValues = breakingMessages.map(bm => bm.breaking);
            let expectation = breakingValues.map(() => true);
            expect(breakingValues).toEqual(expect.arrayContaining(expectation));

            const nonbreakingMessages = messages.slice(3);
            const nonbreakingValues = nonbreakingMessages.map(nbm => nbm.breaking);
            expectation = nonbreakingValues.map(() => false);
            expect(nonbreakingValues).toEqual(expect.arrayContaining(expectation));
        })
    })

    describe('condense', () => {
        test('renders prefix', () => {
            const vms = CreateValidationMessages();

            render(ValidationMessage.Condense(vms, 'prefix'));

            expect(screen.queryByText('prefix')).not.toBeNull();
        })

        test('single message renders message', () => {
            const vms = CreateValidationMessages().slice(0, 1);

            render(ValidationMessage.Condense(vms));

            expect(screen.queryByText('message 1')).not.toBeNull();
        })

        test('multiple messages renders messages', () => {
            const vms = CreateValidationMessages();

            render(ValidationMessage.Condense(vms));

            for(let message of vms) {
                expect(screen.queryByText(message.message)).not.toBeNull();
            }
        })
    })

    describe('sort order', () => {
        test('1 if not breaking', () => {
            const vm = new ValidationMessage('message 1', false);
            expect(vm.sortOrder).toBe(1);
        })

        test('0 if breaking', () => {
            const vm = new ValidationMessage('message 1', true);
            expect(vm.sortOrder).toBe(0);
        })
    })
})
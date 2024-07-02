import './multiselect.scss';
import React, { createRef } from 'react';
import { OptionType, SelectableOption } from '../SelectableOption';
import { CloseIcon } from '../../../icons';

type Props<TValue extends OptionType, TOption extends SelectableOption<TValue>> = {
    options: TOption[];
    id?: string;
    name?: string;
    selections: TValue[];
    placeholder?: string;
    onChange: (selections: TValue[]) => unknown;
};

type State = {
    filter: string;
    showingDropdown: boolean;
};

export class MultiSelect<TValue extends OptionType, TOption extends SelectableOption<TValue>> extends React.Component<Props<TValue, TOption>, State> {
    public constructor(props: Props<TValue, TOption>) {
        super(props);

        this.state = {
            filter: '',
            showingDropdown: false
        };
        this.componentRef = createRef();
        this.textInputRef = createRef();
        this.optionRefs = props.options.map((sv) => createRef());
    }

    private readonly componentRef: React.RefObject<HTMLDivElement>;
    private readonly textInputRef: React.RefObject<HTMLInputElement>;
    private optionRefs: React.RefObject<HTMLDivElement>[] = [];

    private get filteredOptions(): TOption[] {
        return this.filterOptions(
            this.props.options,
            this.state.filter
        );
    }

    private filterOptions = (
        options: TOption[],
        filter: string
    ) => {
        return options
            .filter((option) => {
                const filterOn = option.name ?? option.value;
                return filterOn?.toString().toLowerCase().includes(filter.toLowerCase());
            });
    };

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.onClickOutside);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.onClickOutside);
    }

    private get selectedOptions(): TOption[] {
        return this.props.options.filter(option => this.props.selections.contains(option.value));
    }

    private get optionsClass(): string {
        const shouldShow = this.state.showingDropdown && this.filteredOptions.length > 0;
        const visibleClass = shouldShow ? 'visible' : 'hidden';
        return `options ${visibleClass}`;
    }

    private get noResultsClass(): string {
        const shouldShow = this.state.showingDropdown && this.filteredOptions.length <= 0;
        const visibleClass = shouldShow ? 'visible' : 'hidden';
        return `no-results ${visibleClass}`;
    }

    public render(): JSX.Element {
        const selectionValue = this.props.selections
            .filter(sv => sv != null)
            .map(sv => sv!.toString());
        return (
            <div className="multiselect" ref={this.componentRef}>
                <input
                    type="hidden"
                    id={this.props.id}
                    name={this.props.name}
                    value={selectionValue}
                />
                <div className="selections" onClick={this.focusSelect}>
                    <div className="selected">
                        {this.selectedOptions.map((sv) => this.renderSelection(sv))}
                    </div>
                    <input
                        ref={this.textInputRef}
                        type="text"
                        placeholder={this.props.placeholder}
                        onFocus={this.onFocus.bind(this)}
                        onChange={this.onFilter}
                        value={this.state.filter}
                    />
                </div>
                <div className={this.noResultsClass}>No results found.</div>
                <div className={this.optionsClass} role="listbox">
                    {this.filteredOptions.map((option, index) =>
                        this.renderOption(option, index)
                    )}
                </div>
            </div>
        );
    }

    public clear(): void {
        this.setState((state) => ({ ...state, selections: [] }));
    }

    private renderOption(option: TOption, index: number): JSX.Element {
        const isSelected = this.props.selections.includes(option.value);
        const disabled = isSelected || option.disabled;
        const disabledClass = disabled ? 'disabled' : 'enabled';
        const onClick = disabled
            ? () => {}
            : this.selectOption.bind(this, option);
        return (
            <div key={option.value}
                className={`option ${disabledClass}`}
                onClick={onClick}
                ref={this.optionRefs[index]}
                role="option"
                aria-selected={isSelected}>
                {option.name ?? option.value}
            </div>
        );
    }

    private renderSelection(option: TOption): JSX.Element {
        return (
            <div className="selection" key={option.value}>
                <button
                    onClick={this.deselectOption.bind(this, option)}
                    aria-label="Deselect">
                    <CloseIcon />
                </button>
                {option.name ?? option.value}
            </div>
        );
    }

    private selectOption(option: TOption): void {
        this.props.onChange([...this.props.selections, option.value]);
        this.setState({ ...this.state, filter: '' });
    }

    private deselectOption(option: TOption): void {
        const selections = this.props.selections.filter(selection => selection != option.value);
        this.props.onChange(selections);
        this.setState({ ...this.state, filter: '' });
    }

    private onFocus() {
        this.setState((state) => ({ ...state, showingDropdown: true }));
    }

    private onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => {
            const filter = e.target.value;
            this.optionRefs = this.filterOptions(
                this.props.options,
                filter
            ).map(() => createRef());
            return { ...state, filter };
        });
    };

    private onClickOutside = (event: globalThis.MouseEvent): void => {
        if (this.state.showingDropdown
            && event.target instanceof Node
            && !this.componentRef.current?.contains(event.target)) {
            this.setState((state) => ({ ...state, showingDropdown: false }));
        }
    };

    private focusSelect = (event: any) => {
        const numRefs = this.optionRefs.filter((ref) => ref.current?.contains(event.target)).length;
        if (numRefs > 0) {
            return;
        }
        this.textInputRef.current?.focus();
    };
}

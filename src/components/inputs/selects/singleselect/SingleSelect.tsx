import './singleselect.scss';
import React, { createRef } from "react";
import { OptionType, SelectableOption } from "../SelectableOption";

type Props<TValue extends OptionType, TOption extends SelectableOption<TValue>> = {
    options: TOption[];
    id?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    filterable?: boolean;
    allowNull?: boolean;
    selection?: TValue | null;
    disabled?: boolean;
    onChange: (selection: TValue) => unknown;
}

type State = {
    filter: string;
    showingDropdown: boolean;
}

export class SingleSelect<TValue extends OptionType, TOption extends SelectableOption<TValue>> extends React.Component<Props<TValue, TOption>, State> {
    public constructor(props: Props<TValue, TOption>) {
        super(props);

        this.state = {
            filter: '',
            showingDropdown: false
        };
        this.componentRef = createRef();
        this.textInputRef = createRef();
    }

    private readonly componentRef: React.RefObject<HTMLDivElement>;
    private readonly textInputRef: React.RefObject<HTMLInputElement>;

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
            .filter((option) => option.name?.toString().toLowerCase().indexOf(filter) == 0);
    };

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.onClickOutside);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.onClickOutside);
    }

    private get inputClass(): string {
        return `${this.state.showingDropdown ? 'visible' : 'hidden'}`;
    }

    private get optionsClass(): string {
        const shouldShow = this.state.showingDropdown
            && this.filteredOptions.length > 0;
        const visibleClass = shouldShow ? 'visible' : 'hidden';
        return `options ${visibleClass}`;
    }

    private get noResultsClass(): string {
        const shouldShow = this.state.showingDropdown
            && this.filteredOptions.length <= 0;
        const visibleClass = shouldShow ? 'visible' : 'hidden';
        return `no-results ${visibleClass}`;
    }

    private get emptyOption(): TOption {
        return {
            name: '--Clear--',
            value: null
        } as TOption;
    }

    private get selectedOption(): SelectableOption<TValue> | null {
        const option = this.props.options.first(option => option.value == this.props.selection);
        return option;
    }
    
    private get emptySelection(): JSX.Element | null {
        return this.props.allowNull && this.props.selection != null
            ? this.renderOption(this.emptyOption)
            : null
    }

    public render(): JSX.Element {
        let className = `singleselect ${this.props.className}`;
        const { id, name, selection, disabled, placeholder } = this.props;
        if (disabled) {
            className += " disabled";
        }
        const shouldTransparentize = this.selectedOption?.name == null && placeholder == null;
        const displayContents = this.selectedOption?.name ?? placeholder ?? 'CHROME-FIX';
        return (
            <div className={className} ref={this.componentRef} role='listbox'>
                <input
                    type="hidden"
                    id={id}
                    name={name}
                    value={selection ?? ''}
                />
                <div className="selections" onClick={this.toggleDropdown.bind(this)}>
                    <div className="selected">
                        <span className={`selection-name ${shouldTransparentize ? 'transparent' : ''}`}>
                            {displayContents}
                        </span>
                        <span className='site-icon material-symbols-outlined'>arrow_drop_down</span>
                    </div>
                </div>
                <input className={this.inputClass}
                    ref={this.textInputRef}
                    type="text"
                    placeholder="Filter..."
                    onKeyUp={this.checkBlur.bind(this)}
                    onChange={this.onFilter}
                    value={this.state.filter}
                />
                <div className={this.noResultsClass}>No results found.</div>
                <div className={this.optionsClass}>
                    {this.emptySelection}
                    {this.filteredOptions.map((option) =>
                        this.renderOption(option)
                    )}
                </div>
            </div>
        );
    }

    public clear(): void {
        this.setState((state) => ({ ...state, selections: [] }));
    }

    private renderOption(option: TOption): JSX.Element {
        const selected = this.props.selection == option.value;
        const disabled = selected || option.disabled;
        const optionClass = `option ${disabled ? 'disabled' : 'enabled'}`;
        const onClick = disabled
            ? () => {}
            : this.selectValue.bind(this, option);
        return (
            <div key={option.value}
                className={optionClass}
                onClick={onClick}
                role="option"
                aria-selected={selected}>
                {option.name ?? option.value}
            </div>
        );
    }

    private selectValue(option: TOption): void {
        this.props.onChange(option.value);
        this.setState({ ...this.state, filter: '', showingDropdown: false });
    }

    private toggleDropdown() {
        this.setState((state) => ({ ...state, showingDropdown: !state.showingDropdown }));
    }

    private checkBlur(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key == 'Escape') {
            this.textInputRef.current?.blur();
            this.setState((state) => ({ ...state, showingDropdown: false }));
        }
    }

    private onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState((state) => {
            const filter = e.target.value;
            return { ...state, filter };
        });
    };

    private onClickOutside = (event: globalThis.MouseEvent): void => {
        if(this.state.showingDropdown
            && event.target instanceof Node
            && !this.componentRef.current?.contains(event.target)) {
            this.setState((state) => ({ ...state, showingDropdown: false }));
        }
    };
}
import './collapsible-section.scss';
import React, { createRef } from 'react';
import { JSXChildProps } from '../../entities/utils/jsx/Children';
import { CollapseIcon, ExpandIcon } from '../icons';

type Props = {
    id?: string;
    expandedInitially?: boolean;
    header: React.ReactNode;
    className?: string;
    collapsible?: boolean;
    overrideExpanded?: boolean;
    onToggle?: (expanded: boolean) => unknown;
} & JSXChildProps;

type State = {
    expanded: boolean;
    currentHeight: number;
    observer?: MutationObserver;
}

export class CollapsibleSection extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            expanded: !this.collapsible || (props.expandedInitially ?? false),
            currentHeight: 0
        };
    }

    private static readonly ObserverConfig = { attributeFilter: ['class','style'], childList: true, subtree: true };
    private readonly ref: React.RefObject<HTMLDivElement> = createRef();

    private get collapsible(): boolean {
        return this.props.collapsible != false;
    }

    private get expandedValue(): boolean {
        return this.props.overrideExpanded ?? this.state.expanded;
    }

    private get expandedClassName(): string {
        return this.expandedValue ? 'expanded' : 'collapsed';
    }

    private get customClassName(): string {
        return this.props.className ?? '';
    }

    private get expandButton(): JSX.Element | null {
        if (!this.collapsible) {
            return null;
        }
        return this.expandedValue
            ? <CollapseIcon />
            : <ExpandIcon />;
    }

    private toggle(): void {
        if (!this.collapsible) {
            return;
        }
        if (this.props.onToggle) {
            this.props.onToggle(!this.expandedValue);
        }
        this.setState((state) => {
            const expanded = !this.expandedValue;
            return {
                ...state,
                expanded
            };
        });
    }

    private calculateCurrentHeight(expanded: boolean): number {
        return expanded
            ? this.ref.current?.scrollHeight ?? 0
            : 0;
    }

    private updateStateHeight = () => {
        this.setState((state) => ({ ...state, currentHeight: this.calculateCurrentHeight(this.expandedValue) }));
    }

    private onMutate = () => {
        this.updateStateHeight();
    }

    public componentDidMount(): void {
        const observer = new MutationObserver(this.onMutate);
        observer.observe(this.ref.current!, CollapsibleSection.ObserverConfig);
        
        this.updateStateHeight();
        this.setState((state) => ({ ...state, observer }));
    }

    public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        
    }

    public componentWillUnmount(): void {
        this.state.observer?.disconnect();
    }

    public render(): JSX.Element {
        const expandAttribute = this.state.currentHeight > 0
            ? true
            : undefined;
        const collapsedAttribute = this.state.currentHeight > 0
            ? undefined
            : true;
        return (
            <section id={this.props.id} className={`collapsible-section ${this.expandedClassName} ${this.collapsible ? 'collapsible' : 'incollapsible'} ${this.expandedClassName} ${this.customClassName}`}>
                <header onClick={this.toggle.bind(this)}>
                    {this.expandButton}
                    <div className='contents'>
                        {this.props.header}
                    </div>
                </header>
                <div ref={this.ref} className="expand-collapse-container" data-expand={expandAttribute} data-collapsed={collapsedAttribute}>
                    <div className='contents'>
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
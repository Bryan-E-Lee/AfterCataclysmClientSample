import React, { createRef } from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";

type Props = {
    precheckCondition?: boolean;
    onExternalClickDetected: () => unknown;
    additionalRefs?: React.RefObject<HTMLElement>[]
} & JSXChildProps
  & React.HTMLAttributes<HTMLDivElement>;

export class ExternalClickDetector extends React.Component<Props> {
    private readonly componentRef: React.RefObject<HTMLDivElement> = createRef();

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.onClickOutside);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.onClickOutside);
    }

    private onClickOutside = (event: globalThis.MouseEvent): void => {
        const validPrecheck = this.props.precheckCondition
            || this.props.precheckCondition === undefined;
        const additionalRefs = this.props.additionalRefs ?? [];
        const target = event.target;
        if (validPrecheck
            && target instanceof Node
            && !this.componentRef.current?.contains(target)
            && !additionalRefs.any(ar => ar.current?.contains(target) ?? false)) {
            this.props.onExternalClickDetected();
        }
    }

    public render(): JSX.Element {
        const excludedKeys = ['precheckCondition', 'onExternalClickDetected', 'children', 'additionalRefs'];
        const newProps = Object.keys(this.props)
            .filter(key => excludedKeys.indexOf(key) < 0)
            .reduce((accum, curr) => ({ ...accum, [curr]: this.props[curr as keyof Props] }), {});
        return (
            <div {...newProps} ref={this.componentRef}>
                {this.props.children}
            </div>
        );
    }
}
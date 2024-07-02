import './loader.scss';
import React from "react";
import { JSXChildProps } from '../../../entities/utils/jsx/Children';

type Props = {
    textless?: boolean;
    animates?: boolean;
    active?: boolean;
    opaque?: boolean;
} & JSXChildProps;

export class LoadingText extends React.Component<Props> {
    private get animates(): boolean {
        return this.props.animates == undefined || this.props.animates;
    }

    private get animatesClass(): string {
        return this.animates ? 'animate' : 'no-animate';
    }

    private get active(): boolean {
        return this.props.active == undefined || this.props.active;
    }

    private get activeClass(): string {
        return this.active ? 'active' : 'inactive';
    }

    private get opaque(): boolean {
        return this.props.opaque == undefined || this.props.opaque;
    }

    private get opaqueClass(): string {
        return this.opaque ? 'opaque' : 'transparent';
    }

    private get childContents(): JSX.Element[] {
        const children = this.props.children ?? 'Loading';
        if(typeof children == 'string') {
            return this.stringToChildElements(children, 0);
        }
        //Is JSX.Element
        if(!Array.isArray(children)) {
            return [this.jsxToChildElement(children as JSX.Element, 0)];
        }
        const arrayChildren = children as (string | JSX.Element)[];
        return arrayChildren.reduce((accum: JSX.Element[], curr: (string | JSX.Element), index: number) => {
            if(typeof curr == 'string') {
                return [...accum, ...this.stringToChildElements(curr, index)];
            }
            return [...accum, this.jsxToChildElement(curr, index)];
        }, []);
    }

    private stringToChildElements(contents: string, index: number): JSX.Element[] {
        return contents.split('')
            .map((character: string, subIndex: number) => (
                <span key={index + subIndex} className='child' style={this.getChildStyle(index + subIndex)}>{character}</span>
            ));
    }

    private jsxToChildElement(contents: JSX.Element, index: number): JSX.Element {
        return <span key={index} className='child' style={this.getChildStyle(index)}>{contents}</span>;
    }

    private getChildStyle(index: number): React.CSSProperties {
        return {
            animationDelay: `${index}s`
        };
    }

    private get contentStyle(): React.CSSProperties {
        return {
            '--animation-duration': `${this.childContents.length}s`
        } as React.CSSProperties;
    }

    private get contents(): JSX.Element {
        return <div className='contents' style={this.contentStyle}>{this.childContents}</div>;
    }

    public render(): JSX.Element {
        return (
            <div className={`overlay loading-text centered ${this.activeClass} ${this.opaqueClass} ${this.animatesClass}`}>
                {this.contents}
            </div>
        );
    }
}
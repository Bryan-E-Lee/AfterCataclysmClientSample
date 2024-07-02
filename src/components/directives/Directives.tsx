import './directives.scss';
import * as React from 'react';
import { JSXChildProps } from '../../entities/utils/jsx/Children';

type DirectiveProps = JSXChildProps & { header: React.ReactNode };
type SubdirectiveProps = JSXChildProps & { header?: string };

export const Directive: React.FC<DirectiveProps> = (props: DirectiveProps): JSX.Element => (
    <div className="directive">
        <h6>{props.header}</h6>
        {props.children}
    </div>
);

const generateSubDirectiveHeader = (baseHeader: string, header?: string) => {
    if (header != null) {
        header = " - " + header;
    }
    else {
        header = "";
    }
    return `${baseHeader}${header}`;
}

export const GMNote = (props: SubdirectiveProps) => <Directive header={generateSubDirectiveHeader("GM Note", props.header)}>{props.children}</Directive>;

export const PlayerNote = (props: SubdirectiveProps) => <Directive header={generateSubDirectiveHeader("Player Note", props.header)}>{props.children}</Directive>;

export const Variant = (props: SubdirectiveProps) => <Directive header={generateSubDirectiveHeader("Variant", props.header)}>{props.children}</Directive>;

export const Example = (props: SubdirectiveProps) => <Directive header={generateSubDirectiveHeader("Example", props.header)}>{props.children}</Directive>;

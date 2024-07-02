import './collapsible-region.scss';
import React, { useState } from "react"
import { JSXChildProps } from "../../entities/utils/jsx/Children";
import { CollapseIcon, ExpandIcon } from "../icons";

type Props = {
    expanded?: boolean;
    className?: string;
    header: React.ReactNode;
} & JSXChildProps;

export const CollapsibleRegion = (props: Props) => {
    const { header, className, children } = props;
    const expandedInitially = props.expanded ?? false;
    const [expanded, setExpanded] = useState<boolean>(expandedInitially);
    return (
        <div className={`collapsible-region ${className ? className : ''}`}>
            <header onClick={() => setExpanded(!expanded)}>
                {expanded && <CollapseIcon />}
                {!expanded && <ExpandIcon />}
                {header}
            </header>
            <div className={`collapsible-region-contents ${expanded ? 'expanded' : 'collapsed'}`}>
                {children}
            </div>
        </div>
    )
}
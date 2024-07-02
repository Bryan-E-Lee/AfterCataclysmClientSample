import React from "react";
import { NavOrdinal } from "../NavOrdinal";
import { ArticleNavLinkComponentProps } from "./ArticleNavLinkComponentProps";
import { SubLink } from "./ArticleNavSublink";
import { Link, useLocation } from "react-router-dom";

export const ArticleNavLinkComponent: React.FC<ArticleNavLinkComponentProps> = (props: ArticleNavLinkComponentProps) => {
    const { link, ordinal } = props;
    const hasSublinks = link.sublinks && link.sublinks.any();
    const location = useLocation();
    const overrideActive = location.hash == `#${link.hash}`;
    return (
        <li key={link.path}>
            <Link to={link.path} className={overrideActive ? "active" : "inactive"}>
                <NavOrdinal ordinal={ordinal} />
                {link.name}
            </Link>
            {hasSublinks && <ul className="sublinks">
                {link.sublinks?.map((link) => (
                    <SubLink key={link.path} link={link} ordinal={1} />
                ))}
            </ul>}
        </li>
    );
};
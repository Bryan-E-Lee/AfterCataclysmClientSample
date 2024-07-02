import React from "react";
import { BulletEmptyIcon, BulletFilledIcon } from "../../../icons";
import { ArticleNavLinkComponentProps } from "./ArticleNavLinkComponentProps";
import { Link, useLocation } from "react-router-dom";

export const SubLink: React.FC<ArticleNavLinkComponentProps> = (props: ArticleNavLinkComponentProps) => {
    const { link, ordinal } = props;
    const bullet = ordinal % 2 == 0
        ? <BulletEmptyIcon />
        : <BulletFilledIcon />;
    const location = useLocation();
    const overrideActive = location.hash == `#${link.hash}`;
    return (
        <li key={link.path}>
            <Link to={link.path} className={overrideActive ? "active" : "inactive"}>
                <span className="nav-ordinal">{bullet}</span>
                {link.name}
            </Link>
            <ul className="sublinks">
                {link.sublinks?.map((link) => (
                    <SubLink key={link.path}
                        link={link}
                        ordinal={ordinal + 1}
                    />
                ))}
            </ul>
        </li>
    );
};
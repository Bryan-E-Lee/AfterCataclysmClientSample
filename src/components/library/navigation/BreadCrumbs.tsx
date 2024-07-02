import "./breadcrumbs.scss";
import React from "react";
import { BreadCrumb } from "./Breadcrumb";
import { Link } from "react-router-dom";

type Props = {
    crumbs: BreadCrumb[];
}

export const Breadcrumbs = (props: Props) => {
    const { crumbs } = props;
    if (crumbs.length <= 1) {
        return null;
    }

    return (
        <nav className="breadcrumbs panel">
            {crumbs.map((crumb, index) => {
                const { name, path } = crumb;
                if (index == crumbs.length - 1) {
                    return <span key={path} className="breadcrumb">{name}</span>;
                }
                return <span key={path} className="breadcrumb"><Link to={path}>{name}</Link></span>;
            })}
        </nav>
    )
}
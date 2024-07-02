import './page-navigation.scss';
import React from 'react';
import { ArticleNavLink } from './article-navigation/ArticleNavLink';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import { Link, NavLink } from "react-router-dom";

type Props = {
    root?: ArticleNavLink;
    prev?: ArticleNavLink;
    next?: ArticleNavLink;
};

export const PageNavigation: React.FC<Props> = (props: Props) => (
    <nav className="page-nav">
        <PrevControl link={props.prev} root={props.root} />
        <RootControl link={props.root} />
        <NextControl link={props.next} root={props.root} />
    </nav>
);


type ControlProps = {
    link?: ArticleNavLink
    children?: React.ReactNode;
}

const ResetHeight = () => {
    document.getElementsByName("main")[0].scrollTo({ top: 0 });
}

export const RootControl: React.FC<ControlProps> = (props: ControlProps): JSX.Element => {
    const { link, children } = props;
    return (
        <div className="page-nav-root">
            {link == null ? null : (
                <Link to={link.path}>{children ?? link.name}</Link>
            )}
        </div>
    );
}

type PrevNextProps = Partial<ControlProps> & 
{
    root?: ArticleNavLink;
};

export const PrevControl = (props: PrevNextProps): JSX.Element | null => {
    const { link, children, root } = props;
    const rootPath = root?.path
        ? `${root.path}/`
        : "";
    return (
        <div className="page-nav-prev">
            {link == null ? null : (
                <NavLink to={`${rootPath}${link.path}`} onClick={ResetHeight}>
                    <ChevronLeftIcon /> {children ?? link.name}
                </NavLink>
            )}
        </div>
    );
}

export const NextControl = (props: PrevNextProps): JSX.Element | null => {
    const { link, children, root } = props;
    const rootPath = root?.path
        ? `${root.path}/`
        : "";
    return (
        <div className="page-nav-next">
            {link == null ? null : (
                <NavLink to={`${rootPath}${link.path}`} onClick={ResetHeight}>
                    {children ?? link.name} <ChevronRightIcon />
                </NavLink>
            )}
        </div>
    );
};

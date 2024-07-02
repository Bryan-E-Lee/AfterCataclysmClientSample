import './article-navigation.scss';
import React, { useEffect, useState } from 'react';
import { JSXChildProps } from '../../../../entities/utils/jsx/Children';
import { ArticleNavLink } from './ArticleNavLink';
import { ArticleNavLinkComponent } from './ArticleNavLinkComponent';
import { NextControl, PrevControl, RootControl } from '../PageNavigation';
import { Link, NavLink } from 'react-router-dom';
import { BookIcon } from '../../../icons';

type Props = {
    root: ArticleNavLink;
    links?: ArticleNavLink[];
    prev?: ArticleNavLink;
    next?: ArticleNavLink;
} & JSXChildProps;

interface State {
    unmounting: boolean;
    timeout?: Number | NodeJS.Timeout;
    fixedNav: boolean;
}

const recheckNavFixationInterval = 10;

export const ArticleNavigation = (props: Props) => {
    const checkShouldFixNav = () => window.scrollY > 50;
    const [state, setState] = useState<State>({ unmounting: false, fixedNav: checkShouldFixNav() });

    const onScroll = () => {
        clearTimeout(state.timeout as number | undefined);
        if (state.unmounting) {
            return;
        }
        const recheckFixed = () => {
            setState((s) => ({ ...s, fixedNav: checkShouldFixNav() }));
        };
        setState((state) => ({ ...state, timeout: setTimeout(recheckFixed, recheckNavFixationInterval) }));
    }
    const onUnmount = () => {
        setState(state => ({ ...state, unmounting: true}));
        window.removeEventListener("scroll", onScroll);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return onUnmount; //Returned functions are called as if they were previously tied to the componentWillUnmount lifecycle method.
    }, []);


    let ordinal = 1;
    const { links, root, prev, next, children } = props;

    const containerClassName = `nav-container${state.fixedNav ? " fixed-nav" : ""}`;
    const hasPrevNext = prev != null || next != null;        
    const hasLinks = links && links.any();
    return (
        <aside className="article-navigation">
            <nav className={containerClassName}>
                <Link className="article-title" to={`#Top`}>
                    {children}
                </Link>
                {hasPrevNext && (
                    <div className="prev-next">
                        <PrevControl link={prev} root={root}>Prev</PrevControl>
                        <RootControl link={root}><BookIcon /></RootControl>
                        <NextControl link={next} root={root}>Next</NextControl>
                    </div>
                )}
                {hasLinks && (
                    <ol className="section-navs">
                        {links.map((link) => (
                            <ArticleNavLinkComponent key={link.path} link={link} ordinal={ordinal++} />
                        ))}
                    </ol>
                )}
            </nav>
        </aside>
    );
}
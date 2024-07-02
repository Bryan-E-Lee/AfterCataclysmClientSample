import React, { useEffect, useMemo } from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";
import { ArticleProps } from "../articles/ArticleProps";
import { ArticleNavigation } from "../articles/navigation/article-navigation/ArticleNavigation";
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { PageNavigation } from "../articles/navigation/PageNavigation";
import { RulesRoot } from "./RulesRoot";
import { useLocation } from "react-router";
import { CreateHashNavigator } from "../app/nav/CreateHashNavigator";

type Props = ArticleProps & JSXChildProps & {
    link: ArticleNavLink;
    root?: ArticleNavLink;
};

export const RulesArticle: React.FC<Props> = (props: Props) => {
    let { link, children, root } = props;
    root = root ?? RulesRoot;
    let prev: ArticleNavLink | undefined, next: ArticleNavLink | undefined;
    let chapterTitlePrefix: string = '';
    if (props.index != null) {
        prev = props.siblings[props.index - 1];
        next = props.siblings[props.index + 1];
        chapterTitlePrefix = `Chapter ${props.index}: `;
    }

    const title = `${chapterTitlePrefix}${props.link.name}`;
    
    const location = useLocation();
    const hash = location.hash.split("#")[1]; 
    useEffect(CreateHashNavigator(hash), [location]);

    return (
        <>
            <ArticleNavigation links={link.sublinks} prev={prev} next={next} root={root}>
                {title}
            </ArticleNavigation>
            <article id='Top'>
                <PageNavigation root={root} prev={prev} next={next} />
                <section>
                    <h1>{title}</h1>
                    {children}
                </section>
                {link.sublinks?.map((sublink, index) => {
                    const inner = sublink.render(index);
                    if(inner == null) {
                        return undefined;
                    }
                    return (
                        <div key={sublink.path}>
                            {inner}
                        </div>
                    );
                })}
            </article>
        </>
    );
}
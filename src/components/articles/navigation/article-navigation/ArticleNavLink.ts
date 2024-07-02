import React from "react";

type ArticleNavRenderer = (index?: number) => React.ReactNode;

export interface ArticleNavLinkInitializer {
    name: React.ReactNode;
    path: string;
    sublinks?: ArticleNavLinkInitializer[];
    render?: ArticleNavRenderer;
    articleOnlySublinks?: boolean;
}

export class ArticleNavLink implements Required<ArticleNavLinkInitializer> {
    public constructor(initializer: ArticleNavLinkInitializer) {
        this.initializer = initializer;
        this.name = initializer.name;
        this.path = initializer.path;
        this.sublinks = initializer.sublinks?.map(
            (sublink) => new ArticleNavLink(sublink)
        ) ?? [];
        this.render = initializer.render || (() => undefined);
        this.articleOnlySublinks = initializer.articleOnlySublinks ?? false;
    }

    public readonly initializer: ArticleNavLinkInitializer;
    public readonly name: React.ReactNode;
    public readonly path: string;
    public readonly sublinks: ArticleNavLink[];
    public readonly render: ArticleNavRenderer;
    public readonly articleOnlySublinks: boolean;

    public get hash(): string | undefined {
        return this.path.split('#')[1];
    }

    public get sublinkTos(): string[] {
        return (
            this.sublinks?.reduce(
                (accum: string[], curr: ArticleNavLink) => {
                    return [...accum, ...curr.sublinkTos];
                },
                [this.path]
            ) ?? [this.path]
        );
    }

    public GetAsChild(navLink: ArticleNavLink) {
        return new ArticleNavLink({
            ...navLink,
            path: `${this.path}${navLink.path}`
        });
    }
}
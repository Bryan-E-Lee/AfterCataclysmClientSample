import { ArticleNavLink } from "./navigation/article-navigation/ArticleNavLink";

export type ArticleProps = {
    index?: number;
    siblings: ArticleNavLink[];
};

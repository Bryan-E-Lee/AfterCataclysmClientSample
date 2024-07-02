import React from "react";
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { BookIcon } from "../icons";

export const GuideRoot = new ArticleNavLink({
    path: "/Guide",
    name: <><BookIcon /> Table of Contents</>
})
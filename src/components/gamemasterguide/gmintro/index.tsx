import React from "react"
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink"
import { ArticleProps } from "../../articles/ArticleProps"
import { GuideLinks } from ".."
import { ArticleNavigation } from "../../articles/navigation/article-navigation/ArticleNavigation"
import { PageNavigation } from "../../articles/navigation/PageNavigation"
import { GuideRoot } from "../GuideRoot"
import { WhatDoIDoGuideLink } from "./WhatDoIDo"

export const GuideIntroductionLink = new ArticleNavLink({
    path: "Introduction",
    name: "Introduction",
    render: (index?: number) => <GMIntroduction index={index} siblings={GuideLinks} />,
    sublinks: [WhatDoIDoGuideLink]
})

const GMIntroduction = (props: ArticleProps) => {
    const next = props.index != null
        ? props.siblings[props.index + 1]
        : undefined;
    return (
        <>
            <ArticleNavigation links={GuideIntroductionLink.sublinks}>
                {GuideIntroductionLink.name}
            </ArticleNavigation>
            <article id="Top">
                <PageNavigation root={GuideRoot} next={next} />
                <section>
                    <h1>Game Master's Guide</h1>
                    <p>
                        This guide exists to help *you* create and manage adventures in the 500 AC role playing game. As the game master, you are guiding the other players through challenges and taking control of the game itself. In video game terms, you are taking on the role the computer normally serves.
                    </p>
                </section>
            </article>
        </>
    )
}
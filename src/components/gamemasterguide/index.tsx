import React from "react"
import { ArticleNavLink } from "../articles/navigation/article-navigation/ArticleNavLink";
import { TableOfContents } from "../articles/TableOfContents";
import { ExplorationGuideLink } from "./exploration";
import { GuideIntroductionLink } from "./gmintro";
import { ActionScenesGuideLink } from "./action-scenes";
import { AdventuresGuideLink } from "./adventures";
import { CustomizationGuideLink } from "./customization";
import { Route, Routes } from "react-router";
import { BuildingAWorldGuideLink } from "./building-a-world";

export const GuideLinks: ArticleNavLink[] = [];

export const GameMasterGuide = () => (
    <main className="game-info-page">
        <div className="contents">
            <Routes>
                {GuideLinks.map((route, index) => {
                    if (route.render != null) {
                        return (
                            <Route key={route.path} path={route.path} element={route.render(index)} />
                        );
                    }
                })}
                <Route path="TableOfContents" element={<TableOfContents contentName="Game Master's Guide" rootPath="Guide" links={GuideLinks} />} />
                <Route path="*"/>
            </Routes>
        </div>
    </main>
);

GuideLinks.push(
    GuideIntroductionLink,
    BuildingAWorldGuideLink,
    AdventuresGuideLink,
    ExplorationGuideLink,
    ActionScenesGuideLink,
    CustomizationGuideLink,
)
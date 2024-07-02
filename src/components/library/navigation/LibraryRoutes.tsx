import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { CompetenciesLibrary } from "../competency";
import { ConditionsLibrary } from "../condition";
import { HazardsLibrary } from "../hazards";
import { ItemsLibrary } from "../items";
import { PerksLibrary } from "../perks";
import { PersonalitiesLibrary } from "../personalities";
import { RhetoricsLibrary } from "../rhetoric";
import { SkillsLibrary } from "../skills";
import { BookLibrary } from "../books";
import { EnemiesLibrary } from "../enemies";

export const LibraryRootRoute = new ArticleNavLink({
    path: '/Library',
    name: 'Library'
});

export const BooksRoute = new ArticleNavLink({
    path: "Books",
    name: "Books",
    render: () => <BookLibrary />,
});

export const ItemsRoute = new ArticleNavLink({
    path: 'Items',
    name: 'Items',
    render: () => <ItemsLibrary />,
});

export const PersonalitiesRoute = new ArticleNavLink({
    path: 'Personalities',
    name: 'Personalities',
    render: () => <PersonalitiesLibrary />,
});

export const PerksRoute = new ArticleNavLink({
    path: 'Perks',
    name: 'Perks',
    render: () => <PerksLibrary />,
});

export const SkillsRoute = new ArticleNavLink({
    path: 'Skills',
    name: 'Skills',
    render: () => <SkillsLibrary />,
});

export const RhetoricsRoute = new ArticleNavLink({
    path: 'Rhetoric',
    name: 'Rhetoric',
    render: () => <RhetoricsLibrary />,
});

export const ConditionsRoute = new ArticleNavLink({
    path: 'Conditions',
    name: 'Conditions',
    render: () => <ConditionsLibrary />,
});

export const CompetenciesRoute = new ArticleNavLink({
    path: 'Competencies',
    name: 'Competencies',
    render: () => <CompetenciesLibrary />,
});

export const HazardsRoute = new ArticleNavLink({
    path: 'Hazards',
    name: 'Hazards',
    render: () => <HazardsLibrary />,
});

export const EnemiesRoute = new ArticleNavLink({
    path: 'Enemies',
    name: 'Enemies',
    render: () => <EnemiesLibrary />,
});

export const LibraryRoutes = [
    BooksRoute,
    ItemsRoute,
    new ArticleNavLink({
        path: 'Items?types=Weapon',
        name: 'Weapons',
        render: () => <ItemsLibrary />,
    }),
    new ArticleNavLink({
        path: 'Items?types=Mod',
        name: 'Mods',
        render: () => <ItemsLibrary />,
    }),
    new ArticleNavLink({
        path: 'Items?types=Ammo',
        name: 'Ammo',
        render: () => <ItemsLibrary />,
    }),
    new ArticleNavLink({
        path: 'Items?types=Spell',
        name: 'Spell',
        render: () => <ItemsLibrary />,
    }),
    PersonalitiesRoute,
    PerksRoute,
    SkillsRoute,
    RhetoricsRoute,
    ConditionsRoute,
    CompetenciesRoute,
    HazardsRoute,
    EnemiesRoute,
];
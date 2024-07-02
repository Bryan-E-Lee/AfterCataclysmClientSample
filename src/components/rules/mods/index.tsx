import React from "react";
import { RuleLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { ModRulesNavLink } from "./BodyModRules";
import { SlotRulesNavLink } from "./SlotRules";
import { AttackRulesLink } from "./AttackRules";
import { SpellRulesLink } from "./SpellRules";

export const ModRulesLink = new ArticleNavLink({
    path: 'Mods',
    name: 'Mods',
    render: (index?: number) => <ModRules index={index} siblings={RuleLinks} />,
    sublinks: [
        ModRulesNavLink,
        SlotRulesNavLink,
        AttackRulesLink,
        SpellRulesLink
    ]
});

const ModRules = (props: ArticleProps) => (
    <RulesArticle {...props} link={ModRulesLink}>
        <p>
            In the wasteland everything is precious which means everything is personalized. Customizing your gear to fit your character is natural and fun! Two characters wielding pistols might be very different in a fight because of the mods they chose to outfit themselves with. You can modify your gear by attaching mods to it which can impart it, and you, with special abilities.
        </p>
    </RulesArticle>
);
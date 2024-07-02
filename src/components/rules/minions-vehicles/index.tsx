import React from "react";
import { RuleLinks } from "..";
import { ArticleProps } from "../../articles/ArticleProps";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RulesArticle } from "../RulesArticle";
import { MinionRulesLink } from "./MinionRules";
import { Link } from "react-router-dom";
import { VehiclesRuleLink } from "./VehicleRules";

export const MinionVehiclesRulesLink = new ArticleNavLink({
    path: 'MinionsVehicles',
    name: 'Minions & Vehicles',
    render: (index?: number) => <MinionRules index={index} siblings={RuleLinks} />,
    sublinks: [
        MinionRulesLink,
        VehiclesRuleLink,
    ]
});

const MinionRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={MinionVehiclesRulesLink}>
        <p>
            As your ability to <Link to='/Library/Skills/Command'>Command</Link> improves, you can maintain control over more and more powerful minions. Additionally, you'll find yourself able to pilot more complex vehicles. This chapter will inform you on how to command those minions and vehicles.
        </p>
    </RulesArticle>
);
import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { ArmorNavLink } from './ArmorRules';
import { CraftingRulesLink } from './CraftingRules';
import { ModRulesLink } from './ModRules';
import { OutfittingRulesLink } from './OutfitRules';
import { WeaponRulesLink } from './WeaponRules';
import { StartingEquipmentRulesLink } from './StartingEquipmentRules';
import { TheCataclysm } from '../../theming/texts';
import { MoneyRulesLink } from './MoneyRules';

export const EquipmentRulesLink = new ArticleNavLink({
    path: 'Equipment',
    name: 'Equipment',
    render: (index?: number) => <EquipmentRules index={index} siblings={RuleLinks} />,
    sublinks: [
        OutfittingRulesLink,
        ArmorNavLink,
        ModRulesLink,
        WeaponRulesLink,
        CraftingRulesLink,
        MoneyRulesLink,
        StartingEquipmentRulesLink,
    ]
});

const EquipmentRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={EquipmentRulesLink}>
        <p>
            Your equipment helps feed you when you're hungry, fires bullets at your enemies, and grants you the power to build worldchanging gadgets. Adventurers can find the equipment they need to explore the wasteland in markets or hidden away in ancient tombs from before <TheCataclysm />. Wherever you character found your equipment, this chapter will explain the basics of how to use and manage it.
        </p>
    </RulesArticle>
);
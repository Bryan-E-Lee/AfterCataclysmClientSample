import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Variant } from '../../directives/Directives';
import { RulesArticle } from '../RulesArticle';
import { SpaceRulesNavLink } from './SpaceRules';
import { HexesRulesNavLink } from './HexesRules';
import { TargetingRulesNavLink } from './TargetsShapesRules';
import { RangeRulesNavLink } from './RangeRules';
import { MovementRulesLink } from './MovementRules';
import { EnteringAndLeavingAreasRulesLink } from './EnteringAndLeavingRules';

export const MovementAndTargetingRulesLink = new ArticleNavLink({
    path: 'LocationMovement',
    name: 'Location & Movement',
    render: (index?: number) => <MovementAndTargetingRules index={index} siblings={RuleLinks} />,
    sublinks: [
        MovementRulesLink,
        HexesRulesNavLink,
        SpaceRulesNavLink,
        RangeRulesNavLink,
        TargetingRulesNavLink,
        EnteringAndLeavingAreasRulesLink,
    ]
});

const MovementAndTargetingRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={MovementAndTargetingRulesLink}>
        <p>
            When determining where your character is in relation to everything in the world, <em>500 After Cataclysm</em> uses a system of hexagons, known as hexes, to represent units of space that a character or object takes up and the distances between them.
        </p>
        <Variant>
            <p>
                Some players prefer to play with more freeform positioning. If your playgroup prefers, you can use a strategy called "Theater of the Mind" to determine the space and orientation of objects. Theater of the mind doesn't use any maps or central point of establishing location, players simply describe what they do, where they go, and where they're facing.
            </p>
            <p>
                If your playgroup would rather use Theater of the Mind, replace any reference to a "hex" in the rules with a distance of 2 meters, 2 yard, or 6 feet, whatever works best for your group.
            </p>
        </Variant>
    </RulesArticle>
)
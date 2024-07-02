import React from 'react';
import { ArticleProps } from '../../articles/ArticleProps';
import { RuleLinks } from '..';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';
import { DramaticScenesRulesLink } from './DramaticSceneRules';
import { EstablishingScenesRulesLink } from './EstablishingSceneRules';
import { MontageRulesLink } from './MontageRules';
import { ActRulesLink } from './ActRules';
import { Link } from "react-router-dom";

export const SceneRulesLink = new ArticleNavLink({
    path: 'Scenes',
    name: 'Scenes',
    render: (index?: number) => <SceneRules index={index} siblings={RuleLinks} />,
    sublinks: [
        EstablishingScenesRulesLink,
        DramaticScenesRulesLink,
        MontageRulesLink,
        ActRulesLink,
    ]
});

const SceneRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={SceneRulesLink}>
        <p>
            Everything takes time to occur. When roleplaying, using an appropriate length of time will help keep the pace of the game lively and interactive, divided into <em>scenes</em>. A scene is a unit of time determined by the GM but typically takes place over less than an hour. A scene represents a collection of events that occur in a single location with a relatively consistent set of characters. Scenes are purposeful: every scene will have some importance to the players. As a player, you should roleplay as your character would given the circumstances of the current scene.
        </p>
        <h2>Action Scenes</h2>
        <p>
            During combat or other intense situations where precise timing is needed to understand what's happening, you find yourself in an Action Scene. An action scene is composed of rounds, each lasting approximately 6 seconds. Action scenes, and how to roleplay them, are described in greater detail in the next chapter on <Link to='/Rules/Action'>Action Scenes</Link>.
        </p>
    </RulesArticle>
)
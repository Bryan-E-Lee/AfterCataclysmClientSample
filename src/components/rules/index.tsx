import './rules.scss';
import * as React from 'react';
import { IntroductionRulesLink } from './introduction';
import { CharacterCreationRulesLink } from './creating-your-character';
import { KinshipRulesLink } from './kinships';
import { SkillRulesLink } from './skills';
import { EquipmentRulesLink } from './equipment';
import { ArticleNavLink } from '../articles/navigation/article-navigation/ArticleNavLink';
import { PersonalityRulesLink } from './personalities';
import { ChallengeRulesLink } from './challenges';
import { ActionScenesRulesLink } from './action-scenes';
import { ConditionRulesLink } from './conditions';
import { DiceAndHandsRulesLink } from './dice-and-hands';
import { MovementAndTargetingRulesLink } from './location-movement';
import { SocialInteractionRulesLink } from './social-interactions';
import { TakeActionRulesLink } from './take-action';
import { ModRulesLink } from './mods';
import { MinionVehiclesRulesLink } from './minions-vehicles';
import { TableOfContents } from '../articles/TableOfContents';
import { HealthAndJuiceRulesLink } from './health-juice-fatigue';
import { SceneRulesLink } from './scenes';
import { CompetencyRulesLink } from './competencies';
import { Route, Routes } from 'react-router';

export const RuleLinks: ArticleNavLink[] = [];

export const Rules: React.FC = () => (
    <main className="game-info-page">
        <div className="contents">
            <Routes>
                {RuleLinks.map((route, index) => {
                    if (route.render != null) {
                        return <Route key={route.path} path={route.path} element={route.render(index)} />;
                    }
                })}
                <Route path="TableOfContents" element={<TableOfContents rootPath="Rules" contentName="Rules" links={RuleLinks} />} />
                <Route path="*"/>
            </Routes>
        </div>
    </main>
);

RuleLinks.push(
    IntroductionRulesLink,
    CharacterCreationRulesLink,
    KinshipRulesLink,
    SkillRulesLink,
    PersonalityRulesLink,
    SocialInteractionRulesLink,
    CompetencyRulesLink,
    EquipmentRulesLink,
    ModRulesLink,
    HealthAndJuiceRulesLink,
    DiceAndHandsRulesLink,
    TakeActionRulesLink,
    SceneRulesLink,
    ActionScenesRulesLink,
    ChallengeRulesLink,
    MovementAndTargetingRulesLink,
    MinionVehiclesRulesLink,
    ConditionRulesLink,
);
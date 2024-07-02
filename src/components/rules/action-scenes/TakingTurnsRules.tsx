import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { GMNote } from '../../directives/Directives';
import { ActionRulesLink } from '../take-action/actions/ActionRules';
import { Link } from 'react-router-dom';

export const TakingTurnsRulesLink = new ArticleNavLink({
    name: 'Taking Turns',
    path: '#TakingTurns',
    render: () => <TakingTurnsRules />
});

const TakingTurnsRules: React.FC = () => (
    <section id={TakingTurnsRulesLink.hash}>
        <h2>{TakingTurnsRulesLink.name}</h2>
        <p>
            It's finally the players' turn to act! This is where you use your <Link to={ActionRulesLink.path}>Actions</Link> to do battle. During an action scene, time should be processed in standard 6 second intervals for a round, though if the GM doesn't think this is an especially important scene, they might let you and your friends get away with some shorthand for the conflict.
        </p>
        <GMNote>
            <p>
                Making every action take 6 seconds can slow things down, but also raise the stakes. Be careful when deciding to enter an action scene and, if the scene is trivial or will be resolved in a few short moments, use a more relaxed time scale to determine how events unfold.
            </p>
        </GMNote>
    </section>
);

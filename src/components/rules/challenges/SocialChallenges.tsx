import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Example } from '../../directives/Directives';
import { Link } from 'react-router-dom';

export const SocialChallengeRulesLink = new ArticleNavLink({
    name: 'Social Challenges',
    path: '#SocialChallenges',
    render: () => <SocialChallengesRules />,
    sublinks: []
});

const SocialChallengesRules: React.FC = () => (
    <section id={SocialChallengeRulesLink.hash} key={SocialChallengeRulesLink.path}>
        <h2>{SocialChallengeRulesLink.name}</h2>
        <p>
            Your GM may issue social challenges whenever they see fit based on how the conversation with one or more NPCs is going. Like with other challenges, GMs do not need to challenge players if they do not believe the encounter is meaningful enough to merit a challenge, whether that is good or bad for the party.
        </p>
        <Example>
            A ragtag band of adventurers is not going to convince a king to march his army on another province with words alone, and there is no need to raise a challenge to see if the party can successfully convince a villager that their house is on fire when they can turn and see it.
        </Example>
        <p>
            Social challenges are constructed in mostly the same manner as skill challenges, except players use dice boons as determined by their rhetoric level in the chapter on <Link to="/Rules/SocialInteractions#RhetoricalStrategies">rhetorical strategies</Link>. Here is an example interaction where a GM issues a social challenge to Chelle Zappah:
        </p>
        <Example>
            <blockquote>
                <strong>GM:</strong> Your party comes across a crippled member of the Bleeding Wolves gang. Left to die by his comrades, he chokes on his words. His arm is broken, and he has about an hour to live by the look of things.
                <br />
                <strong>Chelle (PC):</strong> You there, Wolf! You fought hard earlier and deserve a clean death. Tell us where your gang is headed, and I will end your suffering.
                <br />
                <strong>GM:</strong> Roll Reason
            </blockquote>
        </Example>
    </section>
);

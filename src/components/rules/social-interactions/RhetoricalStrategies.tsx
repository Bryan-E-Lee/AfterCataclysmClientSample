import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { GMNote } from '../../directives/Directives';
import { DiceBoonsPerLevelFigure } from '../figures/DiceBoonFigures';

export const RhetoricalStrategiesNavLink = new ArticleNavLink({
    name: 'Rhetorical Strategies',
    path: '#RhetoricalStrategies',
    render: () => <RhetoricalStrategiesRules />
});

const RhetoricalStrategiesRules: React.FC = () => (
    <section id={RhetoricalStrategiesNavLink.hash} key={RhetoricalStrategiesNavLink.path}>
        <h2>{RhetoricalStrategiesNavLink.name}</h2>
        <p>
            Rhetoric is the art of discourse and persuasion. When you encounter
            a social challenge, the type of reponse you give determines the
            rhetorical strategy you are using. The GM determines what strategy
            your words use, and then you must roll a challenge to that
            character. As with any other challenge, the GM rolls two dice and
            you roll the other 3. Like with skills, as your diplomatic abilities
            improve, you will gain benefits and advantages to your ability to
            use these strategies. There are three rhetorical strategies,
            described below, that you can utilize to engage in diplomacy,
            persuasion, and general dialogue with NPCs:
        </p>
        <dl>
            <dt>Charisma (Ethos)</dt>
            <dd>
                Charisma is the utilisation of admirable qualities, fear, or
                your "force" of personality.
            </dd>

            <GMNote>
                <p>
                    When designing Charisma challenges for players, try to
                    design them around differences in knowledge on a topic and
                    differences in social status. Charisma emphasizes one's
                    perceived authority with respect to a topic. The more a
                    character knows about a topic relative to another or the
                    more perceived status the character has towards another, the
                    more powerful their appeals to Charisma will be.
                </p>
            </GMNote>

            <dt>Empathy (Pathos)</dt>
            <dd>
                Empathy is the ability to relate to and evoke the emotional
                state of others.
            </dd>

            <GMNote>
                <p>
                    When designing Empathy challenges for your players, try to
                    design them around similarities in background and
                    experience. Empathy focuses on the ability for a character
                    to relate to another, so the more the two characters have in
                    common, the more powerful their appeals to Empathy will be.
                </p>
            </GMNote>

            <dt>Reason (Logos)</dt>
            <dd>
                Reason is the ability to appeal to logical explanations and
                descriptions.
            </dd>

            <GMNote>
                <p>
                    When designing Reason challenges for your players, they
                    should focus on the skill of the subject and the strength of
                    the argument. Reason appeals primary to rationale that is
                    more effective the more knowledgeable someone is about a
                    subject. The more one understands the soundness of the
                    reasoning, the more powerful appeals to Reason will be.
                </p>
            </GMNote>
        </dl>
        <p>
            Like with skills, your ability to employ rhetoric of different
            strategies increases as your rhetorical skill increases with 
            varying dice boons based on the table below:
        </p>
        <DiceBoonsPerLevelFigure leveledName='Rhetoric' />
        <p>
            Unlike with skills, you gain 1 rhetoric point when you level up and
            there is no restriction on where you can assign that point.
        </p>
    </section>
);

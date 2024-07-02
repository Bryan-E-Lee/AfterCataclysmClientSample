import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { DeclaringRollsNavLink } from './DeclaringRolls';
import { Link } from "react-router-dom";

export const ActionRollsNavLink = new ArticleNavLink({
    name: 'Action Rolls',
    path: '#ActionRolls',
    render: () => <ActionRollsRules />
});

const ActionRollsRules: React.FC = () => (
    <section id={ActionRollsNavLink.hash}>
        <h2>{ActionRollsNavLink.name}</h2>
        <p>
            When you perform an action roll, you roll dice to form a poker hand. These rolls will typically happen when your character is taking actions which require some level of awareness and forethought. The steps to take to resovle an action roll are listed below:
        </p>
        <ol>
            <li>
                The GM rolls two communal dice. Both players and the GM will use these dice to form hands.
            </li>
            <li>
                Acting players roll 3 six-sided dice (3d6).
            </li>
            <li>
                Players choose an ability to use for this action.
            </li>
            <li>
                Players may reroll some of their dice and roll extra dice based on the level of the skill they chose to use for this action. Any advantage / disadvantage generated from 
            </li>
            <li>
                Players <Link to={DeclaringRollsNavLink.path}>declare a hand</Link>.
            </li>
            <li>
                Players use an ability associated with the selected skill (listed on the ability itself). They perform any basic actions stated in the ability's description, plus any additional abilities that are specified to occur for their declared hand.
            </li>
        </ol>
        <p>
            When players perform a skill or rhetoric check as part of an <Link to="/Rules/Challenges#OpposedChallenges">Opposed Challenge</Link>, or when it is the GM's turn during an action scene to determine the enemy's behavior for the turn, the GM will also perform the steps above starting at step 2. Whenever it is time for a new set of actions to resolve, such as when the round ends during an action scene or when a different skill or rhetorical check begins, repeat all of the steps above.
        </p>
    </section>
);

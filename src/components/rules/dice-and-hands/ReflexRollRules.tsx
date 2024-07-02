import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Example } from '../../directives/Directives';
import { Link } from "react-router-dom";

export const ReflexRollsNavLink = new ArticleNavLink({
    name: 'Reflex Rolls',
    path: '#ReflexRolls',
    render: () => <ReflexRollsRules />
});

const ReflexRollsRules: React.FC = () => (
    <section id={ReflexRollsNavLink.hash}>
        <h2>{ReflexRollsNavLink.name}</h2>
        <p>
            Reflex rolls are much simpler than action rolls, representing their spur-of-the-moment nature. To perform a reflex roll, simply roll a d6 and compare the number rolled to the indicated success range of the effect; rolling high will generally produce better outcomes than rolling low. You may also have abilities which adjust  your die's effective roll, making it easier or harder to react to negative effects. When an effect instructs you to increase or decrease your die's roll by a specified amount, simply add the amount specified to your die's face, even if the result is higher than a 6 or lower than a 1. 
        </p>

        <h4>Difficulty Check (DC)</h4>
        <p>
            Abilities which cause you to perform a reflex roll will frequently reference a Difficulty Check, known as a "DC". When your reflex roll is greater than or equal to the value of a DC, it is considered a success. When your reflex roll is less than the value of a DC, it is considered a failure.
        </p>
        <Example>
            You are walking on <Link to="/Library/Hazards/Ice">Ice</Link> and must perform a reflex roll to determine if you fall prone or not. You roll a d6 and compare it to the indicated value of the hazard: a DC 4. If you get a 4 or greater, you do not fall prone. If you get a 3 or less, you fall prone.
        </Example>

        <p>
            Unlike players, NPCs do not roll for their attacks. Instead, players perform reflex rolls to defend against those attacks. Just as above, rolling high will generally reduce the damage received and mitigate other negative outcomes, whereas rolling low will generally increase the damage received and other negative outcomes.
        </p>
        <Example>
            A <Link to="/Library/Enemies/Bandit+Soldier">Bandit Soldier</Link> attacks you with a handgun. You roll a d6 to perform a DC 5 defensive reflex roll. If you succeed, you take 1 less damage than normal. If you fail, you take full damage.
        </Example>
    </section>
);

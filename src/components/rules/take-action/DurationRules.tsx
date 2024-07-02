import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";
import { RequiresAttentionIcon } from "../../icons/CharacterIcons";
import { Link } from "react-router-dom";

export const DurationRulesLink = new ArticleNavLink({
    name: 'Ability Durations',
    path: '#Durations',
    render: () => <DurationRules />
})

const DurationRules = () => (
    <section id={DurationRulesLink.hash}>
        <h2>{DurationRulesLink.name}</h2>
        <p>
            Not all abilities stay active for the same amount of time. Below is a list of stages - the different types of durations - an ability can refer to in order of length:
        </p>
        <ol>
            <li>
                Instantaneous. The ability lasts until all of its effects have occurred as noted in its description and roll triggers, and then ends.
            </li>
            <li>
                Until the end of your turn.
            </li>
            <li>
                Until the start of your next turn.
            </li>
            <li>
                Until the end of your next turn.
            </li>
            <li>
                Until the end of the scene.
            </li>
            <li>
                Forever. The ability lasts until it or its source is removed. If an ability applies an effect and it does not specify when that effect ends, it lasts forever.
            </li>
        </ol>
        <p>
            Sometimes, an ability's duration might be modified. If an effect instructs you to increase an ability's duration by some number of stages. Count down the list in ascending order to find the new duration. If the duration would be longer than forever, it is forever instead. Other times, an ability's duraton might be reduced. To find the new duration, do the same process in reverse: go up the list in descending order to find the new duration. If the duration would be shorter than instantaneous, it is instantaneous instead. If an effect which caused a duration to increase or decrease is removed, the ability returns to its normal duration, ending if it has lasted longer than that.
        </p>
        <Example>
            Chelle uses a smoke grenade which creates smoke until the end of her next turn. However, there is an active Time Bender, which is being used to decrease the duration of all other abilities by 1 stage. Because <em>until the end of your start of your next turn</em> is one stage before <em>until the end of your next turn</em>, Chelle's smoke now lasts until the end of her next turn instead. If the Time Bender was being used to increase the duration of all other abilities by 1 stage instead, her smoke would last until the end of the scene instead or until the Time Bender's effect is removed.
        </Example>

        <h3>Damage & Durations</h3>
        <p>
            When abilities instruct you to deal damage, they deal their damage only when indicated even if an effect would increase the duration of the damaging ability.
        </p>
        <Example>
            Chelle has an active <Link to="/Library/Items/Immolation+Cloak">immolation cloak</Link> that lasts until the end of the scene and instructs her to deal 4 thermal damage at the end of each of her turns for its duration. The 4 thermal damage is dealt only once at the end of each turn.
        </Example>

        <h4>Attention</h4>
        <p>
            Some abilities require your attention. That means you must focus your attention on maintaining the effects of that ability, and the ability ends early if your attention is diverted either through an effect, by focusing your attention on a different spell, or intentionally dropping your attention. If an ability would have its duration altered, it still requires your attention and will end when your attention is diverted. The icon below indicates when an ability requires your attention for its duration:
        </p>
        <RequiresAttentionIcon className="rules-example-icon" />
    </section>
)
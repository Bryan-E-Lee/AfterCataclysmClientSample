import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const EnteringAndLeavingAreasRulesLink = new ArticleNavLink({
    name: 'Entering & Leaving Areas',
    path: '#EnteringAndLeavingAreas',
    render: () => <EnteringAndLeavingAreasRules />
})

const EnteringAndLeavingAreasRules = () => (
    <section id={EnteringAndLeavingAreasRulesLink.hash} key={EnteringAndLeavingAreasRulesLink.path}>
        <h2>{EnteringAndLeavingAreasRulesLink.name}</h2>
        <p>
            Several abilities will mention that something occurs when you enter, move through, or leave an area. These terms are used as follows:
        </p>
        <ul>
            <li>
                You <em>enter</em> an area when you move into an affected hex from an unaffected hex. 
                <Example>
                    There is a smoke cloud occupying an area a few hexes away from you. If you move from your current location into the smoke, you have <em>entered</em> the smoke's area.
                </Example>
            </li>
            <li>
                You <em>move through</em> an area when you move from an affected hex into another affected hex.
                <Example>
                    You are inside a smoke cloud and move into another hex still within the smoke. You have <em>moved through</em> the smoke's area.
                </Example>
            </li>
            <li>
                You <em>leave</em> an area when you move from an affected hex into an unaffected hex.
                <Example>
                    You are inside a smoke cloud and move into a hex outside the smoke. You have <em>left</em> the smoke's area.
                </Example>
            </li>
        </ul>
    </section>
)
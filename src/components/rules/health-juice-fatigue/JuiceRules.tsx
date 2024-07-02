import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { JuiceIcon } from "../../icons/CharacterIcons";
import { Link } from "react-router-dom";

export const JuiceRulesLink = new ArticleNavLink({
    name: 'Juice',
    path: '#Juice',
    render: () => <JuiceRules />
})

const JuiceRules = () => (
    <section id={JuiceRulesLink.hash} key={JuiceRulesLink.path}>
        <h2>{JuiceRulesLink.name}</h2>
        <p>
            On your journeys, you will gain access to special abilities: some which generate energy - juice - and others which consume your juice. Juice is binary: your character either has juice or does not have juice. If an ability indicates it requires juice, then it cannot be used unless juice is consumed. If an ability indicates that it juices you, then it can still be used even if you are already juiced.
        </p>
        <p>
            At the beginning of every scene, you become juiced if you aren't already juiced unless you have the <Link to="/Library/Conditions/Fatigued" target="_blank">Fatigued</Link> status. Fatigue is covered in the next section, and the fatigued condition is covered in greater detail in the <Link to="/Rules/Conditions#Fatigued">fatigued section of the conditions chapter</Link>. Below is the juice icon, which is often used to represent juice:
        </p>
        <JuiceIcon className="rules-example-icon" />
    </section>
)
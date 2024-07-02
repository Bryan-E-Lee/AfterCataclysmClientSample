import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { GMNote, PlayerNote } from "../../directives/Directives";
import { Link } from "react-router-dom";

export const GainingTraitsRulesLink = new ArticleNavLink({
    name: 'Gaining Traits',
    path: '#GainingTraits',
    render: () => <GainingTraits />
});

const GainingTraits: React.FC = () => (
    <section id={GainingTraitsRulesLink.hash} key={GainingTraitsRulesLink.path}>
        <h2>Gaining Traits</h2>
        <p>
            Gaining traits is as easy as roleplaying your character. As you behave in accordance with your character's personality, the GM will assign you traits that fit that behavior. Alternatively, if you believe your character has behaved in a way that merits receiving a trait, you can request that trait from the GM. Generally, players should have 5 or fewer personality traits as only traits are intended to represent core aspects of your personality.
        </p>
        <GMNote>
            It's a good idea to focus on the most pronounced traits that a character displays. Several characters may qualify for the <Link to="/Library/PersonalityTraits/Bold">bold</Link> trait, but for some characters it will be a far more definining trait than others. Also note that traits are subjective. Do not hand out traits haphazardly, positive or negative, as your perception of how someone is behaving may not align with others' perspectives.
        </GMNote>
        <PlayerNote>
            Try not to request traits from the GM too frequently. Requesting traits too often can give others the feeling that you are roleplaying to accomplish a personal goal than to realize a character you have envisioned. Ultimately, whether or not you are deserving of a trait is determined by the GM, and they may see fit to restrict your ability to gain traits or even assign you the <Link to="/Library/PersonalityTraits/Flip+Flopper">flip-flopper</Link> trait if they feel you are saying whatever you think will get you want.
        </PlayerNote>
    </section>
);
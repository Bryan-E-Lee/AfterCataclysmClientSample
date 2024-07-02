import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Example } from "../../directives/Directives";

export const ExpertiseNavLink = new ArticleNavLink({
    name: "Expertise",
    path: "#Expertise",
    render: () => <ExpertiseRules />
});

const ExpertiseRules = () => (
    <section id={ExpertiseNavLink.hash}>
        <h2>{ExpertiseNavLink.name}</h2>
        <p>
            Sometimes, your character is more than just competent at something: they're an expert. To represent their expertise, their competency can be upgrade to <em>Expertise</em>. <em>Expertise</em> represents a mastery of the skill or knowledge in question. What constitutes something your character could reasonably be expected to know or do with <em>expertise</em> is going to be higher than with a regular competency. It's up to you and your GM to determine what counts as reasonable, but remember that expertise should be meaningful!
        </p>
        <Example>
            Chelle is an expert at playing an instrument. It's reasonable to expect that she can perform well enough to impress high ranking officials during a gala. Someone who is merely competent at an instrument might not be considered for such an important and prestigious event. Similarly, an expert playing an instrument as a street performer will draw a much larger crowd and earn more money than someone who is merely competent with an instrument. Chelle's expertise allowed her to catch the ear of these important officials and that may give the party opportunities in the future!
        </Example>
    </section>
)
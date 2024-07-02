import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const ModRulesNavLink = new ArticleNavLink({
    name: 'Body Mods',
    path: '#BodyMods',
    render: () => <ModRules />
});

const ModRules: React.FC = () => (
    <section id={ModRulesNavLink.hash}>
        <h2>{ModRulesNavLink.name}</h2>
        <p>
            Just like equipment, you can modify your body. All characters have the ability to modify their body once for free (and again at level 8). Unlike equipment mods, body mods will tend to affect your roleplaying options more than having explicit mechanical abilities. You could have replaced your arm with a mechanical version or maybe your eyes can zoom in on details in the distance and capture images. Body mods are distinguished from other mods by having the &ldquo;Body&rdquo; tag. Body mods can only be attached to your body, and non-body mods cannot be attached to your body.
        </p>
        <p>
            Characters who have modded themselves with mechanical augmentations are known as cyborgs, and characters who are modded with genetic alterations are considered mutants, but not all mods are sufficiently different from a baseline human to make you considered as such. If a mod causes your character to be considered a cyborg or mutant, it will have a corresponding tag to indicate that. Cyborgs and mutants are seen as different from other humans, and may be outcast or accepted based on the types of communities your characters interact with. If your character has a cybernetic modification, the mod is subject to the malfunctioning condition and hacking damage.
        </p>
        <figure>
            <img src="/public/assets/images/splash/cyborg.png" />
            <figcaption>A cyborg enjoys a well-earned beer.</figcaption>
        </figure>
    </section>
);
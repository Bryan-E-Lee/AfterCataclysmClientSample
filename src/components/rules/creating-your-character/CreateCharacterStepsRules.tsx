import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Directive } from '../../directives/Directives';
import { NavLink } from 'react-router-dom';

export const CreateCharacterStepsRulesLink = new ArticleNavLink({
    name: 'Creating Your Character',
    path: '#CreatingYourCharacter',
    render: () => <CreateCharacterStepsRules />
});

const CreateCharacterStepsRules: React.FC = () => (
    <section id={CreateCharacterStepsRulesLink.hash} key={CreateCharacterStepsRulesLink.path}>
        <h2>{CreateCharacterStepsRulesLink.name}</h2>
        <p>
            Before you begin playing the game, you need to create a character to portray. This guide will help you create your first character. When this guide doesn't give explicit instructions on what to do, such as creating a character concept, how you achieve that task is entirely up to you. To track your character's progress and attributes, you can use <NavLink to="/ComingSoon">this</NavLink> character sheet to or use our digital tools over on the <NavLink to="/Characters" target="_blank">characters page</NavLink> (login required).
        </p>
        <figure className='float-right align-center'>
            <img src="/public/assets/images/splash/bard.png" />
            <figcaption>Chelle Zappah, bard and electromancer.</figcaption>
        </figure>
        <p>
            To help you build your first character, this guide will walk you through creating Chelle Zappah: a young and boisterous bard. To create Chelle or another character of your choice, you need to follow each of the following steps:
        </p>
        <ol>
            <li>
                Come up with a concept for your character.
            </li>
            <li>
                Choose a name and kinship for your character.
            </li>
            <li>
                Describe your character's appearance. What do they look like?
            </li>
            <li>
                Choose one of the preset character classes described later or distribute your starting skill points into each of your <NavLink to="/Library/Skills">skills</NavLink>.
            </li>
            <li>
                Select two <NavLink to="/Library/PersonalityTraits">personality traits</NavLink>.
            </li>
            <li>
                Choose your primary and secondary <NavLink to="/Library/Rhetoric">rhetorical strategies</NavLink>.
            </li>
            <li>
                Choose your character's <NavLink to="/Library/Competencies">competencies</NavLink>.
            </li>
        </ol>
        <Directive header="Creating Chelle Zappah">
            <p>
                To help you with character creation, each step of this chapter will include an example of how to create a character: Chelle Zappah, a young bard.
            </p>
        </Directive>
    </section>
);

import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { PlayerNote } from '../../directives/Directives';
import { Link } from "react-router-dom";

export const ModRulesLink = new ArticleNavLink({
    name: 'Mods',
    path: '#Mods',
    render: () => <ModRules />
});

const ModRules: React.FC = () => (
    <section id={ModRulesLink.hash} key={ModRulesLink.path}>
        <h2>{ModRulesLink.name}</h2>
        <p>
            A weapon is usually something seen as personal and sacred, and weapons are frequently revered as having supernatural abilities. As you adventure, you will encounter powerful enhancements and upgrades for your weapons and armor and you may want to give it a special name to indicate its significance. Other characters will perceive this weapon as magically enchanted or capable of otherworldly feats. Items which alter how your equipment works by providing different abilities are called <em>mods</em>.
        </p>
        <p>
            Some mods are simple, such as ammunition, which lets you fire your weapon. Other mods confer more mystical and otherworldly effects to your equipment. As you attach different mods to your gear, you will gain access to the abilities those mods grant.
        </p>
        <PlayerNote>
            When starting play, try to make sure you always have at least one attack to use or spell to cast. A super extravagant rifle with a rangefinding scope and fancy muzzle brake is worthless without bullets to fire.
        </PlayerNote>
        <p>
            Equipment will indicate how many slots it has available for mods, and, with the exception of ammunition, you can only use one mod per mod category per item. For example, a handgun with three mod slots can have two different ammunitions and one barrel mod, but it cannot have two barrel mods. Learn more about mods and how to use them in the chapter on <Link to={'/Rules/Mods'}>mods</Link> section.
        </p>
    </section>
);

import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Link } from "react-router-dom";

export const WeaponRulesLink = new ArticleNavLink({
    name: 'Weapons',
    path: '#Weapons',
    render: () => <WeaponRules />
});

const WeaponRules: React.FC = () => (
    <section id={WeaponRulesLink.hash} key={WeaponRulesLink.path}>
        <h2>{WeaponRulesLink.name}</h2>
        <p>
            With so many dangers in the wasteland, you need to fight back with something. Your trusty weapons are your primary means of engaging with enemies. Weapons belong to different categories, and your weapon's category determines what types of special abilities you can use with it when you roll different hands.
        </p>
        <p>
            In addition to traditional weapons like rifles and knives, focuses - special tools used for casting spells, are considered weapons as well. Focuses can be almost anything: a guitar that can control the dead, a gigantic combination wrench with custom attachments, or a universal remote. Unlike weapons, focuses don't apply any special benefits when you use attached mods.
        </p>
        <p>
            You are allowed to wield up to 3 hands worth of weapons at a time: even though you don't have 3 hands, you still have that much weaponry available for use. You can see a complete list of weapons <Link to="/Library/Items?types=Weapon" target='_blank'>here</Link> and you can learn more about hands in the section on hands in the chapter on <Link to="/Rules/TakingAction">Taking Action</Link>.
        </p>
        <figure className="align-center">
            <img src="/public/assets/images/rules/gun-rack.png" />
            <figcaption>A shogunate thug presenting various smuggled weapons to a prospective client.</figcaption>
        </figure>
        {/* <figure className="align-center">
            <img src="/public/assets/images/splash/necromancer.png" />
            <figcaption>The infamous Necromancer, wielding the mighty <em>Axe of the Damned</em> which grants him control over undead minions with chips implanted into their spinal columns.</figcaption>
        </figure> */}
    </section>
);

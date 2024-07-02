import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Variant } from '../../directives/Directives';
import { Link } from "react-router-dom";

const ObscurementNavLink = new ArticleNavLink({ name: 'Obscurement', path: '#Obscurement' });
const LightingNavLink = new ArticleNavLink({ name: 'Lighting', path: '#Lighting' });
const BlindFiringNavLink = new ArticleNavLink({ name: 'Blind Firing', path: '#BlindFiring' });

export const TargetingRulesLink = new ArticleNavLink({
    name: 'Vision & Targeting',
    path: '#VisionTargeting',
    render: () => <TargetingRules />,
    sublinks: [ObscurementNavLink, LightingNavLink, BlindFiringNavLink],
});

const TargetingRules: React.FC = () => (
    <section id={TargetingRulesLink.hash} key={TargetingRulesLink.path}>
        <h2>{TargetingRulesLink.name}</h2>
        <p>
            When you attempt to use an action that targets another character or object, you must be able to see or know its location by some means in order to target it.
        </p>
        <section id={ObscurementNavLink.hash}>
            <h3>{ObscurementNavLink.name}</h3>
            <p>
                A character or object's obscurement determines how easy it is to see from a character's point of view. Like with cover, how obscured a subject is relative to one character may not be the same as their obscurement to another. For example, a character hiding behind a wall will be completely obscured to characters on the other side of the wall, but they will not be obscured to a character right next to them. There are three levels of obscurement:
            </p>
            <dl>
                <dt>Unobscured</dt>
                <dd>There is no barrier to visibly identifying the subject.</dd>

                <dt>Obscured</dt>
                <dd>
                    <p>
                        Your ability to perceive the subject is severely or completely reduced. Someone inside a cloud of smoke would be completely obscured to those outside the cloud. A character behind Total Cover is always obscured unless revealed by some other means. Attacks against an enemy you can see when you are obscured from their vision are made with advantage.
                    </p>
                </dd>
            </dl>
        </section>
        <section id={LightingNavLink.hash}>
            <h3>{LightingNavLink.name}</h3>
            <p>
                Lighting determines how well lit an area is, making it easier to see things. There are two different levels of lighting:
            </p>
            <dl>
                <dt>Normal Lighting</dt>
                <dd>
                    Normal lighting occurs in well lit areas or outside during the day.
                </dd>

                <dt>Poor Lighting</dt>
                <dd>
                    Poor lighting occurs at night or in unlit areas. In poor lighting, anything you look at is considered obscured.
                </dd>
            </dl>
            <p>
                Like with cover and obscuration, lighting is perceived differently by different characters. A character wearing <Link to="/Library/Items/Nightfinders">Night Finders</Link> will not be affected by poor lighting conditions.
            </p>
        </section>
        <section id={BlindFiringNavLink.hash}>
            <h3>{BlindFiringNavLink.name}</h3>
            <p>
                When you can't see your target, you can still attack them. Attacks against characters you can't see are made with disadvantage.
            </p>
            <Variant>
                If you know a character's location through some other means, you can limit the number of hexes you have to randomly select from when blind firing. For example, if your character can hear roughly where the enemy is, then you would only have to select randomly from hexes within 1 range of the target's actual location.
            </Variant>
        </section>
    </section>
);

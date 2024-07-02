import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

const CoverNavLink = new ArticleNavLink({ name: 'Cover', path: '#Cover' });
const PositioningNavLink = new ArticleNavLink({ name: 'Positioning', path: '#Positioning' });

export const CoverPositioningRulesLink = new ArticleNavLink({
    name: 'Cover & Positioning',
    path: '#CoverPositioning',
    render: () => <CoverPositioningRules />,
    sublinks: [CoverNavLink, PositioningNavLink]
});

const CoverPositioningRules: React.FC = () => (
    <section id={CoverPositioningRulesLink.hash} key={CoverPositioningRulesLink.path}>
        <h2>{CoverPositioningRulesLink.name}</h2>
        <section id={CoverNavLink.hash}>
            <h3>{CoverNavLink.name}</h3>
            <p>
                By taking cover behind concrete palisades, diving into a trench, or just getting low, you can reduce the amount of damage your character receives from attacks. Cover is relative, so what might count as cover from one enemy may not provide any protection from another! Consider the direction your enemies are in when assessing how defensible your position is. There are three types of cover:
            </p>
            <dl>
                <dt>No Cover</dt>
                <dd>
                    The character is receiving no noteworthy protection from the environment.
                </dd>

                <dt>Partial Cover</dt>
                <dd>
                    The character is receiving some cover from their environment. For example, they could be crouched (prone) in a foxhole or hiding behind sandbags. Ranged attacks and spells that target a character behind partial cover are made with disadvantage and characters behind partial cover have advantage on reflex rolls made against ranged attacks and spells. Partial cover may not work in all directions. For example, if you are taking cover behind a wall, the wall only provides partial cover for attacks from the other side.
                </dd>

                <dt>Total Cover</dt>
                <dd>
                    The character is completely protected from the enemy. The character may be located behind a building, completely obscured by a concrete bunker, or sitting in an underground complex. Characters in complete cover cannot be targeted and are immune to damage from abilities outside the cover unless otherwise specified. If an ability would damage a character while in Total Cover (through some special means), that character is treated as though they are in Partial Cover for that ability.
                </dd>
            </dl>
            <p>
                When taking cover while operating, riding in, or crouching behind a vehicle, all damage reduced by cover is dealt to the vehicle. Secondary effects from attacks made in this manner do not affect the vehicle unless otherwise specified.
            </p>
        </section>
        <section id={PositioningNavLink.hash}>
            <h3>{PositioningNavLink.name}</h3>
            <p>There are two positions a character can be in:</p>
            <dl>
                <dt>Standing</dt>
                <dd>
                    The character is standing upright. Standing upright will cause the character to no longer benefit from cover which is not sufficiently tall.
                </dd>

                <dt>Prone</dt>
                <dd>
                    <p>
                        The character is kneeling, crouched, or laying on the ground. While prone, characters have advantage when performing reflex rolls made against explosions and other abilities which affect an area. Melee attacks are made with advantage against a target that is prone. To get up from being prone, you must spend 3 hexes of movement.
                    </p>
                    <p>
                        Every hex traversed while prone costs 3 total hexes of movement, so if you can travel a total of 6 hexes normally, you can travel only 2 hexes while prone. Additionally, while you are prone, ranged attacks and spells have an additional 1 range.
                    </p>
                </dd>
            </dl>
        </section>
    </section>
);

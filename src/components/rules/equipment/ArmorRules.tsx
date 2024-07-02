import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { PercussiveIcon, ExplosiveIcon, ThermalIcon, CryoIcon, ElectromagneticIcon, CorrosiveIcon, BioIcon, HackIcon, PercussiveDescription, ExplosiveDescription, ThermalDescription, CryoDescription, ElectromagneticDescription, CorrosiveDescription, BioDescription, HackingDescription } from '../../icons';
import { Example } from '../../directives/Directives';
import { Link } from "react-router-dom";

export const ArmorNavLink = new ArticleNavLink({
    name: 'Armor and Resilience',
    path: '#ArmorResilience',
    render: () => <ArmorRules />
});

const ArmorRules: React.FC = () => (
    <section id={ArmorNavLink.hash} key={ArmorNavLink.path}>
        <h2>{ArmorNavLink.name}</h2>
        <p>
            Your armor is your lifeline; it can be the only thing keeping you from the throes of death. Your worn equipment provide Armor and Resilience and reduce the damage you take from enemy abilities.
        </p>
        <p>
            There are 7 types of damage, and two types of protection. Armor protects against Percussive and Explosive Damage, and Resilience protects against all other types of damage.
        </p>
        <ul>
            <li>
                <label className='standout'><PercussiveIcon /> Percussive Damage</label>&nbsp;
                {PercussiveDescription}
            </li>
            <li>
                <label className='standout'><ExplosiveIcon /> Explosive Damage</label>&nbsp;
                {ExplosiveDescription}
            </li>
            <li>
                <label className='standout'><ThermalIcon /> Thermal Damage</label>&nbsp;
                {ThermalDescription}
            </li>
            <li>
                <label className='standout'><CryoIcon /> Cryo Damage</label>&nbsp;
                {CryoDescription}
            </li>
            <li>
                <label className='standout'><ElectromagneticIcon /> Electromagnetic Damage</label>&nbsp;
                {ElectromagneticDescription}
            </li>
            <li>
                <label className='standout'><CorrosiveIcon /> Corrosive Damage</label>&nbsp;
                {CorrosiveDescription}
            </li>
            <li>
                <label className='standout'><BioIcon /> Biological Damage</label>&nbsp;
                {BioDescription}
            </li>
            <li>
                <label className='standout'><HackIcon /> Hacking Damage</label>&nbsp;
                {HackingDescription}
            </li>
        </ul>
        <Example>
            For example, if you are wearing a <Link to="/Library/Equipment/Breastplate">Breastplate</Link>, which has an Armor Value of 1, and you get hit by a bullet which deals 5 percussive damage, you would only take 4 of that damage. Alternatively, if you were hit by a flamethrower, which dealt 5 thermal damage, you would take the full 5 damage because <Link to="/Library/Equipment/Breastplate">Breastplate</Link> provides no resilience.
        </Example>
        <p>
            If you would take multiple types of damage at once from a source, you can reduce the damage received with both your Armor and Resilience. Armor and Resilience can still only reduce damage of the appropriate type.
        </p>
        <Example>
            If an attack would deal 2 <PercussiveIcon /> percussive damage and 2 <CryoIcon /> cryo damage and you have an armor of 1 and a resilience of 1, you can reduce the total damage of the attack by 2. If you have 3 armor and 0 resilience, you can reduce the percussive damage by 2 but not reduce the cryo damage at all.
        </Example>
        <p>
            If an attack would deal multiple types of damage that are reduced by the same type of protection, you can continue reducing the damage until the total amount of protection has been provided.
        </p>
        <Example>
            If an attack would deal 2 <PercussiveIcon /> percussive and 2 <ExplosiveIcon /> explosive damage when you have 3 armor, you can reduce the percussive damage by 2 and then continue reducing the explosive damage with your remaining 1 armor.
        </Example>
        <p>
            While anyone can wear armor, not every character is equally proficient at wearing armor, and some armors may require technical expertise that your character simply lacks. Below is 
        </p>
        <dl>
            <dt>Light Armor</dt>
            <dd>Anyone can wear light armor.</dd>

            <dt>Medium Armor</dt>
            <dd>Only special abilities can give you the ability to wear medium armor.</dd>

            <dt>Heavy Armor</dt>
            <dd>Only special abilities can give you the ability to wear heavy armor.</dd>
        </dl>
    </section>
);

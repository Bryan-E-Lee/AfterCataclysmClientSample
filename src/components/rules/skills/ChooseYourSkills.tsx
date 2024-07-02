import React from "react";
import { Link } from "react-router-dom";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive } from "../../directives/Directives";

const PickAClassLink = new ArticleNavLink({
    name: 'Choose a Class',
    path: '#Classes',
});

const CustomSkillsLink = new ArticleNavLink({
    name: 'Customize Your Skills',
    path: '#CustomizedSkills',
});

export const ChooseYourSkillsRulesLink = new ArticleNavLink({
    name: 'Choose Your Skills',
    path: '#ChooseSkills',
    render: () => <ChooseYourSkillsRules />,
    sublinks: [
        PickAClassLink,
        CustomSkillsLink,
    ]
});

const ChooseYourSkillsRules: React.FC = () => (
    <section id={ChooseYourSkillsRulesLink.hash} key={ChooseYourSkillsRulesLink.path}>
        <h2>{ChooseYourSkillsRulesLink.name}</h2>
        <p>
            Every character has a different set of skills. When creating your character you will need to choose some skills to specialize in. To do so, you can either select one of a number of premade classes or customize your starting skill points.
        </p>
        <section id={PickAClassLink.hash}>
            <h3>{PickAClassLink.name}</h3>
            <p>
                Rather than pick all of your skills yourself, you can always pick a class. Each class has a preset collection of skill allotments so you don't have to worry about deciding what might work best to fit your character concept. When you select a class, note the skill values in the matching section of your character sheet. The different classes and their skill adjustments are listed below:
            </p>
            <Directive header="Picking Chelle's Class">
                <p>
                    Since Chelle can work effectively with electricity, the Bard class is a perfect fit for Chelle. If you agree, note that Chelle has an Electronics skill of 3 and an Medcicine skill of 2 in the <em>Skills</em> section of your character sheet.
                </p>
            </Directive>
            <CollapsibleSection header="Bard" expandedInitially>
                <p>
                    The Bard is a master of influencing others with music with a bit of medical knowledge to keep both their companions' bodies and spirits in good health:
                </p>
                <ul>
                    <li>+2 to Electronics</li>
                    <li>+1 to Medicine</li>
                </ul>
            </CollapsibleSection>
            <p>
                In the "Class" section of your character sheet, you may enter any name you want to describe what your character does.
            </p>
        </section>
        <section id={CustomSkillsLink.hash}>
            <h3>{CustomSkillsLink.name}</h3>
            <p>
                If you prefer to customize your character's skills, you can manually assign points to them when creating your character and when leveling up. To do so, simply mark your chosen skill values on your character sheet. The rules for skill assignment can be found in the section below.
            </p>
            <Directive header="Alternatively, Assigning Chelle's Skills">
                <p>
                    While you could choose the Bard class for Chelle as we recommend, what she's competent as is up to you. You can stick with the existing assignments of +2 to Electronics and +1 to Medicine, or maybe you see Chell as a bit more Athletic, giving her+1 to Athletics instead of Medicine. You could also completely redistribute her skill points to +1 Electronics, +1 Athletics, and +1 Melee. Whatever you decide to go with, mark down your skill values in the <em>Skills</em> section on your character sheet.
                </p>
            </Directive>
        </section>
    </section>
);

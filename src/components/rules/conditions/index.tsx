import React from 'react';
import { RuleLinks } from '..';
import { ArticleProps } from '../../articles/ArticleProps';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { RulesArticle } from '../RulesArticle';

const Addicted = new ArticleNavLink({ name: "Addicted", path: "#Addicted" });
const Aromatic = new ArticleNavLink({ name: 'Aromatic', path: '#Aromatic' });
const Adrenalized = new ArticleNavLink({ name: 'Adrenalized', path: '#Adrenalized' });
const Burned = new ArticleNavLink({ name: 'Burned', path: '#Burned' });
const Bloodied = new ArticleNavLink({ name: 'Bloodied', path: '#Bloodied' });
const Concussed = new ArticleNavLink({ name: 'Concussed', path: '#Concussed' });
const Cuffed = new ArticleNavLink({ name: 'Cuffed', path: '#Cuffed' });
const Dazed = new ArticleNavLink({ name: 'Dazed', path: '#Dazed' });
const Deafened = new ArticleNavLink({ name: 'Deafened', path: '#Deafened' });
const Demoralized = new ArticleNavLink({ name: 'Demoralized', path: '#Demoralized' });
const Fatigued = new ArticleNavLink({ name: 'Fatigued', path: '#Fatigued' });
const Frenzied = new ArticleNavLink({ name: 'Frenzied', path: '#Frenzied' });
const Hypothermic = new ArticleNavLink({ name: 'Hypothermic', path: '#Hypothermic' });
const Incensed = new ArticleNavLink({ name: 'Incensed', path: '#Incensed' });
const Malfunctioning = new ArticleNavLink({ name: 'Malfunctioning', path: '#Malfunctioning' });
const Muffled = new ArticleNavLink({ name: 'Muffled', path: '#Muffled' });
const Restrained = new ArticleNavLink({ name: 'Restrained', path: '#Restrained' });
const Resuscitated = new ArticleNavLink({ name: 'Resuscitated', path: '#Resuscitated' });
const Ridiculous = new ArticleNavLink({ name: 'Ridiculous', path: '#Ridiculous' });
const Sickened = new ArticleNavLink({ name: 'Sickened', path: '#Sickened' });
const Stinky = new ArticleNavLink({ name: 'Stinky', path: '#Stinky' });
const Unconscious = new ArticleNavLink({ name: 'Unconscious', path: '#Unconscious' });
const Vivacious = new ArticleNavLink({ name: 'Vivacious', path: '#Vivacious' });

export const ConditionRulesLink = new ArticleNavLink({
    path: 'Conditions',
    name: 'Conditions',
    render: (index?: number) => <ConditionRules index={index} siblings={RuleLinks} />,
    articleOnlySublinks: true,
    sublinks: [
        Addicted,
        Aromatic,
        Adrenalized,
        Burned,
        Bloodied,
        Cuffed,
        Dazed,
        Demoralized,
        Fatigued,
        Frenzied,
        Hypothermic,
        Incensed,
        Malfunctioning,
        Muffled,
        Restrained,
        Resuscitated,
        Ridiculous,
        Sickened,
        Stinky,
        Deafened,
        Unconscious,
        Vivacious,
    ]
});

const ConditionRules: React.FC<ArticleProps> = (props: ArticleProps) => (
    <RulesArticle {...props} link={ConditionRulesLink}>
        <p>
            Your character can become afflcited by various conditions throughout your journeys in the wasteland. Engaging in action scenes, your behavior, and social circumstances can all cause you to acquire these conditions. While not all conditions are bad, most are, so be wary!
        </p>
        <dl>
            <dt id={Addicted.hash}>{Addicted.name}</dt>
            <dd>
                An addicted character is suffering withdrawal symptoms. They are affected by any other conditions associated with their addiction until they have cured their addiction. Look at the usage directions for whatever got them addicted to learn how to cure it. Addicts cannot benefit from drugs the are addicted to, and taking the drug will not provide its normal benefits, only temporarily removing the addicted status and withdrawal symptoms for the duration of the drug's dose. People will try to avoid confrontations or interactions with addicts.
            </dd>

            <dt id={Adrenalized.hash}>{Adrenalized.name}</dt>
            <dd>
                An adrenalized character is experiencing an adrenaline high. While adrenalized, a character ignores all other status effects during action scenes.
            </dd>

            <dt id={Aromatic.hash}>{Aromatic.name}</dt>
            <dd>
                An aromatic character has a pleasant scent, giving them advantage on all personality checks.
            </dd>

            <dt id={Bloodied.hash}>{Bloodied.name}</dt>
            <dd>
                A character who is bloodied looks like they have been through a rough patch. Characters will strongly prefer to recommend this character seek medical attention unless they are announcing an emergency. The above has no effect on other bloodied characters, or on characters who know why the character is bloodied and are not concerned by it.
            </dd>

            <dt id={Burned.hash}>{Burned.name}</dt>
            <dd>
                A burned character is suffering from second or third degree burns. Burned characters receive -1 resilience.
            </dd>

            <dt id={Cuffed.hash}>{Cuffed.name}</dt>
            <dd>A cuffed character cannot use a cuffed hand.</dd>

            <dt id={Dazed.hash}>{Dazed.name}</dt>
            <dd>
                A dazed character is currently experiencing visual sensory overload. They cannot see more than 1 hex in any direction, all attacks made against them are treated as though they were from behind, and they cannot focus their attention on spells.
            </dd>

            <dt id={Deafened.hash}>{Deafened.name}</dt>
            <dd>
                A deafened character is currently unable to hear. Any auditory requirements to take an action cannot be met.
            </dd>

            <dt id={Demoralized.hash}>{Demoralized.name}</dt>
            <dd>
                A demoralized character feels incredible dread and hopelessness. They deal 2 less damage against the source of their demoralization. This cannot reduce the damage a character would deal below 1.
            </dd>

            <dt id={Fatigued.hash}>{Fatigued.name}</dt>
            <dd>
                A fatigued character is sleep deprived, overexerted, or otherwise exhausted. Fatigued characters have disadvantage on all rolls.
            </dd>

            <dt id={Frenzied.hash}>{Frenzied.name}</dt>
            <dd>
                A frenzied character has an additional 2 movement and deals an additional 2 damage with their attacks. Frenzied characters cannot focus their attention on spells.
            </dd>

            <dt id={Hypothermic.hash}>{Hypothermic.name}</dt>
            <dd>
                A hypothermic character is having difficulty maintaining their internal body temperature. Hypothermic characters have their movement reduced by 2, if they have moved for the turn, they cannot perform ranged attacks or cast ranged spells, if they have performed a ranged attack or spell they cannot move for the turn, and they cannot take reactions.
            </dd>

            <dt id={Incensed.hash}>{Incensed.name}</dt>
            <dd>
                A character who is incensed is so angry they aren't thinking clearly. While incensed, they can only attack or target the subject or subjects of their rage.
            </dd>

            <dt id={Malfunctioning.hash}>{Malfunctioning.name}</dt>
            <dd>
                A malfunctioning character or object is currently not working as intended. A malfunctioning character cannot move, makes random utterances and actions such as flashing lights and other features if available. A character cannot malfunction unless they are mechanical.
            </dd>

            <dt id={Muffled.hash}>{Muffled.name}</dt>
            <dd>
                A muffled character cannot speak or produce sounds through their normal sources (e.g. their voice, a speaker, or a horn) louder than a whisper. Characters can still produce sounds by causing two objects to collide with one another or as the result of an attack action. A muffled character  automatically fails any personality checks unless the character and the interlocutor understand sign language or can communicate via writing.
            </dd>

            <dt id={Resuscitated.hash}>{Resuscitated.name}</dt>
            <dd>A resuscitated character has been recently revived, and cannot be revived again.</dd>

            <dt id={Restrained.hash}>{Restrained.name}</dt>
            <dd>A restrained character cannot move.</dd>

            <dt id={Ridiculous.hash}>{Ridiculous.name}</dt>
            <dd>
                A character who is ridiculous probably does not realize it. Their hair could be in cowlicks, their shirt on backwards, or someone put a “Kick Me” sign on their back. Ridiculous characters will not be taken seriously by most people, and any personality checks they attempt are treated as two hands  worse and they lose all ties. None of the above applies to other ridiculous characters.
            </dd>

            <dt id={Sickened.hash}>{Sickened.name}</dt>
            <dd>
                A sickened character can be nauseated, vomiting, or otherwise feeling unwell. Treat all rolls by sickened characters as though they were one roll lower and they lose all ties.
            </dd>

            <dt id={Stinky.hash}>{Stinky.name}</dt>
            <dd>
                A stinky character emits a foul odor. Stinky characters treat all personality checks as though they were one hand worse. Characters interacting with a stinky character wish for the conversation to end as quickly as possible, and will take actions to try and stop the conversation. None of the above  applies to other stinky characters.
            </dd>

            <dt id={Unconscious.hash}>{Unconscious.name}</dt>
            <dd>
                Unconscious characters cannot perform any actions, reactions, or move unless they are sleepwalking or being controlled by a third party. Unconscious characters cannot focus their attention on spells.
            </dd>

            <dt id={Vivacious.hash}>{Vivacious.name}</dt>
            <dd>
                Vivacious characters have advantage on reflex rolls and skill checks.
            </dd>
        </dl>
    </RulesArticle>
)

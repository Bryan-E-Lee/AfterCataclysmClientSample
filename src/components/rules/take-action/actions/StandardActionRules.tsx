import React from "react";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";
import { Link } from "react-router-dom";
import { AttackRulesLink } from "../../mods/AttackRules";
import { SpellRulesLink } from "../../mods/SpellRules";
import { GMNote } from "../../../directives/Directives";

const AttackLink = new ArticleNavLink({
    path: "#Attacks",
    name: "Attacks",
});

const SpellsLink = new ArticleNavLink({
    path: "#Spells",
    name: "Spells",
})

const UseEquipmentLink = new ArticleNavLink({
    path: "#UseEquipment",
    name: "Use Equipment",
});

const CommandLink = new ArticleNavLink({
    path: "#Command",
    name: "Command Minions & Pilot Vehicles",
});

const InteractLink = new ArticleNavLink({
    path: "#Interact",
    name: "Interact With Objects",
});

const KitswapLink = new ArticleNavLink({
    path: "#Kitswapping",
    name: "Kitswap"
});

const ImproviseLink = new ArticleNavLink({
    path: "#Improvise",
    name: "Improvise"
})

export const StandardActionRulesLink = new ArticleNavLink({
    name: 'Standard Actions',
    path: '#StandardActions',
    render: () => <StandardActionRules />,
    sublinks: [
        UseEquipmentLink,
        AttackLink,
        SpellsLink,
        CommandLink,
        InteractLink,
        ImproviseLink,
    ]
});

export const StandardActionRules: React.FC = () => (
    <section id={StandardActionRulesLink.hash} key={StandardActionRulesLink.path}>
        <h2>{StandardActionRulesLink.name}</h2>
        <p>
            Most of the time, you will be using an action ability granted to you by your equipment, perks, or skill features. The outcome of your standard actions are usually determined by the hand you roll with your dice. When you have the opportunity to act, you'll perform the steps listed in the <Link to="/Rules/DiceHands#ActionRolls">action rolls section</Link> of the previous chapter. If an action does not mention any outcome for a given hand, it does only what it says in its basic description. Below is a list of standard actions you can take:
        </p>

        <section id={UseEquipmentLink.hash}>
            <h3>{UseEquipmentLink.name}</h3>
            <p>
                Most actions you perform use your equipment. These include shooting a gun, dispensing medicine for an ally, or using wire cutters to cut through a fence. Attacking and casting spells both usually involve the use of equipment. Using a piece of equipment uses as many hands as that piece of equipment requires.
            </p>

            <section id={AttackRulesLink.hash}>
                <h4>{AttackRulesLink.name}</h4>
                <p>
                    An attack is made with ammunition from a weapon or when an ability states it's an attack. With attacks, you use the roll triggers for the weapon you used to make the attack with and then apply the effects of the ammunition you use with the weapon to that attack.
                </p>
                {/* <Example>
                    Chelle rolls a <em>Two-Pair</em> using her firearms skill (at 3). She fires her <Link to="/Library/Items/Energy+Rifle">energy rifle</Link> at an enemy using <Link to="/Library/Items/Laser+Batteries">laser batteries</Link>. Because the rifle is <em>Empowered</em> on a Two-Pair, her attack is empowered and deals the ammunition's damage. So the attack will deal 3 + 1 = 4 electromagnetic (<ElectromagneticIcon />) damage.
                </Example> */}
            </section>

            <section id={SpellRulesLink.hash}>
                <h4>{SpellRulesLink.name}</h4>
                <p>
                    Spells are cast with spell mods attached to a spell focus or when an ability states it's a spell. With spells, you use the roll triggers for the spell's corresponding skill and then apply any effects from your focus to the spell.
                </p>
                {/* <Example>
                    Chelle rolls a <em>Triple</em> with her Electronics skill. She decides to use her <Link to="/Library/Items/Sonic+Bowel+Disruptor">Sonic Bowel Disruptor</Link>. The spell states that targets in an 8 hex cone become <Link to="/Library/Conditions/Sickened">sickened</Link>, so that status effect is applied to them. If Chelle had rolled a Two-Pair instead, her enemies would still feel slightly ill as that is the baseline effect of the spell (which has no explicit mechanical effect), but they would not be afflicted with the sickened condition as the required roll was not made.
                </Example> */}
                <p>
                    Some spells mention that they either create or consume &ldquo;juice&rdquo;. You can learn more about this mechanic in the chapter on <Link to="/Rules/HealthAndJuice#JuiceRules">Health & Juice</Link>. Spells which create juice cause you to be juiced if you aren't already, and spells which consume juice can be used only if you have juice. You lose your juice when you cast a spell that consumes juice.
                </p>
            </section>
        </section>

        <section id={CommandLink.hash}>
            <h3>{CommandLink.name}</h3>
            <p>
                If you have minions or are piloting a vehicle, you can use your action to control it. Commanding minions requires 1 hand's worth of actions, and piloting a vehicle requries 2 hand's worth of actions. When you command a minion or pilot a vehicle as an action, you use the roll triggers from that minion or vehicle. More information on minions and vehicles is detailed in the chapter on <Link to="/Rules/MinionsVehicles">minions and vehicles</Link>.
            </p>
        </section>

        <section id={InteractLink.hash}>
            <h3>{InteractLink.name}</h3>
            <p>
                Sometimes you have a mission, like securing a priceless artifact or accessing a network through a terminal. These types of actions involve interacting with an object and are determined by your GM. For example, your GM may rule that shifting a lever on a crane only uses up 1 hand of actions for the round, letting you do something else with your other hand. Hacking into a security system to disable sentry guns is more likely to require 2 hands.
            </p>
        </section>

        <section id={KitswapLink.hash}>
            <h3>{KitswapLink.name}</h3>
            <p>
                Sometimes you need to exchange gear during an action scene. The Kitswap action lets you do so by expending 2 hand's worth of actions and 6 hexes of movement to exchange one mod on an equipped item with another or to stow a weapon into your inventory. To retrieve a weapon from your inventory, you must spend an additional number of hand's worth of actions equal to the weapon's required hands but no movement. Swapping out gear is very costly, especially weapons! This should be a last-ditch effort rather than something to rely on.
            </p>
        </section>

        <section id={ImproviseLink.hash}>
            <h3>{ImproviseLink.name}</h3>
            <p>
                Oftentimes, the rules will not cover everything you could want to do during an action scene. There aren't rules for shooting exploding barrels, using nearby vines to swing out of danger, or any other number of things you can imagine. To support creativity, all of acts are referred to as "Improvised Actions". Performing an improvised action uses both of your hands, so plan wisely!
            </p>
            <p>
                The outcome of an improvised action should involve a discussion between you and the GM. You should describe the type of action you want to perform and what your intended goal is. The GM will have the final decision as to what the outcome of that action is and roughly how successful it will be if you declare different hands. Once you know the outcome, you choose to perform that Improvised Action and roll your dice as though your character level were a skill you were using (see the table below). Based on the hand you end up declaring, the GM determines the outcome of your action and takes note.
            </p>
            <p>
                Some improvised actions may require you to be competent or even require expertise to perform. If your GM determines that an improvised action requires competence, ensure that you have that competence and then 
            </p>
            <GMNote>
                When an improvised action a player wants to use requries a competency they don't have, make sure you let them know which one! It can encourage players to think of how you run different types of competencies and what they competencies and expertises they should consider acquiring.
            </GMNote>
        </section>
    </section>
);
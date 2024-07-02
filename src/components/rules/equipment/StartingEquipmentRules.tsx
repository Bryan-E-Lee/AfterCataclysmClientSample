import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive } from "../../directives/Directives";
import { Link } from "react-router-dom";

export const StartingEquipmentRulesLink = new ArticleNavLink({
    name: "Choose Your Starting Equipment",
    path: "#StartingEquipment",
    render: () => <StartingEquipmentRules />
});

const StartingEquipmentRules = () => (
    <section id={StartingEquipmentRulesLink.hash} key={StartingEquipmentRulesLink.path}>
        <h2>{StartingEquipmentRulesLink.name}</h2>
        <p>
            It's dangerous to travel through the wasteland, so you"ll want to bring along some gear to make your journey easier. Add each of the following items from the <Link to="/Library/Equipment">equipment list</Link> in the order you see below:
        </p>
        <ol>
            <li>
                One <Link to="/Library/Equipment?tags=outfit">outfit</Link> that costs 10 or fewer chips.
            </li>
            <li>
                Up to three <Link to="/Library/Equipment?tags=tool">tools</Link> with a combined cost of 30 or fewer chips.
            </li>
            <li>
                A <Link to="/Library/Equipment?types=Weapon">two-handed weapon</Link> or two <Link to="/Library/Equipment?types=Weapon">one-handed weapons</Link>.
            </li>
            <li>
                Any combination of three <Link to="/Library/Equipment?types=ammo" target="_blank">munitions</Link> and/or <Link to="/Library/Equipment?types=spell" target="_blank">spells</Link>.
            </li>
            <li>
                One <Link to="/Library/Equipment?tags=personal" target="_blank">personal keepsake</Link>.
            </li>
            <li>
                30 chips to keep or exchanged for any equipment you want.
            </li>
        </ol>
        <Directive header="Decking Chelle Out">
            <p>An easy way to gear Chelle out is to select the following equipment:</p>
            <ol>
                <li>
                    A <Link to="/Library/Equipment/Bard%27s+Outfit" target="_blank">Bard's Outfit</Link>to wear.
                </li>
                <li>
                    A <Link to="/Library/Equipment/Torch" target="_blank">torch</Link>, <Link to="/Library/Equipment/Electromancer's+Tools" target="_blank">electromancer's tools</Link>, and a <Link to="/Library/Equipment/Crowbar" target="_blank">crowbar</Link>.
                </li>
                <li>
                    A <Link to="/Library/Equipment/Focus" target="_blank">focus</Link> and a <Link to="/Library/Equipment/Blaster" target="_blank">blaster</Link>.
                </li>
                <li>
                    An <Link to="/Library/Equipment/Amplifier" target="_blank">amplifier</Link>, a <Link to="/Library/Equipment/Medfoam Dispenser" target="_blank">medfoam dispenser</Link>, and <Link to="/Library/Equipment/Laser+Batteries" target="_blank">laser batteries</Link>.
                </li>
                <li>
                    A burnt <Link to="/Library/Equipment/Stuffed+Animal" target="_blank">stuffed elephant</Link> named Zippy, a gift from her parents when she was a child.
                </li>
                <li>
                    She decides to keep all 30 chips.
                </li>
            </ol>
            <p>
                If you decide to use these items, mark down each of these in the <em>Equipment</em> section of your character sheet.
            </p>
        </Directive>
    </section>
);

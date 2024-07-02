import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { Directive } from "../../directives/Directives";
import { Link } from "react-router-dom";

export const StartingEquipmentRulesLink = new ArticleNavLink({
    name: "Choose Your Starting Equipment",
    path: "#StartingEquipment",
    render: () => <StartingEquipmentRules />
});

const StartingEquipmentRules: React.FC = () => (
    <section id={StartingEquipmentRulesLink.hash} key={StartingEquipmentRulesLink.path}>
        <h2>{StartingEquipmentRulesLink.name}</h2>
        <p>
            It's dangerous to travel through the wasteland, so you"ll want to bring along some gear to make your journey easier. Add each of the following items from the <Link to="/Library/Equipment">equipment list</Link> in the order you see below:
        </p>
        <ol>
            <li>
                One <Link to="/Library/Equipment?tags=outfit">outfit</Link> to wear costing 10 or fewer chips.
            </li>
            <li>
                A <Link to="/Library/Equipment/Backpack">backpack</Link> or any other <Link to="/Library/Equipment?tags=container&cheaperThanOrEqual=10">item with the "Container" tag</Link> costing 10 or fewer chips.
            </li>
            <li>
                A <Link to="/Library/Equipment/Torch">torch</Link>, <Link to="/Library/Equipment/Mess+Kit">mess kit</Link>, <Link to="/Library/Equipment/Lighter">lighter</Link>, and <Link to="/Library/Equipment/Rations">rations</Link>.
            </li>
            <li>
                A <Link to="/Library/Equipment?tags=tool">tool</Link> costing 10 or fewer chips.
            </li>
            <li>
                A <Link to="/Library/Equipment?types=Weapon">two-handed weapon / spell focus</Link> or two <Link to="/Library/Equipment?types=Weapon">one-handed weapons / wands</Link>.
            </li>
            <li>
                Two basic <Link to="/Library/Equipment?tags=ammo%2cbasic">munitions</Link>.
            </li>
            <li>
                One or two <Link to="/Library/Equipment?tags=personal">personal keepsakes</Link>.
            </li>
            <li>
                30 chips to keep or exchanged for any equipment you want.
            </li>
        </ol>
        <Directive header="Decking Chelle Out">
            <p>An easy way to gear Chelle out is to select the following equipment:</p>
            <ol>
                <li>
                    A <Link to="/Library/Equipment/Smith%27s+Outfit">Smith's Outfit</Link>to wear.
                </li>
                <li>
                    A <Link to="/Library/Equipment/Backpack">backpack</Link>.
                </li>
                <li>
                    A <Link to="/Library/Equipment/Torch">torch</Link>, <Link to="/Library/Equipment/Mess+Kit">mess kit</Link>, <Link to="/Library/Equipment/Lighter">lighter</Link>, and <Link to="/Library/Equipment/Rations">rations</Link>.
                </li>
                <li>
                    A <Link to="/Library/Equipment/Blaster">blaster</Link> and <Link to="/Library/Equipment/1H+Melee">1h melee</Link>.
                </li>
                <li>
                    <Link to="/Library/Equipment/Capacitor">Capacitors</Link>.
                </li>
                <li>
                    A burnt <Link to="/Library/Equipment/Stuffed+Animal">stuffed elephant</Link> named Zippy, from her childhood, and a <Link to="/Library/Equipment/Necklace">locket</Link> with her parents" names engraved inside.
                </li>
                <li>
                    She decides to keep all 30 chips.
                </li>
            </ol>
            <p>
                Additionally, Chelle's skill is high enough in <Link to="/Library/Skills/Engineering">Engineering</Link> that she also gets to start the game with a <Link to="/Library/Equipment/Monkey+Wrench">monkey wrench</Link> and a <Link to="/Library/Equipment/Tinker%27s+Kit">tinker's kit</Link>. She marks down each of these items in the <em>Equipment</em> section of her character sheet.
            </p>
        </Directive>
    </section>
);

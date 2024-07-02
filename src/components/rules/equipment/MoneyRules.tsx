import React from "react"
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink"
import { GMNote, Variant } from "../../directives/Directives"
import { MoneyIcon } from "../../icons"

export const MoneyRulesLink = new ArticleNavLink({
    name: 'Money & Loot',
    path: '#MoneyLoot',
    render: () => <MoneyRules />
})

const MoneyRules: React.FC = () => (
    <section id={MoneyRulesLink.hash}>
        <h2>{MoneyRulesLink.name}</h2>
        <p>
            In the wasteland, there are hundreds of currencies distributed and minted by different polities, but the most common currency are chips. For simplicity, you don't have to convert from different currencies into chips by default. Your GM may determine that having different currencies is integral to your adventure, in which case they can hand out custom currencies with a determined exchange rate. If your GM decides to use custom currencies, they also decide if a merchant is willing to accept that currency or chips. Throughout this document and the library, you will see chips represented by the symbol below:
        </p>

        <figure className="icon-example">
            <MoneyIcon className="rules-example-icon" />
        </figure>

        <p>
            When selling items, you will typically receive half the item's value in chips, rounded up. If the items are damaged, your GM determines what price the buyer is willing to pay. Additionally, not everyone you find in the wasteland will be willing or able to purchase items from you. The GM should determine whether or not a potential buyer would even consider purchasing an item you want to sell in the first place, or if they can even afford to purchase it. If they cannot afford to purchase that item, they may offer other goods or services in exchange. Likewise, you may be able to fetch an item for a cheaper price if you provide additional goods and services to the seller.
        </p>
        <GMNote>
            Most people in the wasteland aren't fools! They are probably unwilling to sell an item at reduced cost unless the party can ensure their end of the bargain, perhaps with collateral, proof of performing the deed, or some other means. Usually, this  occurs by just having them wait for the players to perform the service before buying or selling the item.
        </GMNote>

        <Variant>
            If you want to better simulate reality, you can assign physical chips a weight of 0.005 kg.
        </Variant>
    </section>
)

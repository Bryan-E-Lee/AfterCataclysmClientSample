import React from "react"
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink"
import { BioIcon, HackIcon } from "../../icons"

export const ControllingVehicleRulesLink = new ArticleNavLink({
    name: "Controlling Vehicles",
    path: "#ControllingVehicles",
    render: () => <ControllingVehicleRules />
})

export const ControllingVehicleRules = () => (
    <section id={ControllingVehicleRulesLink.hash}>
        <h3>{ControllingVehicleRulesLink.name}</h3>
        <p>
            Whoever pilots a vehicle has control of its movement and any other abilities that are used from the cockpit. Piloting a vehicle for a turn requires the use of a hand, and you can use any amount of movement up to the vehicle's movement to transport yourself and any other occupants with the vehicle. Other occupants of the vehicle have normal access to their actions unless some ability on the vehicle specifies otherwise.
        </p>
        <p>
            Characters inside vehicles can be targeted by abilities as normal, though some vehicles will indicate they provide cover to some or all of their occupants. Vehicles can also be the target of any ability that can target objects. Unless otherwise specified, vehicles are immune to <BioIcon /> bio damage but susceptible to <HackIcon /> hacking damage. Just like a character, when a vehicle reaches 0 health, it can no longer move and its abilities can no longer be used.
        </p>
    </section>
)
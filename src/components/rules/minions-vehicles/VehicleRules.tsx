import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { ControllingVehicleRules, ControllingVehicleRulesLink } from "./ControllingVehicles";

export const VehiclesRuleLink = new ArticleNavLink({
    path: "#Vehicles",
    name: "Piloting Vehicles",
    render: () => <VehicleRules />,
    sublinks: [
        ControllingVehicleRulesLink,
    ]
})

const VehicleRules = () => (
    <section id={VehiclesRuleLink.hash}>
        <h2>{VehiclesRuleLink.name}</h2>
        <p>
            Traveling on foot isn't bad, but you can sometimes find a nice ride to travel in style. This chapter will tell you how to pilot vehicles in the wasteland. Vehicles are similar to minions: they have health that scales with your command level, armor, resilience, a movespeed, and more. Unlike minions, though, vehicles need a pilot and can often hold occupants.
        </p>
        <p>
            Each vehicle will indicate different sections that characters can occupy. Each of these sections may provide different abilities that can be used while in the vehicle. To enter a vehicle, a character adjacent to the vehicle uses 2 hands of actions to enter one of its unoccupied slots. To exit a vehicle, a character expends 2 hands worth of actions to enter any hex adjacent to the vehicle.
        </p>
        <ControllingVehicleRules />
    </section>
)
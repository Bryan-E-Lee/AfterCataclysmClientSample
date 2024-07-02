import { createBrowserRouter } from "react-router-dom";
import { AdminApp } from "./AdminApp";
import React from "react";
import configureAdminStore from "./store/configureStore";
import { AdminState } from "./store/stores/AdminState";
import { ItemCreator } from "./library-editor/items/Create";
import { ItemEditor } from "./library-editor/items/Edit";
import { AdminItemsView } from "./library-editor/items/AdminItemsView";
import { AdminWeapons } from "./library-editor/items/weapons";
import { WeaponCreator } from "./library-editor/items/weapons/Create";
import { WeaponEditor } from "./library-editor/items/weapons/Edit";
import { AdminWeaponsView } from "./library-editor/items/weapons/AdminWeaponsView";
import { AdminMods } from "./library-editor/items/mods";
import { ModCreator } from "./library-editor/items/mods/Create";
import { ModEditor } from "./library-editor/items/mods/Edit";
import { AdminModsView } from "./library-editor/items/mods/AdminModsView";
import { AdminAmmunitions } from "./library-editor/items/mods/ammo";
import { AmmoEditor } from "./library-editor/items/mods/ammo/Edit";
import { AmmoCreator } from "./library-editor/items/mods/ammo/Create";
import { AdminAmmunitionsView } from "./library-editor/items/mods/ammo/AdminAdmmunitionsView";
import { AdminSpells } from "./library-editor/items/mods/spells";
import { SpellCreator } from "./library-editor/items/mods/spells/Create";
import { SpellEditor } from "./library-editor/items/mods/spells/Edit";
import { AdminMinions } from "./library-editor/minions";
import { MinionCreator } from "./library-editor/minions/Create";
import { MinionEditor } from "./library-editor/minions/Edit";
import { AdminMinionsView } from "./library-editor/minions/AdminMinionsView";
import { AdminPersonalities } from "./library-editor/personalities";
import { PersonalityCreator } from "./library-editor/personalities/Create";
import { PersonalityEditor } from "./library-editor/personalities/Edit";
import { AdminPersonalitiesView } from "./library-editor/personalities/AdminPersonalitiesView";
import { AdminPerks } from "./library-editor/perks";
import { PerkCreator } from "./library-editor/perks/Create";
import { PerkEditor } from "./library-editor/perks/Edit";
import { AdminPerksView } from "./library-editor/perks/AdminPerksView";
import { AdminSkills } from "./library-editor/skills";
import { SkillEditor } from "./library-editor/skills/Edit";
import { AdminSkillsView } from "./library-editor/skills/AdminSkillsView";
import { AdminRhetorics } from "./library-editor/rhetorics";
import { RhetoricEditor } from "./library-editor/rhetorics/Edit";
import { AdminRhetoricsView } from "./library-editor/rhetorics/AdminRhetoricsView";
import { AdminConditions } from "./library-editor/conditions";
import { ConditionCreator } from "./library-editor/conditions/ConditionCreator";
import { ConditionEditor } from "./library-editor/conditions/ConditionEditor";
import { AdminConditionsView } from "./library-editor/conditions/AdminConditionsView";
import { AdminCompetencies } from "./library-editor/competencies";
import { CompetencyCreator } from "./library-editor/competencies/CompetencyCreator";
import { CompetencyEditor } from "./library-editor/competencies/CompetencyEditor";
import { AdminCompetenciesView } from "./library-editor/competencies/AdminCompetenciesView";
import { AdminHazards } from "./library-editor/hazards";
import { HazardCreator } from "./library-editor/hazards/Create";
import { HazardEditor } from "./library-editor/hazards/Edit";
import { AdminHazardsView } from "./library-editor/hazards/AdminHazardsView";
import { AdminBooks } from "./library-editor/books";
import { BookCreator } from "./library-editor/books/BookCreator";
import { BookEditor } from "./library-editor/books/BookEditor";
import { AdminBooksView } from "./library-editor/books/AdminBooksView";
import { AdminEnemies } from "./library-editor/enemies";
import { EnemyCreator } from "./library-editor/enemies/EnemyCreator";
import { EnemyEditor } from "./library-editor/enemies/EnemyEditor";
import { AdminEnemiesView } from "./library-editor/enemies/AdminEnemiesView";
import { ScenarioCreator } from "./library-editor/scenarios/Create";
import { ScenarioEditor } from "./library-editor/scenarios/Edit";
import { AdminScenarios } from "./library-editor/scenarios";
import { AdminScenariosView } from "./library-editor/scenarios/AdminScenariosView";
import { AdminEnemyActiveAbilities } from "./library-editor/enemy-abilities/EnemyActiveAbilities";
import { EnemyActiveAbilityCreator } from "./library-editor/enemy-abilities/EnemyActiveAbilityCreator";
import { EnemyActiveAbilityEditor } from "./library-editor/enemy-abilities/EnemyActiveAbilityEditor";
import { AdminEnemyActiveAbilitiesView } from "./library-editor/enemy-abilities/AdminEnemyActiveAbilitiesView";
import { AdminEnemyReactiveAbilities } from "./library-editor/enemy-abilities/EnemyReactiveAbilities";
import { EnemyReactiveAbilityCreator } from "./library-editor/enemy-abilities/EnemyReactiveAbilityCreator";
import { EnemyReactiveAbilityEditor } from "./library-editor/enemy-abilities/EnemyReactiveAbilityEditor";
import { AdminEnemyReactiveAbilitiesView } from "./library-editor/enemy-abilities/AdminEnemyReactiveAbilitiesView";
import { AdminEnemyPassiveAbilities } from "./library-editor/enemy-abilities/EnemyPassiveAbilities";
import { EnemyPassiveAbilityCreator } from "./library-editor/enemy-abilities/EnemyPassiveAbilityCreator";
import { EnemyPassiveAbilityEditor } from "./library-editor/enemy-abilities/EnemyPassiveAbilityEditor";
import { AdminEnemyPassiveAbilitiesView } from "./library-editor/enemy-abilities/AdminEnemyPassiveAbilitiesView";
import { AdminSpellsView } from "./library-editor/items/mods/spells/AdminSpellsView";
import { AdminVehicles } from "./library-editor/vehicles";
import { CreateVehicle } from "./library-editor/vehicles/Create";
import { EditVehicle } from "./library-editor/vehicles/Edit";
import { AdminVehiclesView } from "./library-editor/vehicles/AdminVehiclesView";
import { AdminLibraryActions } from "./store/stores/library/AdminLibraryStore.Actions";

export const AdminRouter = createBrowserRouter([
    {
        path: "/*",
        element: <AdminApp />,
        loader: () => configureAdminStore({} as AdminState),
        children: [
            {
                path: "Items/*",
                children: [
                    {
                        path: "Create",
                        element: <ItemCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <ItemEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminItemsView />,
                    },
                ]
            },
            {
                path: "Weapons/*",
                element: <AdminWeapons />,
                children: [
                    {
                        path: "Create",
                        element: <WeaponCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <WeaponEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminWeaponsView />,
                    },
                ]
            },
            {
                path: "Mods/*",
                element: <AdminMods />,
                children: [
                    {
                        path: "Create",
                        element: <ModCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <ModEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminModsView />,
                    },
                ]
            },
            {
                path: "Ammo/*",
                element: <AdminAmmunitions />,
                children: [
                    {
                        path: "Create",
                        element: <AmmoCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <AmmoEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminAmmunitionsView />,
                    },
                ]
            },
            {
                path: "Spells/*",
                element: <AdminSpells />,
                children: [
                    {
                        path: "Create",
                        element: <SpellCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <SpellEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminSpellsView />,
                    }
                ]
            },
            {
                path: "Minions/*",
                element: <AdminMinions />,
                children: [
                    {
                        path: "Create",
                        element: <MinionCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <MinionEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminMinionsView />,
                    },
                ]
            },
            {
                path: "Vehicles/*",
                element: <AdminVehicles />,
                children: [
                    {
                        path: "Create",
                        element: <CreateVehicle />,
                    },
                    {
                        path: ":id/Edit",
                        element: <EditVehicle />,
                    },
                    {
                        path: "*",
                        element: <AdminVehiclesView />,
                    }
                ]
            },
            {
                path: "Personalities/*",
                element: <AdminPersonalities />,
                children: [
                    {
                        path: "Create",
                        element: <PersonalityCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <PersonalityEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminPersonalitiesView />,
                    },
                ]
            },
            {
                path: "Perks/*",
                element: <AdminPerks />,
                children: [
                    {
                        path: "Create",
                        element: <PerkCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <PerkEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminPerksView />,
                    }
                ]
            },
            {
                path: "Skills/*",
                element: <AdminSkills />,
                children: [
                    {
                        path: ":id/Edit",
                        element: <SkillEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminSkillsView />,
                    }
                ]
            },
            {
                path: "Rhetorics/*",
                element: <AdminRhetorics />,
                children: [
                    {
                        path: ":id/Edit",
                        element: <RhetoricEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminRhetoricsView />,
                    }
                ]
            },
            {
                path: "Conditions/*",
                element: <AdminConditions />,
                children: [
                    {
                        path: "Create",
                        element: <ConditionCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <ConditionEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminConditionsView />,
                    },
                ]
            },
            {
                path: "Competencies/*",
                element: <AdminCompetencies />,
                children: [
                    {
                        path: "Create",
                        element: <CompetencyCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <CompetencyEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminCompetenciesView />,
                    }
                ]
            },
            {
                path: "Hazards/*",
                element: <AdminHazards />,
                children: [
                    {
                        path: "Create",
                        element: <HazardCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <HazardEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminHazardsView />,
                    }
                ]
            },
            {
                path: "Books/*",
                element: <AdminBooks />,
                children: [
                    {
                        path: "Create",
                        element: <BookCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <BookEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminBooksView />,
                    }
                ]
            },
            {
                path: "Enemies/*",
                element: <AdminEnemies />,
                children: [
                    {
                        path: "Create",
                        element: <EnemyCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <EnemyEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminEnemiesView />
                    }
                ]
            },
            {
                path: "Scenarios/*",
                element: <AdminScenarios />,
                children: [
                    {
                        path: "Create",
                        element: <ScenarioCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <ScenarioEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminScenariosView />,
                    }
                ]
            },
            {
                path: "EnemyActiveAbilities/*",
                element: <AdminEnemyActiveAbilities />,
                children: [
                    {
                        path: "Create",
                        element: <EnemyActiveAbilityCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <EnemyActiveAbilityEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminEnemyActiveAbilitiesView />,
                    }
                ]
            },
            {
                path: "EnemyReactiveAbilities/*",
                element: <AdminEnemyReactiveAbilities />,
                children: [
                    {
                        path: "Create",
                        element: <EnemyReactiveAbilityCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <EnemyReactiveAbilityEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminEnemyReactiveAbilitiesView />
                    }
                ]
            },
            {
                path: "EnemyPassiveAbilities/*",
                element: <AdminEnemyPassiveAbilities />,
                children: [
                    {
                        path: "Create",
                        element: <EnemyPassiveAbilityCreator />,
                    },
                    {
                        path: ":id/Edit",
                        element: <EnemyPassiveAbilityEditor />,
                    },
                    {
                        path: "*",
                        element: <AdminEnemyPassiveAbilitiesView />,
                    }
                ]
            }
        ]
    }
])
import './library.scss';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AdminWeapons } from './items/weapons';
import { AdminPerks } from './perks';
import { AdminPersonalities } from './personalities';
import { AdminSkills } from './skills';
import { AdminItems } from './items';
import { AdminAmmunitions } from './items/mods/ammo';
import { AdminSpells } from './items/mods/spells';
import { AdminMods } from './items/mods';
import { ArticleNavLink } from '../../components/articles/navigation/article-navigation/ArticleNavLink';
import { AdminMinions } from './minions';
import { AdminLibraryActions } from '../store/stores/library/AdminLibraryStore.Actions';
import { useEffect } from 'react';
import { AdminConditions } from './conditions';
import { AdminCompetencies } from './competencies';
import { AdminRhetorics } from './rhetorics';
import { AdminHazards } from './hazards';
import { AdminEnemies } from './enemies';
import { AdminEnemyActiveAbilities } from './enemy-abilities/EnemyActiveAbilities';
import { AdminEnemyReactiveAbilities } from './enemy-abilities/EnemyReactiveAbilities';
import { AdminEnemyPassiveAbilities } from './enemy-abilities/EnemyPassiveAbilities';
import { AdminBooks } from './books';
import { AdminScenarios } from './scenarios';
import { Route, Routes, useLocation } from 'react-router';
import { Link } from "react-router-dom";
import { AdminVehicles } from './vehicles';

const routes = [
    new ArticleNavLink({
        path: 'Items',
        name: 'Items',
        render: () => <AdminItems />,
    }),
    new ArticleNavLink({
        path: 'Weapons',
        name: 'Weapons',
        render: () => <AdminWeapons />,
    }),
    new ArticleNavLink({
        path: 'Mods',
        name: 'Mods',
        render: () => <AdminMods />
    }),
    new ArticleNavLink({
        path: 'Ammo',
        name: 'Ammo',
        render: () => <AdminAmmunitions />
    }),
    new ArticleNavLink({
        path: 'Spells',
        name: 'Spells',
        render: () => <AdminSpells />
    }),
    new ArticleNavLink({
        path: 'Minions',
        name: 'Minions',
        render: () => <AdminMinions />
    }),
    new ArticleNavLink({
        path: 'Vehicles',
        name: 'Vehicles',
        render: () => <AdminVehicles />
    }),
    new ArticleNavLink({
        path: 'Personalities',
        name: 'Personalities',
        render: () => <AdminPersonalities />
    }),
    new ArticleNavLink({
        path: 'Perks',
        name: 'Perks',
        render: () => <AdminPerks />
    }),
    new ArticleNavLink({
        path: 'Skills',
        name: 'Skills',
        render: () => <AdminSkills />
    }),
    new ArticleNavLink({
        path: 'Rhetorics',
        name: 'Rhetorics',
        render: () => <AdminRhetorics />
    }),
    new ArticleNavLink({
        path: 'Conditions',
        name: 'Conditions',
        render: () => <AdminConditions />
    }),
    new ArticleNavLink({
        path: 'Competencies',
        name: 'Competencies',
        render: () => <AdminCompetencies />
    }),
    new ArticleNavLink({
        path: 'Hazards',
        name: 'Hazards',
        render: () => <AdminHazards />
    }),
    new ArticleNavLink({
        path: 'Books',
        name: 'Books',
        render: () => <AdminBooks />
    }),
    new ArticleNavLink({
        path: 'Enemies',
        name: 'Enemies',
        render: () => <AdminEnemies />
    }),
    new ArticleNavLink({
        path: 'Scenarios',
        name: 'Scenarios',
        render: () => <AdminScenarios />
    }),
    new ArticleNavLink({
        path: 'EnemyActiveAbilities',
        name: 'Enemy Active Abilities',
        render: () => <AdminEnemyActiveAbilities />
    }),
    new ArticleNavLink({
        path: 'EnemyReactiveAbilities',
        name: 'Enemy Reactive Abilities',
        render: () => <AdminEnemyReactiveAbilities />
    }),
    new ArticleNavLink({
        path: 'EnemyPassiveAbilities',
        name: 'Enemy Passive Abilities',
        render: () => <AdminEnemyPassiveAbilities />
    })
];

export const AdminLibrary : React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AdminLibraryActions.loadItems());
        dispatch(AdminLibraryActions.loadBooks());
        dispatch(AdminLibraryActions.loadCompetencies());
        dispatch(AdminLibraryActions.loadEnemies());
        dispatch(AdminLibraryActions.loadEnemyActiveAbilities());
        dispatch(AdminLibraryActions.loadEnemyReactiveAbilities());
        dispatch(AdminLibraryActions.loadEnemyPassiveAbilities());
        dispatch(AdminLibraryActions.loadHazards());
        dispatch(AdminLibraryActions.loadMinions());
        dispatch(AdminLibraryActions.loadPerks());
        dispatch(AdminLibraryActions.loadPersonalities());
        dispatch(AdminLibraryActions.loadRhetorics());
        dispatch(AdminLibraryActions.loadScenarios());
        dispatch(AdminLibraryActions.loadSkills());
        dispatch(AdminLibraryActions.loadVehicles());
        dispatch(AdminLibraryActions.loadTags());
    }, [dispatch]);

    return (
        <main>
            <div className="contents">
                <article className="library">
                    <Routes>
                        {routes.map((route, index) => {
                            if (route.render != null) {
                                return <Route key={route.path} path={`${route.path}/*`} element={route.render(index)} />;
                            }
                        })}
                        <Route path="*" element={<AdminRouteLinks />} />
                    </Routes>
                </article>
            </div>
        </main>
    );
}

export const AdminRouteLinks = () => (
    <>
    {routes.map((control) => (
    <Link key={control.path} className="library-link" to={control.path}>
        {control.name}
    </Link>))}
</>);
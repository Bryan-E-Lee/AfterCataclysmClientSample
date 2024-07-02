import React, { useEffect, useState } from "react"
import { EnemyFilter } from "../../../entities/filters/EnemyFilter";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";

export const EnemyResults = () => {
    const dispatch = useDispatch();
    const { enemies, allEnemiesLoaded } = useSelector((state: ApplicationState) => state.library);

    useEffect(() => {
        if (!allEnemiesLoaded) {
            dispatch(LibraryActions.loadEnemies());
        }
    }, [dispatch, allEnemiesLoaded]);

    
    const defaultState = new EnemyFilter(EnemyFilter.GetDefaultInitializer());
    const [filter, setFilter] = useState(defaultState);
    const filteredEnemies = filter.filter(enemies);
    return (
        <section className="search-results">
            <table className="themed-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Tags</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEnemies.map(enemy => (
                        <tr>
                            <td>{enemy.name}</td>
                            <td>{enemy.level}</td>
                            <td>{enemy.tags.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
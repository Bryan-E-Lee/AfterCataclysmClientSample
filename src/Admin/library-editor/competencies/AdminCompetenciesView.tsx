import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AllCompetencyCategories, CompetencyCategoryNames } from "../../../entities/characters/Competencies";
import { AdminState } from "../../store/stores/AdminState";
import { AdminLibraryActions } from "../../store/stores/library/AdminLibraryStore.Actions";

export const AdminCompetenciesView = () => {
    const {competencies} = useSelector((app: AdminState) => app.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!competencies.any()) {
            dispatch(AdminLibraryActions.loadCompetencies());
        }
    }, [dispatch, competencies]);

    const competencyCategoryCounts = AllCompetencyCategories.map(ct => ({
        category: ct,
        count: competencies.count(c => c.category == ct)
    }));
    return (
        <>
            <Link to='Create'>
                <ThemedButton disabled={false}>
                    Create New
                </ThemedButton>
            </Link>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Competencies</th>
                    </tr>
                </thead>
                <tbody>
                    {competencies.map(competency => (
                        <tr key={competency.id}>
                            <td>{competency.name}</td>
                            <td>{CompetencyCategoryNames[competency.category]}</td>
                            <td>
                                <Link to={`${competency.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                            <td>
                                <ThemedButton onClick={() => confirm(`Are you sure you want to delete ${competency.name}?`) && dispatch(AdminLibraryActions.deleteCompetency(competency))}>
                                    Delete
                                </ThemedButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className="themed-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {competencyCategoryCounts.map(ctc => (
                        <tr key={ctc.category}>
                            <td>{CompetencyCategoryNames[ctc.category]}</td>
                            <td>{ctc.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
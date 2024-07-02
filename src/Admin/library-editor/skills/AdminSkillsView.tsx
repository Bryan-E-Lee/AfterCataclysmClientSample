import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/inputs/buttons/ThemedButton";
import { AdminState } from "../../store/stores/AdminState";

export const AdminSkillsView = () => {
    const skills = useSelector((app: AdminState) => app.library.skills);
    return (
        <>
            <table className="themed-table">
                <thead>
                    <tr>
                        <th colSpan={10000}>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map(skill => (
                        <tr key={skill.id}>
                            <td>{skill.name}</td>
                            <td>
                                <Link to={`${skill.id}/Edit`}>
                                    <ThemedButton disabled={false}>Edit</ThemedButton>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
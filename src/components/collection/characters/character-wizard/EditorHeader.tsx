import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router";

export const EditorHeader: React.FC = () => {
    const params = useParams();
    const id = params['id'];
    const sheetRoute = `/Characters/${id}`;
    const baseRoute = `${sheetRoute}/Edit`;
    return (
        <header>
            <h1>
                Character Editor
                <Link to={sheetRoute}>Sheet</Link>
            </h1>
            <nav>
                <NavLink to={`${baseRoute}`} exact>
                    Background
                </NavLink>
                <NavLink to={`${baseRoute}/Personality`}>
                    Personality
                </NavLink>
                <NavLink to={`${baseRoute}/Skills`}>
                    Skills
                </NavLink>
                <NavLink to={`${baseRoute}/Competencies`}>
                    Competencies
                </NavLink>
                <NavLink to={`${baseRoute}/BodyMod`}>
                    Body Mod
                </NavLink>
                <NavLink to={`${baseRoute}/Equipment`}>
                    Equipment
                </NavLink>
                <NavLink to={`${baseRoute}/WrappingUp`}>
                    Wrapping Up
                </NavLink>
            </nav>
        </header>
    );
}
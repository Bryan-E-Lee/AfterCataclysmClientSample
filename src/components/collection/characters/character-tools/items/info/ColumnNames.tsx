import React from "react";
import { DefaultIcon, DeleteIcon, EditIcon, MoveIcon } from "../../../../../icons";

export const ColumnNames: React.FC = () => (
    <div className="column-names">
        <div className="icon"><MoveIcon /></div>
        <div className="icon"><DefaultIcon /></div>
        <div className="name">Name</div>
        <div className="cost">Cost</div>
        <div className="weight">Weight</div>
        <div className="tags">Tags</div>
        <div className="icon"><DeleteIcon /></div>
    </div>
)
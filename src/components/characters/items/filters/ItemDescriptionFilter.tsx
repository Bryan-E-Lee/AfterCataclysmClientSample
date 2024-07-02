import React from "react";

type Props = {
    description: string;
    onChange: (description: string) => unknown;
}

export const ItemDescriptionFilter = (props: Props) => {
    const { description, onChange } = props;
    return (
        <div className="filter-group">
            <div className="filter">
                <label htmlFor="description">Description</label>
                <input type="text"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e.target.value)} />
            </div>
        </div>
    )
}
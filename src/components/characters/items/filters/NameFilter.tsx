import React from "react";

type Props = {
    name: string;
    onChange: (name: string) => unknown;
}

export const NameFilter = (props: Props) => {
    const { name, onChange } = props;
    return (
        <div className="filter-group">
            <div className="filter">
                <label htmlFor="name">Name</label>
                <input type="text"
                    name="name"
                    value={name}
                    onChange={(e) => onChange(e.target.value)} />
            </div>
        </div>
    )
}
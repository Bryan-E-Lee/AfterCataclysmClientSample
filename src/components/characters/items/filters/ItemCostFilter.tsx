import React from "react";

type Props = {
    minCost: number;
    maxCost: number;
    onChange: (minCost: number, maxCost: number) => unknown;
}

export const ItemCostFilter = (props: Props) => {
    const { minCost, maxCost, onChange } = props;
    return (
        <div className="filter-group">
            <div className="filter half">
                <label htmlFor="cost-min">Min Cost</label>
                <input type="number"
                    name="cost-min"
                    value={minCost}
                    min={0}
                    onChange={(e) => onChange(parseInt(e.target.value), maxCost)} />
            </div>
            <div className="filter half">
                <label htmlFor="cost-max">Max Cost</label>
                <input type="number"
                    name="cost-max"
                    value={maxCost}
                    min={minCost}
                    onChange={(e) => onChange(minCost, parseInt(e.target.value))} />
            </div>
        </div>
    )
}
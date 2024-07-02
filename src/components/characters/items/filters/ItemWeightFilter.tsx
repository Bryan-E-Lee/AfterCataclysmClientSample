import React from "react";

type Props = {
    minWeight: number;
    maxWeight: number;
    onChange: (minWeight: number, maxWeight: number) => unknown;
}

export const ItemWeightFilters = (props: Props) => {
    const { minWeight, maxWeight, onChange } = props;
    return (
        <div className="filter-group">
            <div className="filter half">
                <label htmlFor="min-weight">Min Wt.</label>
                <input type="number"
                    name="min-weight"
                    value={minWeight}
                    min={0}
                    onChange={(e) => onChange(parseFloat(e.target.value), maxWeight)} />
            </div>
            <div className="filter half">
                <label htmlFor="max-weight">Max Wt.</label>
                <input type="number"
                    name="max-weight"
                    value={maxWeight}
                    min={minWeight}
                    onChange={(e) => onChange(minWeight, parseFloat(e.target.value))} />
            </div>
        </div>
    );
}
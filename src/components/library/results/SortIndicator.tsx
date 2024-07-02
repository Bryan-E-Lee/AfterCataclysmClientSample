import './sort-indicator.scss';
import React from 'react';

type SortDirection = 'Ascending' | 'Descending';

type Props = {
    active: boolean;
    sortDirection: SortDirection;
};

export const SortIndicator: React.FC<Props> = (props: Props) => {
    const activeClass = props.active ? 'active' : 'inactive';
    let ascendingClass: string;
    let descendingClass: string;
    if (props.sortDirection == 'Ascending') {
        ascendingClass = 'active';
        descendingClass = 'inactive';
    } else {
        ascendingClass = 'inactive';
        descendingClass = 'active';
    }
    return (
        <span className={`sort-indicator ${activeClass}`}>
            <i className={`fas fa-caret-up ${ascendingClass}`}></i>
            <i className={`fas fa-caret-down ${descendingClass}`}></i>
        </span>
    );
};

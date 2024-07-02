import React from "react";
import { ListIcon, GridIcon, VerticalIcon, HorizontalIcon } from "../../icons";

export const RulesFiguresConfig = {
    minLevel: 1,
    maxLevel: 10,
    headerSpan: 1000000,
}

export type RulesFigureViewStyle = 'List View' | 'Table View';
export type RulesFigureViewStyleOption = {
    name: RulesFigureViewStyle;
    display: React.ReactNode;
}
export const RulesFigureViewStyleOptions: RulesFigureViewStyleOption[] = [
    { name: 'Table View', display: <GridIcon /> },
    { name: 'List View', display: <ListIcon /> },
]

export type RulesTableViewStyle = 'Horizontal View' | 'Vertical View';
export type RulesTableViewStyleOption = {
    name: RulesTableViewStyle,
    display: React.ReactNode;
}
export const RulesTableViewStyleOptions: RulesTableViewStyleOption[] = [
    { name: "Horizontal View", display: <HorizontalIcon /> },
    { name: "Vertical View", display: <VerticalIcon /> }
]
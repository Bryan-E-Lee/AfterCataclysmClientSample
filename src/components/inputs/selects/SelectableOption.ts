import React from "react";

export type OptionType = number | string | null;

export interface SelectableOption<T extends OptionType> {
    value: T;
    name?: React.ReactNode;
    disabled?: boolean;
}
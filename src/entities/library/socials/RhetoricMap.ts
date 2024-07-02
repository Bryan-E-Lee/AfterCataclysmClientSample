import { Rhetoric } from "./Rhetoric";

export const RhetoricMap = {
    'Charisma': Rhetoric,
    'Empathy': Rhetoric,
    'Reason': Rhetoric
}

export type RhetoricName = keyof typeof RhetoricMap;

export const RheotricNames = Object.keys(RhetoricMap);
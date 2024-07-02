import { ENTERED, ENTERING, EXITED, UNMOUNTED } from "react-transition-group/Transition";

/**
 * Maps react-transition-group states into classes.
 * Currently they map exactly, this object merely exists
 * to decouple our classes from theirs.
 */
export const TransitionCssClassMappings = {
    [UNMOUNTED]: 'unmounted',
    [EXITED]: 'exited',
    [ENTERING]: 'entering',
    [ENTERED]: 'entered',
    [EXITED]: 'exited'
}
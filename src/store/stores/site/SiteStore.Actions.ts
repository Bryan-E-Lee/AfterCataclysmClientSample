import { AppThunkAction } from "../ApplicationState"

export type SiteSetLoading = { type: 'SITE_SET_LOADING', loading: boolean }

export type SiteAction = SiteSetLoading;

export const SiteActions = {
    setLoading: (loading: boolean): AppThunkAction<SiteSetLoading> =>
        (dispatch, getState) => {
            dispatch({ type: 'SITE_SET_LOADING', loading });
        }
}
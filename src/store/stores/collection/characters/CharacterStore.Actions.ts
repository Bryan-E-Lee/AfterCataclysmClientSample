import { CharacterInitializer, CollectionsToReferences } from "../../../../entities/characters/Character";
import { ErrorToast } from "../../../../entities/toasts/Toasts";
import { CharacterEntityInitializers } from "../../../../services/CharacterService";
import { AppThunkAction } from "../../ApplicationState";
import { LibraryAction } from "../../library/LibraryStore.Actions";
import { ToastAction, ToastDispatchables } from "../../toasts/Toasts.Actions";

type CharactersLoaded = { type: 'CHARACTERS_LOADED', characters: CharacterInitializer[] }
type CharactersUnownedLoaded = { type: 'CHARACTERS_UNOWNED_LOADED', characters: CharacterInitializer[] }
type CharacterAddNew = { type: 'CHARACTER_ADD_NEW', character: CharacterInitializer }
type CharacterDeleting = { type: 'CHARACTER_DELETING', id: string, undo?: boolean }
type CharacterDeleted = { type: 'CHARACTER_DELETED', id: string }
export type CharacterUpdated = { type: 'CHARACTER_UPDATED', character: CharacterInitializer }

export type CharacterAction = CharactersLoaded
    | CharactersUnownedLoaded
    | CharacterAddNew
    | CharacterUpdated
    | CharacterDeleting
    | CharacterDeleted;

export const CharacterActions = {
    createNewCharacter: (successCallback: (id: string) => unknown): AppThunkAction<CharacterAddNew | ToastAction> =>
        async (dispatch, getState) => {
            const { api } = getState();
            try {
                const response = await api.characters.createNewCharacter();
                if(response.status == 'Success') {
                    dispatch({ type: 'CHARACTER_ADD_NEW', character: response.payload });
                    successCallback(response.payload.id);
                }
            }
            catch (error) {
                console.error(error);
                ToastDispatchables.toast(new ErrorToast("Server error while creating character."), dispatch);
            }
        },
        
    getCharacters: (forceReload: boolean = false): AppThunkAction<CharactersLoaded | LibraryAction | ToastAction> => 
        async (dispatch, getState) => {
            const { api, character, library } = getState();
            if(!forceReload && character.characters.length > 0) {
                return;
            }
            try {
                const response = await api.characterService.getAllCharactersWithEntities(CollectionsToReferences(library));
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    return;
                }

                dispatchLibraryActions(response.payload, dispatch);
                dispatch({ type: 'CHARACTERS_LOADED', characters: response.payload.characters });
            }
            catch (error) {
                console.error(error);
                ToastDispatchables.toast(new ErrorToast("Server error while loading characters."), dispatch);
            }
        },

    getCharactersByIds: (ids: string[]): AppThunkAction<CharactersUnownedLoaded | LibraryAction | ToastAction> =>
        async (dispatch, getState) => {
            const { api, library } = getState();
            try {
                const response = await api.characterService.getCharactersByIdsWithEntities(CollectionsToReferences(library), ids);
                if (response.status == 'Error') {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                    return;
                }
                dispatchLibraryActions(response.payload, dispatch);
                dispatch({ type: 'CHARACTERS_UNOWNED_LOADED', characters: response.payload.characters });
            }
            catch (error) {
                console.error(error);
                ToastDispatchables.toast(new ErrorToast("Server error while loading characters."), dispatch);
            }
        },

    deleteCharacter: (character: CharacterInitializer): AppThunkAction<CharacterDeleted | CharacterDeleting | ToastAction> =>
        async (dispatch, getState) => {
            const { api } = getState();
            try {
                dispatch({ type: 'CHARACTER_DELETING', id: character.id });
                const response = await api.characters.deleteCharacter(character.id);
                if (response.status == "Error") {
                    ToastDispatchables.toastValidationResults(response.validationResults, dispatch);
                }
                else {
                    dispatch({ type: 'CHARACTER_DELETED', id: character.id });
                }
            }
            catch (error) {
                console.error(error);
                dispatch({ type: 'CHARACTER_DELETING', id: character.id, undo: true });
                ToastDispatchables.toast(new ErrorToast(`Server error while deleting ${character.name}.`), dispatch);
            }
        }
}

const dispatchLibraryActions = (entityInitializers: CharacterEntityInitializers, dispatch: (action: LibraryAction) => void) => {
    if (entityInitializers.conditions.any()) {
        dispatch({ type: 'LIBRARY_CONDITIONS_LOADED', conditions: entityInitializers.conditions });
    }
    if (entityInitializers.items.any()) {
        dispatch({ type: 'LIBRARY_ITEMS_LOADED', items: entityInitializers.items });
    }
    if (entityInitializers.perks.any()) {
        dispatch({ type: 'LIBRARY_PERKS_LOADED', perks: entityInitializers.perks });
    }
    if (entityInitializers.personalities.any()) {
        dispatch({ type: 'LIBRARY_PERSONALITIES_LOADED', personalities: entityInitializers.personalities });
    }
    if (entityInitializers.rhetorics.any()) {
        dispatch({ type: 'LIBRARY_RHETORICS_LOADED', rhetorics: entityInitializers.rhetorics });
    }
    if (entityInitializers.skills.any()) {
        dispatch({ type: 'LIBRARY_SKILLS_LOADED', skills: entityInitializers.skills });
    }
}
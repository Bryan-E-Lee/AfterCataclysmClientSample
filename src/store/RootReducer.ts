import { combineReducers } from 'redux';
import { ApiReducer } from './stores/api/ApiStore.Reducer';
import { AdventureReducer } from './stores/adventures/AdventureStore.Reducer';
import { SheetReducer } from './stores/characters/sheet/reducers/Sheet.Reducer';
import { CharacterReducer } from './stores/collection/characters/CharacterStore.Reducer';
import { TooltipReducer } from './stores/details/TooltipStore.Reducer';
import { LibraryReducer } from './stores/library/LibraryStore.Reducer';
import { ToastReducer } from './stores/toasts/Toasts.Reducer';
import { UserReducer } from './stores/users/UserStore.Reducer';
import { BookReducer } from './stores/books/BookStore.Reducer';
import { SiteReducer } from './stores/site/SiteStore.Reducer';

export const createRootReducer = () => combineReducers({
    adventure: AdventureReducer,
    api: ApiReducer,
    book: BookReducer,
    character: CharacterReducer,
    library: LibraryReducer,
    sheet: SheetReducer,
    site: SiteReducer,
    toast: ToastReducer,
    tooltip: TooltipReducer,
    user: UserReducer
});

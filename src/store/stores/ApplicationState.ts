import { ApiState } from './api/ApiStore.State';
import { BookState } from './books/BookStore.State';
import { AdventureState } from './adventures/AdventureStore.State';
import { SheetState } from './characters/sheet/Sheet.State';
import { CharacterState } from './collection/characters/CharacterStore.State';
import { TooltipState } from './details/TooltipStore.State';
import { LibraryState } from './library/LibraryStore.State';
import { ToastState } from './toasts/Toasts.State';
import { UserState } from './users/UserStore.State';
import { SiteState } from './site/SiteStore.State';

export interface ApplicationState {
    adventure: AdventureState;
    api: ApiState;
    book: BookState;
    character: CharacterState;
    library: LibraryState;
    sheet: SheetState;
    site: SiteState;
    toast: ToastState;
    tooltip: TooltipState;
    user: UserState;
}

export type ActionType<T extends { type: string }> = Pick<T, 'type'>;

export interface AppThunkAction<TAction> {
    (
        dispatch: (action: TAction) => void,
        getState: () => ApplicationState
    ): void;
}

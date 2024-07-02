import { AdventureHub } from "../../../apis/account/Hub.Adventure";

export type ApiSetAdventureHub = { type: 'API_SET_HUB_ADVENTURE', hub: AdventureHub };
export type ApiAction = ApiSetAdventureHub;
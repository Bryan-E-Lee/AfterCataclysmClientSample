import { ApiConfig } from "../../../../apis/config/ApiConfig";
import { StandardActions } from "../../../../apis/config/StandardActions";
import { LibraryApiConfig } from "./LibraryApiConfig";

export const ConditionApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Condition',
    actions: { ...StandardActions }
});
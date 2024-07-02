import { ApiConfig } from "../../../../apis/config/ApiConfig";
import { StandardActions } from "../../../../apis/config/StandardActions";
import { LibraryApiConfig } from "./LibraryApiConfig";

export const CompetencyApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Competency',
    actions: { ...StandardActions }
});
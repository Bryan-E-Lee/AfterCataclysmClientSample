import { ApiConfig } from '../../../../apis/config/ApiConfig';
import { StandardActions } from '../../../../apis/config/StandardActions';
import { LibraryApiConfig } from './LibraryApiConfig';

export const PersonalitiesApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Personality',
    actions: { ...StandardActions }
});

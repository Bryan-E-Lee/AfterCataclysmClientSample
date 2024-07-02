import { ApiConfig } from '../../../../apis/config/ApiConfig';
import { StandardActions } from '../../../../apis/config/StandardActions';
import { LibraryApiConfig } from './LibraryApiConfig';

export const PerksApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Perk',
    actions: { ...StandardActions },
});
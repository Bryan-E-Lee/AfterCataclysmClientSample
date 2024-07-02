import { ApiConfig } from '../../../../apis/config/ApiConfig';
import { StandardActions } from '../../../../apis/config/StandardActions';
import { LibraryApiConfig } from './LibraryApiConfig';

export const SkillsApiConfig = new ApiConfig({
    ...LibraryApiConfig,
    apiPath: '/api/v1.0/Skill',
    actions: { ...StandardActions },
});

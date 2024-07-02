import { AccountApiConfig } from '../../../apis/account/config/AccountApiConfig';
import { BaseApi } from '../../../apis/Api.Base';

export abstract class AccountApi<TConfig> extends BaseApi<TConfig> {
    protected get audience(): string {
        return AccountApiConfig.audience;
    }
}

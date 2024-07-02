type RestMethod = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';

interface Action {
    route: string;
    method: RestMethod;
}

export type ApiConfigActions = { [key: string]: Action };

interface ApiConfigInitializer<TActions extends ApiConfigActions> {
    uri: string;
    apiPath: string;
    actions: TActions
}

interface RouteParam {
    name: string;
    value: string | number | boolean;
}

interface UriWithMethod {
    uri: string;
    method: RestMethod;
}

export class ApiConfig<TActions extends ApiConfigActions> {
    public constructor(initializer: ApiConfigInitializer<TActions>) {
        this.uri = initializer.uri;
        this.apiPath = initializer.apiPath;
        this.actions = initializer.actions;
    }

    public readonly uri: string;
    public readonly apiPath: string;
    public readonly actions: TActions;

    public getUriAndMethod(actionName: (keyof TActions), ...params: RouteParam[]): UriWithMethod {
        return {
            uri: this.createActionUri(actionName, ...params),
            method: this.actions[actionName].method
        };
    }

    private createActionUri(actionName: (keyof TActions), ...params: RouteParam[]) {
        const action = this.actions[actionName];
        let route = action.route;
        for (let parameter of params) {
            route = route.replace(parameter.name, parameter.value.toString());
        }
        return `${this.uri}${this.apiPath}${route}`;
    }
}
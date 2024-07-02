class AppStorage {
    private readonly enforceRulesKey = 'enforceRules';
    public get enforceRules(): boolean {
        const enforceRules = localStorage.getItem(this.enforceRulesKey);
        if (enforceRules == undefined) {
            localStorage.setItem(this.enforceRulesKey, true.toString());
            return true;
        }
        return enforceRules === true.toString();
    }

    public set enforceRules(value: boolean) {
        localStorage.setItem(this.enforceRulesKey, value.toString());
    }
}

export const ApplicationStorage = new AppStorage();
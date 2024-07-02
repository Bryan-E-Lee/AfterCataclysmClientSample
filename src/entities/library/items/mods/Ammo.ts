import { CharacterAbility } from "../../../abilities/Ability";
import { OwnedAmmoInitializer, AmmoInitializer, unguardedIsAmmo } from "../ItemInitializers";
import { Weapon } from "../weapons/Weapon";
import { Mod } from "./Mod";

export type AmmoTriggerSource = { name: string, description: string }

export function isAmmo(item: any): item is Ammo {
    return unguardedIsAmmo(item);
}

export class Ammo extends Mod implements AmmoInitializer {
    public constructor(initializer: OwnedAmmoInitializer) {
        super({
            ...initializer,
            actions: [] //Hard coding removing ammo actions, readd if determined to be okay and remove actions from existing ammos.
        });

        this.rangeMod = initializer.rangeMod ?? 0;
        this.rangeOverride = initializer.rangeOverride;
    }

    public readonly type: 'Ammo' = 'Ammo';
    public readonly rangeMod: number;
    public readonly rangeOverride?: number;

    public getActions(weapon: Weapon): CharacterAbility[] {
        return super.getActions(weapon).map(action => ({
            ...action,
            range: action.range ?? this.rangeOverride ?? (weapon.range + this.rangeMod)
        }));
    }
}
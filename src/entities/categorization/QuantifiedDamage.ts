import { DamageType, DamageTypeSort } from "./DamageType";

export interface QuantifiedDamage {
    quantity: number;
    damageType: DamageType;
}

export const GenerateQuantifiedDamageKey = (quantifiedDamage: QuantifiedDamage) => `(${quantifiedDamage.damageType}_${quantifiedDamage.quantity})`;
export const GenerateQuantifiedDamageSuiteKey = (suite: QuantifiedDamage[]) => suite.map(GenerateQuantifiedDamageKey).join(',');
export const QuantifiedDamageSort = (qd1: QuantifiedDamage, qd2: QuantifiedDamage) => DamageTypeSort(qd1.damageType, qd2.damageType);
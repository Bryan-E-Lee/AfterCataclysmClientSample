import { SetStateAction } from "react";
import { Dispatch } from "react";
import { ItemIconKey } from "../../../components/icons";
import { ActiveAbility } from "../../../entities/abilities/ActiveAbility";
import { PassiveAbility } from "../../../entities/abilities/PassiveAbility";
import { ReactiveAbility } from "../../../entities/abilities/ReactiveAbility";
import { HandTrigger } from "../../../entities/rolls/HandTrigger";
import { CrudItemInitializer, UnknownItemInitializer } from "../../../entities/library/items/ItemInitializers";
import { ModSlotInitializer } from "../../../entities/library/items/mods/ModSlot";
import { SkillName } from "../../../entities/library/skills/SkillMap";
import { SkillRequirement } from "../../../entities/library/skills/SkillRequirement";
import { RecordStatus } from "../../../entities/RecordStatus";

/**
 * Did some crazy things to avoid passing in a ton of props and having components inherit from one another.
 * Extracted type of a react state update so that the component can inject it's state setter into this class
 * and pass this class into the common component.
 * */
export class ItemStateSetter<I extends UnknownItemInitializer, C extends CrudItemInitializer<I>> {
    public constructor(setState: Dispatch<SetStateAction<C>>) {
        this.setState = setState;
    }

    protected readonly setState: Dispatch<SetStateAction<C>>;

    public updateRecordStatus(recordStatus: RecordStatus): void {
        this.setState(state => ({ ...state, recordStatus }));
    }

    public updateName(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, name: e.target.value }));
    }

    public updateDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState(state => ({ ...state, description: e.target.value }));
    }

    public updateIcon(iconKey: ItemIconKey): void {
        this.setState(state => ({ ...state, icon: iconKey }));
    }

    public updateExplicitType(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, explicitType: e.target.value }));
    }

    public updateCost(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, cost: parseInt(e.target.value) }));
    }

    public updateWeight(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, weight: parseFloat(e.target.value) }));
    }

    public updateArmor(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, armor: parseInt(e.target.value) }));
    }

    public updateResilience(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState(state => ({ ...state, resilience: parseInt(e.target.value) }));
    }

    public updateHandsUsedModifier(handsUsedModifier: number): void {
        this.setState(state => ({ ...state, handsUsedModifier }));
    }

    public updateHandsAvailableModifier(handsAvailableModifier: number): void {
        this.setState(state => ({ ...state, handsAvailableModifier }));
    }

    public updateSkillsUsed(skillsUsed: SkillName[]): void {
        this.setState(state => ({ ...state, skillsUsed: [...skillsUsed] }));
    }

    public updateSkillRequirements(requirements: SkillRequirement[]): void {
        this.setState(state => ({ ...state, skillRequirements: [...requirements] }));
    }

    public updateHandTriggers(handTriggers: HandTrigger[]): void {
        this.setState(state => ({ ...state, handTriggers }));
    }

    public updateActiveAbilities(actions: ActiveAbility[]): void {
        this.setState(state => ({ ...state, actions: [...actions] }));
    }

    public updatePassiveAbilities(passives: PassiveAbility[]): void {
        this.setState(state => ({ ...state, passives: [...passives] }));
    }

    public updateReactiveAbilities(reactions: ReactiveAbility[]): void {
        this.setState(state => ({ ...state, reactions: [...reactions] }));
    }

    public updateModSlots(slots: ModSlotInitializer[]): void {
        this.setState(state => ({ ...state, slots: [...slots] }));
    }

    public updateWornOn(wornOn: string[]): void {
        this.setState(state => ({ ...state, wornOn: [...wornOn] }));
    }

    public updateTags(tags: string[]): void {
        this.setState(state => ({ ...state, tags: [...tags] }));
    }

    public updateNewTags(newTags: string[]): void {
        this.setState(state => ({ ...state, newTags: [...newTags] }));
    }

    public updateBlacklistTags(blacklistTags: string[]): void {
        this.setState(state => ({ ...state, blacklistTags: [...blacklistTags] }));
    }
}
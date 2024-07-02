import React from "react"
import { PerkInitializer } from "../../../entities/library/perks/Perk"
import { IconEditor } from "../items/item-field-editors/IconEditor";
import { SkillRequirementsEditor } from "../SkillRequirementsEditor";
import { ActiveAbilityCollectionCreator } from "../abilities/ActiveAbilityCollectionCreator";
import { ReactiveAbilityCollectionCreator } from "../abilities/ReactiveAbilityCollectionCreator";
import { PassiveAbilityCollectionCreator } from "../abilities/PassiveAbilityCollectionCreator";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { useSelector } from "react-redux";
import { AdminState } from "../../store/stores/AdminState";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";

type Props = {
    initializer: PerkInitializer;
    update: (initializer: PerkInitializer) => unknown;
}

export const PerkInitializerEditor = (props: Props) => {
    const { initializer, update } = props;
    const { tags } = useSelector((app: AdminState) => app.library);
    const tagOptions = tags.map(t => ({ name: t, value: t }));
    return (
        <>
            {initializer.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {initializer.id}
                    </CopyableText>
                </div>
            }
            <div>
                <label>Name</label>
                <input type="text" value={initializer.name}
                    onChange={(e) => update({ ...initializer, name: e.target.value })} />
            </div>

            <div>
                <label>Description</label>
                <textarea value={initializer.description}
                    onChange={(e) => update({ ...initializer, description: e.target.value })}></textarea>
                <CollapsibleSection header="Preview" expandedInitially>
                    <MarkdownContainer>{initializer.description}</MarkdownContainer>
                </CollapsibleSection>
            </div>

            <div>
                <IconEditor initializer={initializer}
                    onChange={(icon) => update({ ...initializer, icon })} />
            </div>

            <div>
                <label>Hands Available Modifier</label>
                <input type="number" value={initializer.handsAvailableModifier}
                    onChange={(e) => update({ ...initializer, handsAvailableModifier: parseInt(e.target.value) })} />
            </div>

            <div>
                <label>Skill Requirements</label>
                <SkillRequirementsEditor requirements={initializer.skillRequirements ?? []}
                    update={(skillRequirements) => update({ ...initializer, skillRequirements })} />
            </div>

            <div>
                <label>Actions</label>
                <ActiveAbilityCollectionCreator actions={initializer.actions ?? []}
                    update={(actions) => update({ ...initializer, actions })} />
            </div>

            <div>
                <label>Reactions</label>
                <ReactiveAbilityCollectionCreator reactions={initializer.reactions ?? []}
                    onUpdate={(reactions) => update({ ...initializer, reactions })} />
            </div>

            <div>
                <label>Passives</label>
                <PassiveAbilityCollectionCreator passives={initializer.passives ?? []}
                    update={(passives) => update({ ...initializer, passives })} />
            </div>

            <div>
                <label>Tags</label>
                <MultiSelect options={tagOptions} selections={initializer.tags ?? []}
                        onChange={(tags) => update({ ...initializer, tags })} />
            </div>
        </>
    )
}
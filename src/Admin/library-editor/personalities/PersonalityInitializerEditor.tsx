import React from "react";
import { PersonalityInitializer } from "../../../entities/library/socials/Personality"
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { ActiveAbilityCollectionCreator } from "../abilities/ActiveAbilityCollectionCreator";
import { PassiveAbilityCollectionCreator } from "../abilities/PassiveAbilityCollectionCreator";
import { ReactiveAbilityCollectionCreator } from "../abilities/ReactiveAbilityCollectionCreator";

type Props = {
    initializer: PersonalityInitializer;
    update: (initializer: PersonalityInitializer) => unknown;
}

export const PersonalityInitizerEditor = (props: Props) => {
    const { initializer, update } = props;
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
            <fieldset>
                <legend>Basics</legend>
                <div className="form-field">
                    <label>Name</label>
                    <input type='text' value={initializer.name}
                        onChange={(e) => update({ ...initializer, name: e.target.value })} />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea value={initializer.description}
                        onChange={(e) => update({ ...initializer, description: e.target.value })}></textarea>
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{initializer.description}</MarkdownContainer>
                    </CollapsibleSection>
                </div>
                <div className="form-field">
                    <label>Positive?</label>
                    <input type='checkbox' checked={initializer.positive}
                        onChange={(e) => update({ ...initializer, positive: e.target.checked })} />
                </div>
            </fieldset>
            <fieldset>
                <legend>Active Abilities</legend>
                <ActiveAbilityCollectionCreator actions={initializer.activeAbilities ?? []}
                    update={(activeAbilities) => update({ ...initializer, activeAbilities})} />
            </fieldset>
            <fieldset>
                <legend>Active Abilities</legend>
                <ReactiveAbilityCollectionCreator reactions={initializer.reactiveAbilities ?? []}
                    onUpdate={(reactiveAbilities) => update({ ...initializer, reactiveAbilities})} />
            </fieldset>
            <fieldset>
                <legend>Passive Abilities</legend>
                <PassiveAbilityCollectionCreator passives={initializer.passiveAbilities ?? []}
                    update={(passiveAbilities) => update({ ...initializer, passiveAbilities})} />
            </fieldset>
        </>
    )
}
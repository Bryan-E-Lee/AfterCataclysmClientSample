import React from "react";
import { CollapsibleSection } from "../../../../articles/CollapsibleSection";
import { CharacterAbility } from "../../../../../entities/abilities/Ability";
import { MarkdownContainer } from "../../../../theming/MarkdownContainer";

type Props = {
    passives: CharacterAbility[];
}

export const Passives = (props: Props) => {
    return (
        <>
            {props.passives.unique(p => p.id).map(p => {
                const header = `${p.name} (${p.source})`;
                return (
                    <CollapsibleSection key={p.id} header={header} className="character-ability feature">
                        <MarkdownContainer>
                            {p.description}
                        </MarkdownContainer>
                    </CollapsibleSection>
                );
            })}
        </>
    );
}
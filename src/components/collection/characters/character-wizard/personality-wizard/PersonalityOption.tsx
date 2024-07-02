import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { PersonalityInitializer } from "../../../../../entities/library/socials/Personality";
import { CollapsibleSection } from "../../../../articles/CollapsibleSection";
import { PersonalityHeader } from "./PersonalityHeader";
import { MarkdownContainer } from "../../../../theming/MarkdownContainer";

type Props = {
    personality: PersonalityInitializer;
    character: Character;
}

export const PersonalityOption: React.FC<Props> = (props: Props) => {
    const { personality } = props;
    const header = <PersonalityHeader {...props} />;
    return (
        <CollapsibleSection header={header} key={personality.name}>
            <MarkdownContainer>{personality.description}</MarkdownContainer>
        </CollapsibleSection>
    );
}
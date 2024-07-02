import React from "react";
import { PersonalityInitializer } from "../../../entities/library/socials/Personality"
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { AbilityCollection } from "../abilities/AbilityCollection";

type Props = { personality: PersonalityInitializer }

export const PersonalityBlock = (props: Props) => {
    const { personality } = props;
    const { name, description, positive } = personality;
    return (
        <div className="entity-view entity-panel">
            <header className="entity-panel-header">{name}</header>
            {!positive && <label className="standout">Not Beneficial <br /></label>}
            <MarkdownContainer>{description}</MarkdownContainer>
            <AbilityCollection entity={personality} />
        </div>
    )
}
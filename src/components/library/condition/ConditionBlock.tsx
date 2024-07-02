import React from "react";
import { Condition } from "../../../entities/characters/Conditions"
import { MarkdownContainer } from "../../theming/MarkdownContainer";

type Props = { condition: Condition }

export const ConditionBlock = (props: Props) => {
    const { condition } = props;
    const { name, description } = condition;
    return (
        <div className="entity-view entity-panel">
            <header className="entity-panel-header">{name}</header>
            <MarkdownContainer>{description}</MarkdownContainer>
        </div>
    )
}
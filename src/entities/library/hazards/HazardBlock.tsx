import React from "react"
import { Hazard } from "./Hazard"
import { TagsComponent } from "../../../components/collection/characters/character-sheet/common/tags/TagsComponent";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";

type Props = { hazard: Hazard }

export const HazardBlock = (props: Props) => {
    const { hazard } = props;
    const { name, description, solutions, tags } = hazard;
    return (
        <div className="entity-view entity-panel">
            <header className="entity-panel-header">{name}</header>
            {tags.any(t => t.toLowerCase() == "rough") && <div className="standout">Rough</div>}
            <div>
                <label className="standout">Description:</label>
                <MarkdownContainer>{description}</MarkdownContainer>
            </div>
            {solutions.length == 1 && (
                <div><label className="standout">Solution:</label>&nbsp;{solutions[0]}</div>
            )}
            {solutions.length > 1 && (
                <div>
                    <label className="standout">Solutions:</label>
                    <br />
                    <ul>
                        {solutions.map(s => <li key={s}>{s}</li>)}
                    </ul>
                </div>
            )}
            <TagsComponent tags={tags} />
        </div>
    )
}
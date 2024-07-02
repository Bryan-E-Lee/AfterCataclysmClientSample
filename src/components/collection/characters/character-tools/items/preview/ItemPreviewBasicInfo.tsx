import React from "react";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { MarkdownContainer } from "../../../../../theming/MarkdownContainer";

type ItemProps = {
    item: ItemInitializer;
}

export const ItemPreviewBasicInfo: React.FC<ItemProps> = (props: ItemProps) => {
    const { item } = props;
    const { description, skillRequirements } = item;
    return (
        <>
            <div className="row description">
                <MarkdownContainer>
                    {description}
                </MarkdownContainer>
            </div>

            {skillRequirements.any() &&
                <> 
                    <div className="row standout">
                        Skill Requirements:
                    </div>
                    <div className="row skill-requirements">
                        {skillRequirements.map(sr => (
                            <div key={sr.name} className="skill-requirement">
                                <span className="name">{sr.name}</span>(<span className="level">{sr.level}</span>)
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}
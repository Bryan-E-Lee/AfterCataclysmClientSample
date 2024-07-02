import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { ArticleNavLink } from "../../../../articles/navigation/article-navigation/ArticleNavLink";
import { PageNavigation } from "../../../../articles/navigation/PageNavigation";
import { CurrentInventoryTool } from "./current-inventory-tool";
import { StartingEquipmentTool } from "./starting-equipment-tool";

type Props = { character: Character }

export const EquipmentWizard: React.FC<Props> = (props: Props) => {
    const prev = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Personality`,
        name: 'Prev'
    });
    const next = new ArticleNavLink({
        path: `/Characters/${props.character.id}`,
        name: 'Next'
    });
    return (
        <div className="equipment-editor character-wizard-editor">
            <PageNavigation prev={prev} next={next}></PageNavigation>
            <div className="content">
                <StartingEquipmentTool character={props.character} />
                <CurrentInventoryTool character={props.character} />
            </div>
            <PageNavigation prev={prev} next={next}></PageNavigation>
        </div>
    )
}
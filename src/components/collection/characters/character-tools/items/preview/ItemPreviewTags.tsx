import React from "react";
import { TagsComponent } from "../../../character-sheet/common/tags/TagsComponent";
import { ItemInitializer, isModInitializer } from "../../../../../../entities/library/items/ItemInitializers";

type Props = {
    item: ItemInitializer;
}

export const ItemPreviewTags: React.FC<Props> = (props: Props) => {
    const { item } = props;
    let assignableTo, notAssignableTo: string[] | undefined = undefined;

    if (isModInitializer(item)) {
        assignableTo = item.assignableToTags;
        notAssignableTo = item.blacklistTags;
    }
    return (
        <>
            {item.wornOn.any() && (
                <div className="tags">
                    <label className="standout">Worn On:</label>
                    {item.wornOn.map(wo => <div key={wo} className="tag">{wo}</div>)}
                </div>
            )}
            <div>
                <TagsComponent tags={item.tags} assignableTo={assignableTo} notAssignableTo={notAssignableTo} />
            </div>
        </>
    );
}
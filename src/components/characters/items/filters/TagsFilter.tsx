import React from "react";
import { MultiSelect } from "../../../inputs/selects/multiselect/MultiSelect";
import { Tag } from "../../../../entities/categorization/Tag";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../store/stores/ApplicationState";

type Props = {
    tags: string[];
    onChange: (tags: string[]) => unknown;
}

export const TagsFilter = (props: Props) => {
    const { tags, onChange } = props;
    const allTags = useSelector((app: ApplicationState) => app.library.tags);
    return (
        <div className="filter-group">
            <div className="filter">
                <label htmlFor="tags">Tags</label>
                <MultiSelect name="tags"
                    options={allTags.map(Tag.MapToSelectableOption)}
                    selections={tags}
                    onChange={(selections: string[]) => onChange(selections)} />
            </div>
        </div>
    )
}
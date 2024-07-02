import React from "react";
import { BladeIcon, BludgeonIcon, BulletIcon, CellIcon, GrenadeIcon, MineIcon, ShotIcon, SlugIcon, SpikeIcon } from "../../../../../../icons/items/AmmoIcons";
import { JSXChildProps } from "../../../../../../../entities/utils/jsx/Children";
import { ChemistryIcon, ElectronicsIcon, MachineryIcon, MedicineIcon } from "../../../../../../icons/items/SpellIcons";

type Props = {
    tags: string[];
    onChange: (tags: string[]) => unknown;
}

export const ModEditorTagFilter = (props: Props) => {
    const { tags, onChange } = props;


    const createTagFilterEvent = (tag: string) => {
        return () => {
            let updatedTags: string[];
            if (tags.contains(tag)) {
                updatedTags = tags.filter(t => t != tag);
            }
            else {
                updatedTags = [...tags, tag];
            }
            onChange(updatedTags);
        }
    }

    return (
        <div>
            <div>
                <label className="standout">Attacks:</label>&nbsp;
                <div className="type-filters">
                    <TagButton tag="Bullet" tags={tags} createClick={createTagFilterEvent}>
                        <BulletIcon />
                        <label>Bullets</label>
                    </TagButton>
                    <TagButton tag="Shot" tags={tags} createClick={createTagFilterEvent}>
                        <ShotIcon />
                        <label>Shot</label>
                    </TagButton>
                    <TagButton tag="Slug" tags={tags} createClick={createTagFilterEvent}>
                        <SlugIcon />
                        <label>Slug</label>
                    </TagButton>
                    <TagButton tag="Cell" tags={tags} createClick={createTagFilterEvent}>
                        <CellIcon />
                        <label>Cell</label>
                    </TagButton>
                    <TagButton tag="Grenade" tags={tags} createClick={createTagFilterEvent}>
                        <GrenadeIcon />
                        <label>Grenade</label>
                    </TagButton>
                    <TagButton tag="Mine" tags={tags} createClick={createTagFilterEvent}>
                        <MineIcon />
                        <label>Mine</label>
                    </TagButton>
                    <TagButton tag="Chemical" tags={tags} createClick={createTagFilterEvent}>
                        <ChemistryIcon />
                        <label>Chemical</label>
                    </TagButton>
                    <TagButton tag="Bludgeon" tags={tags} createClick={createTagFilterEvent}>
                        <BludgeonIcon />
                        <label>Bludgeon</label>
                    </TagButton>
                    <TagButton tag="Blade" tags={tags} createClick={createTagFilterEvent}>
                        <BladeIcon />
                        <label>Blade</label>
                    </TagButton>
                    <TagButton tag="Spike" tags={tags} createClick={createTagFilterEvent}>
                        <SpikeIcon />
                        <label>Spike</label>
                    </TagButton>
                </div>
            </div>
            <div>
                <label className="standout">Spells:</label>&nbsp;
                <div className="type-filters">
                    <TagButton tag="Chemistry" tags={tags} createClick={createTagFilterEvent}>
                        <ChemistryIcon />
                        <label>Chemistry</label>
                    </TagButton>
                    <TagButton tag="Electronics" tags={tags} createClick={createTagFilterEvent}>
                        <ElectronicsIcon />
                        <label>Electronics</label>
                    </TagButton>
                    <TagButton tag="Machinery" tags={tags} createClick={createTagFilterEvent}>
                        <MachineryIcon />
                        <label>Machinery</label>
                    </TagButton>
                    <TagButton tag="Medicine" tags={tags} createClick={createTagFilterEvent}>
                        <MedicineIcon />
                        <label>Medicine</label>
                    </TagButton>
                </div>
            </div>
        </div>
    )
}

type TagButtonProps = {
    tag: string;
    tags: string[];
    createClick: (tag: string) => () => unknown;
} & JSXChildProps;

const TagButton = (props: TagButtonProps) => {
    const { tag, tags, createClick, children } = props;
    const isActiveClass = (tag: string) => tags.contains(tag) ? 'active' : 'inactive';
    return (
        <button className={`type-filter-button ${isActiveClass(tag)}`} onClick={createClick(tag)}>
            {children}
        </button>
    )
}
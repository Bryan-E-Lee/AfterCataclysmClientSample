import { useSelector } from "react-redux";
import { Book } from "../../../entities/library/books/Book"
import { AdminState } from "../../store/stores/AdminState";
import React from "react";
import { CopyableText } from "../../../components/theming/clipboard/CopyableText";
import { BookStateSetter } from "./BookStateSetter";
import { CollapsibleSection } from "../../../components/articles/CollapsibleSection";
import { MarkdownContainer } from "../../../components/theming/MarkdownContainer";
import { SingleSelect } from "../../../components/inputs/selects/singleselect/SingleSelect";
import { MultiSelect } from "../../../components/inputs/selects/multiselect/MultiSelect";
import { ChaptersEditor } from "./ChapterEditor";
import { NpcsEditor } from "./NpcsEditor";
import { RecordStatusOptions } from "../../../entities/RecordStatus";

type Props = { 
    book: Book;
    stateSetter: BookStateSetter;
}

export const BookEditorShared = (props: Props) => {
    const { book, stateSetter } = props;
    const { items, minions, perks, personalities, tags } = useSelector((app: AdminState) => app.library);

    const itemOptions = items.map(item => ({ name: item.name, value: item.id }));
    const minionOptions = minions.map(minion => ({ name: minion.name, value: minion.id }));
    const perkOptions = perks.map(perk => ({ name: perk.name, value: perk.id }));
    const personalityOptions = personalities.map(personality => ({ name: personality.name, value: personality.id }));
    const tagOptions = tags.map(tag => ({ name: tag, value: tag }));
    return (
        <>
            {book.id && 
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {book.id}
                    </CopyableText>
                </div>
            }
            <fieldset className="form-group">
                <legend>Basic Info</legend>
                
                <div className="form-field">
                    <label>Name</label>
                    <input type="text" value={book.name ?? ""} onChange={stateSetter.updateName.bind(stateSetter)} />
                </div>

                <div className='form-field'>
                    <label>Record Status</label>
                    <SingleSelect options={RecordStatusOptions} selection={book.recordStatus}
                        onChange={stateSetter.updateRecordStatus.bind(stateSetter)} />
                </div>

                <div className="form-field">
                    <label>Description</label>
                    <textarea value={book.description ?? ''}
                        onChange={stateSetter.updateDescription.bind(stateSetter)}></textarea>
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{book.description}</MarkdownContainer>
                    </CollapsibleSection>
                </div>
            </fieldset>

            <fieldset className="form-group">
                <legend>NPCs</legend>
                <NpcsEditor npcs={book.npcs} onUpdate={stateSetter.updateNPCs.bind(stateSetter)} />
            </fieldset>

            <fieldset className="form-group">
                <legend>Chapters</legend>
                <ChaptersEditor chapters={book.chapters} npcs={book.npcs} onUpdate={stateSetter.updateChapters.bind(stateSetter)} />
            </fieldset>

            <fieldset className="form-group">
                <legend>Contained Content</legend>

                <div className="form-field">
                    <label>Items</label>
                    <MultiSelect selections={book.itemIds} options={itemOptions} onChange={(options: string[]) => stateSetter.updateItemIds(options)}></MultiSelect>
                </div>

                <div className="form-field">
                    <label>Minions</label>
                    <MultiSelect selections={book.minionIds} options={minionOptions} onChange={(options: string[]) => stateSetter.updateMinionIds(options)}></MultiSelect>
                </div>

                <div className="form-field">
                    <label>Perks</label>
                    <MultiSelect selections={book.perkIds} options={perkOptions} onChange={(options: string[]) => stateSetter.updatePerkIds(options)}></MultiSelect>
                </div>

                <div className="form-field">
                    <label>Personalities</label>
                    <MultiSelect selections={book.personalityIds} options={personalityOptions} onChange={(options: string[]) => stateSetter.updatepersonalityIds(options)}></MultiSelect>
                </div>

                <div className="form-field">
                    <label>Tags</label>
                    <MultiSelect selections={book.tags} options={tagOptions} onChange={(options: string[]) => stateSetter.updateTags(options)}></MultiSelect>
                </div>
            </fieldset>
        </>
    )
}
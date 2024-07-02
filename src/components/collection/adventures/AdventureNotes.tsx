import React, { useState } from "react";
import { Adventure } from "../../../entities/adventures/Adventure";
import { EditIcon } from "../../icons";

type Props = { adventure: Adventure, isOwner: boolean }

type State = { editingPublicNotes: boolean, editingPrivateNotes: boolean }

export const AdventureNotes: React.FC<Props> = (props: Props) => {
    const { adventure, isOwner } = props;
    const [state, setState] = useState<State>({
        editingPublicNotes: false,
        editingPrivateNotes: false
    });
    const { editingPublicNotes, editingPrivateNotes } = state;
    const editPublicNotes = () => setState({ editingPublicNotes: true, editingPrivateNotes: false });
    const editPrivateNotes = () => setState({ editingPrivateNotes: true, editingPublicNotes: false });
    return (
        <div className="adventure-notes">
            <div className="notes-section">
                <h3>
                    Public Notes
                    {isOwner && <button className="interactable-button" onClick={editPublicNotes}><EditIcon /></button>}
                </h3>
                {!editingPublicNotes && (
                    <div>
                        {adventure.publicNotes}
                    </div>
                )}
                {editingPublicNotes && (
                    <input placeholder="TODO: Add wysiwyg" type="text" onBlur={() => setState({ ...state, editingPublicNotes: false })} />
                )}
            </div>
            {isOwner && (
                <div className="notes-section">
                    <h3>
                        Private Notes
                        <button className="interactable-button" onClick={editPrivateNotes}><EditIcon /></button>
                    </h3>
                    {!editingPrivateNotes && (
                        <div>
                            {adventure.privateNotes}
                        </div>
                    )}
                    {editingPrivateNotes && (
                        <input placeholder="TODO: Add wysiwyg" type="text" onBlur={() => setState({ ...state, editingPrivateNotes: false })} />
                    )}
                </div>
            )}
        </div>
    );
}
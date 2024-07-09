import React, { useRef, useState } from "react";
import { Adventure } from "../../../entities/adventures/Adventure";
import { EditIcon } from "../../icons";
import { MarkdownContainer } from "../../theming/MarkdownContainer";
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { useDispatch } from "react-redux";

type Props = { adventure: Adventure, isOwner: boolean }

export const AdventureNotes: React.FC<Props> = (props: Props) => {
    const { adventure, isOwner } = props;
    const [editingPublicNotes, setEditingPublicNotes] = useState<boolean>(false);
    const [editingPrivateNotes, setEditingPrivateNotes] = useState<boolean>(false);
    const [currentPublicNotes, setCurrentPublicNotes] = useState<string>(adventure.publicNotes);
    const [currentPrivateNotes, setCurrentPrivateNotes] = useState<string>(adventure.privateNotes);

    const publicEditorRef = useRef<HTMLTextAreaElement>(null);
    const privateEditorRef = useRef<HTMLTextAreaElement>(null);

    const dispatch = useDispatch();
    const editPublicNotes = () => {
        setEditingPublicNotes(true);
        setEditingPrivateNotes(false);
        publicEditorRef.current?.focus();
    }
    const editPrivateNotes = () => {
        setEditingPublicNotes(false);
        setEditingPrivateNotes(true);
        privateEditorRef.current?.focus();
    }

    const setPublicNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(AdventureActions.setPublicNotes(adventure, e.target.value));
        setEditingPublicNotes(false);
    }
    const setPrivateNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(AdventureActions.setPrivateNotes(adventure, e.target.value));
        setEditingPrivateNotes(false);
    }

    return (
        <div className="adventure-notes">
            <div className="notes-section">
                <h3>
                    Public Notes
                    {isOwner && <button className="interactable-button" onClick={editPublicNotes}><EditIcon /></button>}
                </h3>
                {!editingPublicNotes && (
                    <div>
                        {adventure.publicNotes != "" ? <MarkdownContainer>{currentPublicNotes}</MarkdownContainer> : <em>Empty</em>}
                    </div>
                )}
                {editingPublicNotes && (
                    <textarea ref={publicEditorRef} value={currentPublicNotes} autoFocus
                        onBlur={setPublicNotes} onChange={(e) => setCurrentPublicNotes(e.target.value)}></textarea>
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
                            {adventure.privateNotes != "" ? <MarkdownContainer>{currentPrivateNotes}</MarkdownContainer> : <em>Empty</em>}
                        </div>
                    )}
                    {editingPrivateNotes && (
                        <textarea ref={privateEditorRef} value={currentPrivateNotes} autoFocus
                            onBlur={setPrivateNotes} onChange={(e) => setCurrentPrivateNotes(e.target.value)}></textarea>
                    )}
                </div>
            )}
        </div>
    );
}
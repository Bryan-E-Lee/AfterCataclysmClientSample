import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../components/inputs/buttons/ThemedButton";
import { ErrorToast } from "../../entities/toasts/Toasts";
import { ToastDispatchables } from "../../store/stores/toasts/Toasts.Actions";
import { MarkdownContainer } from "../../components/theming/MarkdownContainer";

type Props = {
    texts: string[];
    update: (texts: string[]) => unknown;
}

export const MarkdownListEditor = (props: Props) => {
    const { texts, update } = props;
    const [newText, setNewText] = useState("");
    const dispatch = useDispatch();
    const onAdd = () => {
        if (texts.map(t => t.toLowerCase()).contains(newText.toLowerCase())) {
            dispatch(ToastDispatchables.toast(new ErrorToast(`Duplicate text "${newText}" exists.`), dispatch));
        }
        else {
            setNewText("");
            update([...texts, newText]);
        }
    }
    return (
        <div>
            <textarea value={newText} onChange={(e) => setNewText(e.currentTarget.value)} />
            <br />
            <ThemedButton onClick={onAdd}>+ Add</ThemedButton>
            <ul>
                {texts.map(text => (
                    <li key={text}>
                        <MarkdownContainer>{text}</MarkdownContainer>
                        <ThemedButton onClick={() => update(texts.filter(t => t != text))}>Delete</ThemedButton>
                    </li>
                ))}
            </ul>
        </div>
    )
}
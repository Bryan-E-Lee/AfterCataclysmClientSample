import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThemedButton } from "../../components/inputs/buttons/ThemedButton";
import { ErrorToast } from "../../entities/toasts/Toasts";
import { ToastDispatchables } from "../../store/stores/toasts/Toasts.Actions";

type Props = {
    texts: string[];
    update: (texts: string[]) => unknown;
}

export const StringListEditor = (props: Props) => {
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
            <input type="text" value={newText} onChange={(e) => setNewText(e.currentTarget.value)} />
            <ThemedButton onClick={onAdd}>+ Add</ThemedButton>
            <ul>
                {texts.map(text => (
                    <li key={text}>
                        {text}&nbsp;
                        <ThemedButton onClick={() => update(texts.filter(t => t != text))}>Delete</ThemedButton>
                    </li>
                ))}
            </ul>
        </div>
    )
}
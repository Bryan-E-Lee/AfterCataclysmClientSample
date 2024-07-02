import "./tags.scss";
import React from "react"

type Props = {
    tags: string[];
    assignableTo?: string[];
    notAssignableTo?: string[];
}

export const TagsComponent: React.FC<Props> = (props: Props) => {
    const { tags, assignableTo, notAssignableTo } = props;
    return (
        <>
            <div className="row tags-container">
                <label className="standout">Tags:</label>
                {tags.map(t => <div key={t} className="tag">{t}</div>)}
            </div>
            {assignableTo?.any() && (
                <div className="row tags-container">
                    <label className="standout">Assignable To:</label>
                    {assignableTo.map(t => <div key={t} className="tag">{t}</div>)}
                </div>
            )}
            {notAssignableTo?.any() && (
                <div className="row tags-container">
                    <label className="standout">Not Assignable To:</label>
                    {notAssignableTo.map(t => <div key={t} className="tag">{t}</div>)}
                </div>
            )}
        </>
    );
}
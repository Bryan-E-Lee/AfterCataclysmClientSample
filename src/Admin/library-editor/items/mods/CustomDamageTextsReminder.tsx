import React from "react";
import { JSXChildProps } from "../../../../entities/utils/jsx/Children";
import { CollapsibleSection } from "../../../../components/articles/CollapsibleSection";

const Braced = (props: JSXChildProps) => <>&#123;{props.children}&#125;</>;

export const CustomDamageTextsReminder = () => (
    <CollapsibleSection header="Custom Damage Text Reminder" expandedInitially>
        <ul>
            <li>
                <label>Skill Empowerment Bonus:</label> <Braced>Empowerment</Braced>.<Braced>Skill_Name</Braced>
            </li>
        </ul>
    </CollapsibleSection>
)
import React from "react"
import { SkillInitializer } from "../../../entities/library/skills/Skill"
import { CollapsibleRegion } from "../../articles/CollapsibleRegion"
import { CollapsibleSection } from "../../articles/CollapsibleSection"
import { CharacterAbilityView } from "../../collection/characters/character-sheet/main-section/CharacterAbilityView"
import { MarkdownContainer } from "../../theming/MarkdownContainer"

type Props = {
    skill: SkillInitializer;
    expanded?: boolean;
}

export const SkillBlock = (props: Props) => {
    const { skill, expanded } = props;
    const skillFeatures = skill.featuresByLevel.map(sf => (
        <CollapsibleRegion key={sf.level} header={`Level ${sf.level}`}>
            {sf.activeAbilities.map(a => <CharacterAbilityView key={a.id} ability={a} />)}
            {sf.passiveAbilities.map(a => <CharacterAbilityView key={a.id} ability={a} />)}
            {sf.reactiveAbilities.map(a => <CharacterAbilityView key={a.id} ability={a} />)}
        </CollapsibleRegion>
    ))
    return (
        <CollapsibleSection key={skill.id} header={skill.name} expandedInitially={expanded}>
            <MarkdownContainer>{skill.description}</MarkdownContainer>
            {skillFeatures}
        </CollapsibleSection>
    )
}
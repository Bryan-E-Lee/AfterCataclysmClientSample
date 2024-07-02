import './skills-page-editor.scss';
import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { SkillComponent } from "../../../../characters/skills/SkillComponent";
import { PageNavigation } from '../../../../articles/navigation/PageNavigation';
import { ArticleNavLink } from '../../../../articles/navigation/article-navigation/ArticleNavLink';

type Props = { character: Character };

export const SkillsWizard: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const pluralString = character.remainingSkillPoints != 1 ? 's' : '';

    const prev = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Personality`,
        name: 'Prev'
    });
    const next = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Equipment`,
        name: 'Next'
    });
    return (
        <div className="skills-page-editor character-wizard-editor">
            <PageNavigation prev={prev} next={next}></PageNavigation>
            <div className="content">
                <h2>Assign Skills ({character.remainingSkillPoints} point{pluralString} remaining)</h2>
                <div className="skills">
                    {character.skills.collection.map(s => (
                        <SkillComponent key={s.instanceId} character={character} skill={s} />
                    ))}
                </div>
            </div>
            <PageNavigation prev={prev} next={next}></PageNavigation>
        </div>
    );
}

import './name-kinship-editor.scss';
import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { CharacterKinshipEditor } from "./CharacterKinshipEditor";
import { CharacterNameEditor } from "./CharacterNameEditor";
import { LevelEditor } from './LevelEditor';
import { PageNavigation } from '../../../../articles/navigation/PageNavigation';
import { ArticleNavLink } from '../../../../articles/navigation/article-navigation/ArticleNavLink';

type Props = { character: Character }

export const NameKinshipWizard: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const next = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Personality`,
        name: 'Next'
    });
    return (
        <div className='name-kinship-editor character-wizard-editor'>
            <PageNavigation next={next}></PageNavigation>
            <div className="content">
                <CharacterNameEditor character={character} />
                <CharacterKinshipEditor kinship={character.kinship} />
                <LevelEditor character={character} level={character.level} />
            </div>
            <PageNavigation next={next}></PageNavigation>
        </div>
    );
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../../entities/characters/Character";
import { ApplicationState } from "../../../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../../../store/stores/library/LibraryStore.Actions";
import { ArticleNavLink } from "../../../../articles/navigation/article-navigation/ArticleNavLink";
import { PageNavigation } from "../../../../articles/navigation/PageNavigation";
import { PersonalityOption } from "./PersonalityOption";

type Props = { character: Character }

export const PersonalityWizard: React.FC<Props> = (props: Props) => {
    const { personalities, allPersonalitiesLoaded } = useSelector((state: ApplicationState) => state.library);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allPersonalitiesLoaded) {
            dispatch(LibraryActions.loadPersonalities());
        }
    }, [dispatch]);
    
    const positivePersonalities = personalities.filter(p => p.positive);
    const negativePersonalities = personalities.filter(p => !p.positive);
    const selectedPositivePersonalities = props.character.personalities.collection.count(p => p.positive);
    const selectedNegativePersonalities = props.character.personalities.collection.count(p => !p.positive);

    const positiveRemaining = Math.max(2 - selectedPositivePersonalities, 0);
    const remainingText = positiveRemaining > 0
        ? ` (up to ${positiveRemaining} remaining)`
        : '';

    const prev = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit`,
        name: 'Prev'
    });
    const next = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Skills`,
        name: 'Next'
    });
    return (
        <div className="character-wizard-editor">
            <PageNavigation prev={prev} next={next}></PageNavigation>
            <div className="content">
                <h2>Select Positive Personality Traits{remainingText}</h2>
                <div>
                    {positivePersonalities.map(personality => 
                        <PersonalityOption
                            key={personality.name}
                            personality={personality}
                            character={props.character} />
                    )}
                </div>
                <h2>Select a Negative Personality Trait</h2>
                <div>
                    {negativePersonalities.map(personality => 
                        <PersonalityOption
                            key={personality.name}
                            personality={personality}
                            character={props.character} />
                    )}
                </div>
            </div>
            <PageNavigation prev={prev} next={next}></PageNavigation>
        </div>
    );
}
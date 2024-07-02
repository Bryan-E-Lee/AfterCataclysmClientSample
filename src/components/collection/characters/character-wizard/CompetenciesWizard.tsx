import React from "react";
import { Character } from "../../../../entities/characters/Character";
import { PageNavigation } from "../../../articles/navigation/PageNavigation";
import { ArticleNavLink } from "../../../articles/navigation/article-navigation/ArticleNavLink";
import { SheetCompetencyEditor } from "../character-sheet/competencies/SheetCompetencyEditor";
import { WarningNotification } from "../../../notifications/Notification";

type Props = {
    character: Character
}

export const CompetenciesWizard = (props: Props) => {
    const { character } = props;

    const prev = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/Skills`,
        name: 'Prev'
    });
    const next = new ArticleNavLink({
        path: `/Characters/${props.character.id}/Edit/BodyMod`,
        name: 'Next'
    });

    const allCompetencies = [...character.competencies, ...character.customCompetencies];
    const competencyCount = allCompetencies.count(c => !c.isExpert);
    const expertiseCount = allCompetencies.count(c => c.isExpert);

    const overExpertiseCount = Math.max(expertiseCount - 1, 0);

    let overComptencyCount = 0;
    if (expertiseCount == 0) {
        overComptencyCount = Math.max(competencyCount - 4, 0);
    }
    else {
        overComptencyCount = Math.max(competencyCount - 2, 0);
    }
    const overCompetencyCountPlural = overComptencyCount != 1
        ? 'competencies'
        : 'competency';
    return (
        <div className="character-wizard-editor">
            <PageNavigation prev={prev} next={next} />
            <div className="content">
                <h2>Select Up to 4 competencies or 2 competencies and 1 competency with expertise.</h2>
                {overComptencyCount > 0 && (
                    <WarningNotification>
                        You have {overComptencyCount} more {overCompetencyCountPlural} than a starting character normally receives.
                    </WarningNotification>
                )}
                {overExpertiseCount > 0 && (
                    <WarningNotification>
                        You have {overExpertiseCount} more expertise than a starting character normally receives.
                    </WarningNotification>
                )}
                <SheetCompetencyEditor character={character} />
            </div>
            <PageNavigation prev={prev} next={next} />
        </div>
    )
}
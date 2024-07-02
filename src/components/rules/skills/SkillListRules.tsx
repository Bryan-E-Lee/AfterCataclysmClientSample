import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { LibraryActions } from "../../../store/stores/library/LibraryStore.Actions";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { RecordStatus } from "../../../entities/RecordStatus";

export const SkillListRulesLink = new ArticleNavLink({
    name: 'Skill List',
    path: '#SkillList',
    render: () => <SkillListRules />
});

const SkillListRules: React.FC = () => {
    const dispatch = useDispatch();
    const { skills, allSkillsLoaded } = useSelector((app: ApplicationState) => app.library);
    useEffect(() => {
        if (!allSkillsLoaded) {
            dispatch(LibraryActions.loadSkills());
        }
    }, [dispatch, allSkillsLoaded]);
    return (
        <section id={SkillListRulesLink.hash} key={SkillListRulesLink.path}>
            <h2>{SkillListRulesLink.name}</h2>
            <p>
                Below is a list of skills that a character can specialize in:
            </p>
            <dl>
                {skills.filter(s => s.recordStatus == RecordStatus.Published).map((skill) => (
                    <div key={skill.name}>
                        <dt id={skill.name}>{skill.name}</dt>
                        <dd>{skill.description}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
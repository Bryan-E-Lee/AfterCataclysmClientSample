import React from 'react';
import { HowToPlayRulesLink } from './HowToPlayRules';
import { TerminologyRulesLink } from './TerminologyRules';
import { ArticleProps } from '../../articles/ArticleProps';
import { RuleLinks } from '..';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { TheCataclysm } from '../../theming/texts';
import { RulesArticle } from '../RulesArticle';
import { GameInfoRulesLink } from './GameInfoRules';

export const IntroductionRulesLink = new ArticleNavLink({
    path: 'Introduction',
    name: 'Introduction',
    render: (index?: number) => <IntroductionRules index={index} siblings={RuleLinks} />,
    sublinks: [GameInfoRulesLink, HowToPlayRulesLink, TerminologyRulesLink]
});

const IntroductionRules: React.FC<ArticleProps> = (props: ArticleProps): JSX.Element => {
    return (
        <RulesArticle {...props} link={IntroductionRulesLink}>
            <section>
                <h1>500 A.C.</h1>
                <p>
                    It has been 500 years since <TheCataclysm />: the total collapse of human civilization. After humanity suffered such a debilitating loss, broken knowledge of the past has spun a new myth. Heroes and adventurers quest the wasteland wielding legendary weapons against foul mutant beasts, bards travel the highways earning coin playing the keytar, and cloistered sorcerers practice electromagnetism and thermodynamics. You will find the earth both familiar and foreign; grasp fate and craft a destiny on this rekindled waste.
                </p>
                <img src="/public/assets/images/splash/header-full.png" alt="Harvesters reaping an ancient settlement." style={{ width: "100%" }} />
            </section>
        </RulesArticle>
    );
};

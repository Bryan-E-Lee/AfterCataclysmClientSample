import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';

export const RangeRulesNavLink = new ArticleNavLink({
    name: 'Range',
    path: '#Range',
    render: () => <RangeRules />
});

const RangeRules: React.FC = () => (
    <section id={RangeRulesNavLink.hash}>
        <h2>{RangeRulesNavLink.name}</h2>
        <p>
            When describing what range an effect or ability can impact, the range refers to a maximum number of hexes from an origin hex. Below is an example of three effects, each with an increasing range. The blue hex is the origin hex, and the red hexes are the hexes within the respective range.
        </p>
        <figure className="figure-group align-center" role="group">
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/range-one.png"
                    alt="A range of 1" />
                <figcaption>A range of 1</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/range-two.png"
                    alt="A range of 2" />
                <figcaption>A range of 2</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/range-three.png"
                    alt="A range of 3" />
                <figcaption>A range of 3</figcaption>
            </figure>
        </figure>
        <p>
            The same rule is true even if there are multiple origin hexes. See below for an example of all hexes in a range of 2 from three origin hexes.
        </p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/range-multiple-origins.png"
                alt="An example of multiple origin hexes" />
            <figcaption>An example of multiple origin hexes</figcaption>
        </figure>
    </section>
);

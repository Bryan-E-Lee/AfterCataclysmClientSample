import React from 'react';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import { Link } from 'react-router-dom';

const SelfLink = new ArticleNavLink({ name: 'Self', path: '#Self' });
const TargetsLink = new ArticleNavLink({ name: 'Targets', path: '#Targets' });
const AreasLink = new ArticleNavLink({ name: 'Areas', path: '#Areas' });
const ThreeHexCircleLink = new ArticleNavLink({ name: 'The Three Hex Circle', path: '#3HexCircle' });
const CylindersLink = new ArticleNavLink({ name: 'Cylinders', path: '#Cylinders' });
const LinesLink = new ArticleNavLink({ name: 'Lines', path: '#Lines' });
const ConesLink = new ArticleNavLink({ name: 'Cones', path: '#Cones' });

export const TargetingRulesNavLink = new ArticleNavLink({
    name: 'Targets & Shapes',
    path: '#TargetsShapes',
    render: () => <TargetsShapesRules />,
    sublinks: [
        SelfLink,
        TargetsLink,
        AreasLink,
        ThreeHexCircleLink,
        LinesLink,
        ConesLink
    ]
});

const TargetsShapesRules = () => (
    <section id={TargetingRulesNavLink.hash} key={TargetingRulesNavLink.path}>
        <h2>{TargetingRulesNavLink.name}</h2>
        <p>
            Many of your abilities will indicate that they affect a target or target area. You'll find that there are several common patterns they reference, as detailed below:
        </p>
        <Self />
        <Targets />
        <Areas />
        <ThreeHexCircle />
        <Cylinders />
        <Lines />
        <Cones />
    </section>
);

const Self = () => (
    <section id={SelfLink.hash}>
        <h3>Self</h3>
        <p>
            The simplest target is yourself! Abilities will reference when they affect you.
        </p>
    </section>
);

const Targets = () => (
    <section id={TargetsLink.hash}>
        <h3>Targets</h3>
        <p>
            A target is a single character or object. The ability will inform you which of those things you can target. Some abilities instruct you to select multiple targets. When they do, all selected targets must be legal. Below is an example of one possible area that the ability could affect, highlighted in green. The purple hex indicates the hex chosen within the ability's range, the blue hex represents the origin hex, and the red hexes represent all legal target hexes in range.
        </p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/target-with-area.png" alt="An area centered on the blue hex. The purple hex represents one possible target hex and the green represents the area of the ability from the purple origin hex." />
        </figure>
    </section>
);

const Areas = () => (
    <section id={AreasLink.hash}>
        <h3>{AreasLink.name}</h3>
        <p>
            An area is just a bunch of hexes around a center hex or point. The ability will also define a radius, which determines how many hexes away from the center the ability affects. It will sometimes make sense for an ability to affect the space above the hexes too. It's difficult to figure out the volume of a sphere, so it's up to the GM to decide how to deal with it. Generally, it's better to use a cylinder, as described in the section on <Link to={CylindersLink.hash ?? ""}>cylinders</Link>, than a sphere in these cases.
        </p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/range-three.png" alt="Area with a radius of 3 hexes."
            />
            <figcaption>
                An area centered on the blue hex with a radius of 3 hexes. The blue and red hexes are affected by the ability.
            </figcaption>
        </figure>

        <p>
            Some areas do not specify a center hex and a radius but instead will simply say they occupy a number of hexes. When this occurs, you may choose any continuous set of hexes for the affected area.
        </p>
    </section>
);

const ThreeHexCircle = () => (
    <section id={ThreeHexCircleLink.hash}>
        <h3>{ThreeHexCircleLink.name}</h3>
        <p>
            Sometimes an ability will indicate it affects a "3-hex circle" (usually a grenade or mine). A 3-hex circle is any collection of 3 hexes that are all adjacent to each other. Below is an example of a 3-hex circle:
        </p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/3-hex-circle.png" alt="A 3 hex circle: 3 hexes all adjacent to one another." />
            <figcaption>A 3-hex circle.</figcaption>
        </figure>
        <p>
            If an ability instructs you to hit a target and the effect is a 3-hex circle, the circle is considered in-range if any of its affected hexes would be in range. If an ability instructs you to increase the size of a 3-hex circle by 1 or more hexes, increasing a 3-hex circle to a 1-hex radius circle counts as an increase of 1.
        </p>
    </section>
)

const Cylinders = () => (
    <section id={CylindersLink.hash}>
        <h3>{CylindersLink.name}</h3>
        <p>
            A cylinder is just like an area, except it also affects a distance above the hexes. In addition to the center and radius, a cylinder defines a height.
        </p>
    </section>
);

const Lines = () => (
    <section id={LinesLink.hash}>
        <h3>{LinesLink.name}</h3>
        <p>
            A line is a pattern that looks exactly like what you imagine! A line has a width, normally described in hexes, and a length, also described in hexes. An ability that might affect a line would usually be referenced as such: "Each character in a line of width 2 and length 8 takes 10 thermal damage." Below is an example of the area that would be affected by this ability, originating from the blue hex:
        </p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/line-width-2-length-8.png" alt="A line of width 2 and length 8"
            />
            <figcaption>A line of width 2 and length 8</figcaption>
        </figure>
        <p>
            Below is an example of a slightly different line, with width 1 and length 8:
        </p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/line-width-1-length-8.png" alt="A line of width 1 and length 8" />
            <figcaption>A line of width 1 and length 8</figcaption>
        </figure>
        <p>Here is another way to orient the above line:</p>
        <figure className="figure-bordered align-center">
            <img src="/public/assets/images/rules/line-width-1-length-8-alternate.png" alt="A line of width 1 and length 8 but oriented differently"
            />
            <figcaption>
                A line of width 1 and length 8 but oriented differently.
            </figcaption>
        </figure>
    </section>
);

const Cones = () => (
    <section id={ConesLink.hash}>
        <h3>{ConesLink.name}</h3>
        <p>
            A cone is a pattern that expands as it gets farther from the point of origin. A cone only has a length, and there are only 6 possible cones for any originating hex. Below is an example of a cone of length 6, one for each possible orientation:
        </p>
        <figure className="figure-group align-center" role="group">
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/cone-1.png" alt="The first possible cone" />
                <figcaption>The first possible cone.</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/cone-2.png" alt="The second possible cone" />
                <figcaption>The second possible cone.</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/cone-3.png" alt="The third possible cone" />
                <figcaption>The third possible cone.</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/cone-4.png" alt="The fourth possible cone" />
                <figcaption>The fourth possible cone.</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/cone-5.png" alt="The fifth possible cone" />
                <figcaption>The fifth possible cone.</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img src="/public/assets/images/rules/cone-6.png" alt="The sixth possible cone" />
                <figcaption>The sixth possible cone.</figcaption>
            </figure>
        </figure>
    </section>
);

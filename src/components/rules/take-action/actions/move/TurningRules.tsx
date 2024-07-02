import React from "react";
import { ArticleNavLink } from "../../../../articles/navigation/article-navigation/ArticleNavLink";

export const TurningRulesLink = new ArticleNavLink({
    name: 'Turning',
    path: '#Turning',
    render: () => <TurningRules />
});

export const TurningRules: React.FC = () => (
    <section id={TurningRulesLink.hash}>
        <h4>{TurningRulesLink.name}</h4>
        <p>
            For players turning is normally free: they may select any
            orientation they want to be in when entering a hex. However,
            vehicles require movement in order to turn. Rotating a vehicle by
            one face of the hex costs 1 movement. See below for an example of
            reorienting a character with 2 movement. In the first image, the
            character is facing the top right face (indicated with the red
            line), the character is facing the top left in the second image. To
            do this, they first reorient to the top face, spending 1 movement,
            then spend another movement to reorient facing the top left face.
        </p>
        <figure className="figure-group align-center" role="group">
            <figure className="figure-bordered">
                <img
                    src="/public/assets/images/rules/orientation-1.png"
                    alt="A character facing the top right of a hex"
                />
                <figcaption>Facing the top right of the hex</figcaption>
            </figure>
            <figure className="figure-bordered">
                <img
                    src="/public/assets/images/rules/orientation-2.png"
                    alt="A character facing the top left of a hex"
                />
                <figcaption>Facing the top left of the hex</figcaption>
            </figure>
        </figure>
    </section>
)
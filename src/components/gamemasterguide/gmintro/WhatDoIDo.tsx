import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";

export const WhatDoIDoGuideLink = new ArticleNavLink({
    name: "What Do I Do?",
    path: "#WhatDoIDo",
    render: () => <WhatDoIDoGuide />
})

const WhatDoIDoGuide = () => (
    <section id={WhatDoIDoGuideLink.hash} key={WhatDoIDoGuideLink.path}>
        <h2>{WhatDoIDoGuideLink.name}</h2>
        <p>
            
        </p>
    </section>
)
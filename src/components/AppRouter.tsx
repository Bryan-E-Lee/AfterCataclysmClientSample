import React from "react";
import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import configureAppStore from "../store/configureStore";
import { ApplicationState } from "../store/stores/ApplicationState";
import { ComingSoon } from "./ComingSoon";
import { Account } from "./account";
import { CreateName } from "./account/CreateName";
import { Profile } from "./account/Profile";
import { App } from "./app";
import { TableOfContents } from "./articles/TableOfContents";
import { Adventures } from "./collection/adventures";
import { AdventureComponent } from "./collection/adventures/AdventureComponent";
import { AdventureList } from "./collection/adventures/AdventureList";
import { JoinAdventure } from "./collection/adventures/JoinAdventure";
import { Characters } from "./collection/characters";
import { CharacterComponent } from "./collection/characters/CharacterComponent";
import { CharacterListComponent } from "./collection/characters/CharacterList";
import { ErrorPage } from "./errors/ErrorPage";
import { GameMasterGuide, GuideLinks } from "./gamemasterguide";
import { Library } from "./library";
import { LibraryRoutes } from "./library/navigation/LibraryRoutes";
import { Rules, RuleLinks } from "./rules";
import { Setting } from "./setting";
import { ArticleNavLink } from "./articles/navigation/article-navigation/ArticleNavLink";

const mapNavLinkToRouteObject = (link: ArticleNavLink, index?: number): RouteObject => ({
    path: link.path,
    element: link.render(index),
    children: link.sublinks.map(mapNavLinkToRouteObject)
})

export const AppRouter = createBrowserRouter([
    {
        path: "/*",
        element: <App />,
        children: [
            {
                path: "Error",
                element: <ErrorPage />
            },
            {
                path: "Setting",
                element: <Setting />
            },
            {
                path: "Rules/*",
                element: <Rules />,
                children: [
                    ...RuleLinks.map(mapNavLinkToRouteObject),
                    {
                        path: "TableOfContents",
                        element: <TableOfContents rootPath="Rules" contentName="Rules" links={RuleLinks} />
                    },
                    {
                        path: "*",
                        loader: () => redirect("TableOfContents")
                    }
                ]
            },
            {
                path: "Guide/*",
                element: <GameMasterGuide />,
                children: [
                    ...GuideLinks.map(mapNavLinkToRouteObject),
                    {
                        path: "TableOfContents",
                        element: <TableOfContents rootPath="Guide" contentName="Game Master's Guide" links={GuideLinks} />
                    },
                    {
                        path: "*",
                        loader: () => redirect("TableOfContents")
                    }
                ]
            },
            {
                path: "Library/*",
                element: <Library />,
                children: LibraryRoutes.map(mapNavLinkToRouteObject)
            },
            {
                path: "Profile/*",
                element: <Account />,
                children: [
                    {
                        path: "CreateName",
                        element: <CreateName />
                    },
                    {
                        path: "*",
                        element: <Profile />
                    },
                ]
            },
            {
                path: "Adventures/*",
                element: <Adventures />,
                children: [
                    {
                        path: ":inviteId/Join",
                        element: <JoinAdventure />
                    },
                    {
                        path: ":id",
                        element: <AdventureComponent />
                    },
                    {
                        path: "*",
                        element: <AdventureList />
                    }
                ]
            },
            {
                path: "Characters/*",
                element: <Characters />,
                children: [
                    {
                        path: ":id",
                        element: <CharacterComponent />
                    },
                    {
                        path: "*",
                        element: <CharacterListComponent />
                    }
                ]
            },
            {
                path: "ComingSoon",
                element: <ComingSoon />,
            },
        ]
    },
]);
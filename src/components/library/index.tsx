import './library.scss';
import * as React from 'react';
import { LibraryRoutes } from './navigation/LibraryRoutes';
import { Link } from "react-router-dom";
import { Route, Routes } from 'react-router';

export const Library = () => {
    return (
        <main className="game-info-page">
            <div className="contents">
                <article className="library">
                    <Routes>
                        {LibraryRoutes.map((route, index) => {
                            if (route.render != null) {
                                return <Route key={route.path} path={`${route.path}/*`} element={route.render(index)} />;
                            }
                        })}
                        <Route path="*" element={<LibraryButtons />} />
                    </Routes>
                </article>
            </div>
        </main>
    );
}

const LibraryButtons = () => (
    <>
        {LibraryRoutes.map(route => (
            <Link key={route.path} className="big-nav-button" to={route.path}>{route.name}</Link>
        ))}
    </>);

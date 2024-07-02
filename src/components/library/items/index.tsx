import React from 'react';
import { ItemsView } from '../../characters/items/ItemsView';
import { Breadcrumbs } from '../navigation/BreadCrumbs';
import { ItemsRoute, LibraryRootRoute } from '../navigation/LibraryRoutes';
import { ItemViewer } from './ItemViewer';
import { Route, Routes } from 'react-router';

export const ItemsLibrary: React.FC = () => {
    return (
        <Routes>
            <Route path=":name" element={<ItemViewer />} />
            <Route path="*" element={<LibraryItemsView />} />
        </Routes>
    );
}

const LibraryItemsView = () => (
    <>
        <Breadcrumbs crumbs={[LibraryRootRoute, LibraryRootRoute.GetAsChild(ItemsRoute)]} />
        <h1>Items</h1>
        <ItemsView useRoute />
    </>
)
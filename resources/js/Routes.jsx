import {useRoutes} from "react-router-dom";
import {lazy} from "react";

import MainLayout from "./layouts/MainLayout";
import Loader from "./components/Loader";

// LoadComponent function: performs lazy loading of a component using the Loader component
const LoadComponent = (name, ns) => {
    return Loader(lazy(() => import(`./components/${ns}/${name}.jsx`).then(({default: name}) => ({default: name}))));
}

// Lazy loading of components using LoadComponent
const NoteMake = LoadComponent('NoteCreate', 'notes');
const NoteCreated = LoadComponent('NoteCreated', 'notes');
const NoteDeleted = LoadComponent('NoteDeleted', 'notes');
const NoteShow = LoadComponent('NoteShowConfirmation', 'notes');

// Defining routes
const MainRoutes = {
    element: <MainLayout/>, // Root component where child components will be displayed
    children: [
        {
            path: '', // Route for creating a new note
            element: <NoteMake/>
        },
        {
            path: 'created', // Route for displaying information about successful note creation and providing access to it
            element: <NoteCreated/>
        },
        {
            path: 'deleted', // Route for displaying a page after a note has been deleted by the user
            element: <NoteDeleted/>
        },
        {
            path: 'show/:id', // Route for displaying a specific note based on its identifier
            element: <NoteShow/>
        },
    ]
};

// Exporting Routes component using useRoutes
export const Routes = () => useRoutes([MainRoutes]);

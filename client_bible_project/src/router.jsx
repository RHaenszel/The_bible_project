import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import App from './App'
import SignUp from './components/SignUp';
import LogIn from './components/Login';
import { Home } from './components/Home';
import SearchResults from './components/SearchResults';
import BibleBrowse, { loaderBibleBrowse } from './components/BibleBrowse';
import Journal from './components/Journal';






const Router = createHashRouter([{

    path: '/',
    element: <App />,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: "/signup/",
            element: <SignUp />
        },
        {
            path: "/login/",
            element: <LogIn />
        },
        {
            path: "/search/",
            element: <SearchResults />
        },
        {
            path: "/browse/",
            element: <BibleBrowse />,
            // loader: loaderBibleBrowse
        },
        {
            path: "/journal/",
            element: <Journal />
        }



    ]


}]);


export default Router
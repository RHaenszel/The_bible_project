import { createHashRouter, createBrowserRouter } from 'react-router-dom';
import App from './App'
import SignUp from './components/SignUp';
import LogIn from './components/Login';




const Router = createHashRouter([{

    path: '/',
    element: <App />,
    children: [
        {
            index: true,
            element: <SignUp />
        },
        {
            path: "/login/",
            element: <LogIn />
        }



    ]


}]);


export default Router
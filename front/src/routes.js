import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useGlobalContext from './hooks/useGlobalContext';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Customers from './pages/Customers';
import Charges from './pages/Charges';

function ProtectedRoutes({ redirectTo }) {
    const { token } = useGlobalContext();

    return token ? <Outlet /> : <Navigate to={redirectTo} />
}

function HomeRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />

            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path='/home' element={<Home />} />
                <Route path='/customers' element={<Customers />} />
                <Route path='/charges' element={<Charges />} />
            </Route>
        </Routes>
    )
}

export default HomeRoutes;
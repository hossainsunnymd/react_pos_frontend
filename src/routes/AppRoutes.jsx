import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import Dashboard from '@/pages/DashboardPage'
import Users from '@/pages/users/Users'



const AppRoutes = () => {
    return (
        <div>
             <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/users" element={<Users/>} />
                </Route>
             </Routes>
        </div>
    );
};

export default AppRoutes;
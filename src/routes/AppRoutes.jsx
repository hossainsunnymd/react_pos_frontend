import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import Dashboard from '@/pages/DashboardPage'


const AppRoutes = () => {
    return (
        <div>
             <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Route>
             </Routes>
        </div>
    );
};

export default AppRoutes;
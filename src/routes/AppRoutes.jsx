import {Routes, Route} from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

const AppRoutes = () => {
    return (
        <div>
             <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
             </Routes>
        </div>
    );
};

export default AppRoutes;
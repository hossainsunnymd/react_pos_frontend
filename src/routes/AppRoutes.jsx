import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import Dashboard from '@/pages/DashboardPage'
import Users from '@/pages/users/Users'
import UserSave from '@/pages/users/UserSave'
import Customers from '@/pages/customers/Customers'
import CustomerSave from '@/pages/customers/CustomerSave'
import Categories from '@/pages/categories/Categories'
import CategorySave from '@/pages/categories/CategorySave'
import Products from '../pages/products/Products'
import ProductSave from '../pages/products/ProductSave'




const AppRoutes = () => {
    return (
        <div>
             <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/users" element={<Users/>} />
                    <Route path="/users/:id" element={<UserSave/>} />
                    <Route path="/customers" element={<Customers/>} />
                    <Route path="/customers/:id" element={<CustomerSave/>} />
                    <Route path="/categories" element={<Categories/>} />
                    <Route path="/categories/:id" element={<CategorySave/>} />
                    <Route path="/products" element={<Products/>} />
                    <Route path="/products/:id" element={<ProductSave/>} />
                </Route>
             </Routes>
        </div>
    );
};

export default AppRoutes;
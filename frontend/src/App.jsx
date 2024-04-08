import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ForgotPassword from './components/forgotPassword';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './components/ResetPassword';


export default function App() {
  return <BrowserRouter >
    {/*header*/}
    <ToastContainer/>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
      </Route>


      <Route element={<PrivateRoute />} >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<PrivateRoute />} >
        <Route path="/users" element={<Users />} />
      </Route>

      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>;

}

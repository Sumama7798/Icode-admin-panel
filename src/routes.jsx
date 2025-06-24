import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard";
import LoginPage from "./pages/LoginPage";
import { useUserHook } from "./hooks/useUserHook";

import Navbar from "./components/Navbar/Navbar";
import ManageUsersPage from "./pages/manageUserPage/ManageUsersPage.jsx";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Header from "./components/Header/Header.jsx";

import EditHomePage from "./createPages/editHomePage/EditHomePage";
import EditAboutPage from "./createPages/editAboutPage/EditAboutPage";
import EditBlogPage from "./createPages/editBlogPage/EditBlogPage"; // Fixed typo in component name
import EditServicesPage from "./createPages/editServicesPage/EditServicesPage";
import EditContactPage from "./createPages/editContactPage/EditContactPage";
import EditFooter from "./createPages/EditFooter/EditFooter";
import DashBoardPages from "./pages/dashboard/dashboardpages/DashBoardPages";


const AppRoutes = () => {
  const { user } = useUserHook(); // Access the user context
  const location = useLocation(); // Get the current route

  // Define routes where Navbar should not be displayed
  const noNavbarRoutes = ["/login"];

  return (
    <div className="relative left-auto flex-1 overflow-y-auto">
      {/* Conditionally render Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      {!noNavbarRoutes.includes(location.pathname) && <Header />}
      <Routes>
        {/* Protected route for authenticated users */}
        <Route path="/"                 element={!user ? <Navigate to="/login" /> : <DashBoard />} />
        <Route path="/dashboard/:page"  element={!user ? <Navigate to="/login" /> : <DashBoardPages />} />
        <Route path="/login"            element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/manage-users"     element={!user ? <Navigate to="/login" /> : <ManageUsersPage />} />
        <Route path="/profile"          element={!user ? <Navigate to="/login" /> : <ProfilePage />} />
        <Route path="/settings"         element={!user ? <Navigate to="/login" /> : <SettingsPage />} />

        {/* Create Page Routes */}
        <Route path="/editHomePage"     element={!user ? <Navigate to="/login" /> : <EditHomePage />} />
        <Route path="/editAboutPage"    element={!user ? <Navigate to="/login" /> : <EditAboutPage />} />
        <Route path="/editBlogPage"     element={!user ? <Navigate to="/login" /> : <EditBlogPage />} />
        <Route path="/editServicesPage" element={!user ? <Navigate to="/login" /> : <EditServicesPage />} />
        <Route path="/editContactPage"  element={!user ? <Navigate to="/login" /> : <EditContactPage />} />
        <Route path="/editFooter"       element={!user ? <Navigate to="/login" /> : <EditFooter />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

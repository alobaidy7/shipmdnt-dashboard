import Navbar from "./components/Navbar";
import LoggedNavbar from "./components/LoggedNavbar";
import LoginPage from "./Pages/Login Page/LoginPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import StatictisPage from "./Pages/Statictis Page/StatictisPage";
import UserManagePage from "./Pages/Users Page/UserManagePage";
import CustomersManagePage from "./Pages/Customers Page/CustomersManagePage";
import OrderManagePage from "./Pages/Orders Page/OrderManagePage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Outlet />
        <Routes>
          {!isAuth ? (
            <Route path="/" element={<Navbar />}>
              <Route index element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </Route>
          ) : (
            <Route path="/" element={<LoggedNavbar />}>
              <Route path="/" element={<StatictisPage />} />
              <Route path="/login" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<StatictisPage />} />

              <Route path="/users-management" element={<UserManagePage />}>
                <Route
                  path="/users-management/:id"
                  element={<UserManagePage />}
                />
              </Route>

              <Route
                path="/customers-management"
                element={<CustomersManagePage />}
              >
                <Route
                  path="/customers-management/*"
                  element={<CustomersManagePage />}
                />
              </Route>

              <Route path="/orders-management" element={<OrderManagePage />}>
                <Route
                  path="/orders-management/*"
                  element={<OrderManagePage />}
                />
              </Route>

              <Route path="/orders-management" element={<OrderManagePage />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

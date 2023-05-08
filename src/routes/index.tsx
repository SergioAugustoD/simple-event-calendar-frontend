import Layout from "Layout";
import useLogin from "hooks/useLogin";
import CreateEventPage from "pages/CreateEvent";
import CreateUserPage from "pages/CreateUser";
import EventListPage from "pages/EventList";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/events" element={<EventListPage />} />
      <Route path="/create-event" element={<CreateEventPage />} />
    </Routes>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<CreateUserPage />} />
    </Routes>
  );
};

export const Router = () => {
  const { session } = useLogin();

  return (
    <BrowserRouter>
      {localStorage.getItem("token") ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  );
};

export default Router;

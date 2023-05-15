import useLogin from "hooks/useLogin";
import Layout from "Layout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LazyAboutPage = lazy(() => import("pages/About"));
const LazyCreateEventPage = lazy(() => import("pages/CreateEvent"));
const LazyCreateUserPage = lazy(() => import("pages/CreateUser"));
const LazyEventDetailPage = lazy(() => import("pages/DetailEvent"));
const LazyEventListPage = lazy(() => import("pages/EventList"));
const LazyForgotPassword = lazy(() => import("pages/ForgotPass"));
const LazyLoginPage = lazy(() => import("pages/Login"));
const LazyResetPassword = lazy(() => import("pages/ResetPassword"));
const LazyEventConfirmation = lazy(() => import("pages/EventConfirmation"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<LazyEventListPage />} />
      <Route path="/events/*" element={<LazyEventListPage />} />
      <Route path="/create-event" element={<LazyCreateEventPage />} />
      <Route path="/event-detail/:id" element={<LazyEventDetailPage />} />
      <Route path="/events-confirmation" element={<LazyEventConfirmation />} />
      <Route path="/about" element={<LazyAboutPage />} />
    </Routes>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<LazyLoginPage />} />
      <Route path="/login" element={<LazyLoginPage />} />
      <Route path="/signup" element={<LazyCreateUserPage />} />
      <Route path="/forgot-password" element={<LazyForgotPassword />} />
      <Route path="/reset-password" element={<LazyResetPassword />} />
    </Routes>
  );
};

export const Router = () => {
  const { session } = useLogin();

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {localStorage.getItem("token") ? (
          <Layout>
            <AppRoutes />
          </Layout>
        ) : (
          <AuthRoutes />
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;

import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./componenets/common/LoadingSpinner";
import RightPanel from "./componenets/common/RightPanel";
import Sidebar from "./componenets/common/Sidebar";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";
import Notification from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg"></LoadingSpinner>
      </div>
    );
  }
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {authUser && <Sidebar></Sidebar>}
        <Routes>
          <Route
            path="/"
            element={
              authUser ? (
                <HomePage></HomePage>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              !authUser ? <LoginPage></LoginPage> : <Navigate to="/"></Navigate>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              !authUser ? (
                <SignUpPage></SignUpPage>
              ) : (
                <Navigate to="/"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/notifications"
            element={
              authUser ? (
                <Notification></Notification>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/profile/:username"
            element={
              authUser ? (
                <ProfilePage></ProfilePage>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
        </Routes>
        {authUser && <RightPanel></RightPanel>}
        <Toaster></Toaster>
      </div>
    </>
  );
}

export default App;

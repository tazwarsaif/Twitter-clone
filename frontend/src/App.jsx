import { Route, Routes } from "react-router-dom";
import RightPanel from "./componenets/common/RightPanel";
import Sidebar from "./componenets/common/Sidebar";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";
import Notification from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
function App() {
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
          <Route
            path="/notifications"
            element={<Notification></Notification>}
          ></Route>
          <Route
            path="/profile/:username"
            element={<ProfilePage></ProfilePage>}
          ></Route>
        </Routes>
        <RightPanel></RightPanel>
      </div>
    </>
  );
}

export default App;

import { useContext } from "react";
import { themeContext } from "./Contexts/themeContext";
import Signup from "./Auth/Signup/Signup";
import { Route, Routes } from "react-router-dom";
import Signin from "./Auth/Signin/Signin";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./Route/PrivateRoute";
import RestrictedRoute from "./Route/RestrictedRoute";

function App() {
  const chosenTheme = useContext(themeContext);

  return (
    <div
      className="min-h-screen w-full bg-[var(--background)] flex flex-col"
      data-theme={chosenTheme?.theme}
    >
      <Routes>
        <Route
          loader={false}
          path="/signup"
          element={<RestrictedRoute Component={<Signup />} />}
        />
        <Route
          loader={false}
          path="/signin"
          element={<RestrictedRoute Component={<Signin />} />}
        />
        <Route
          loader={false}
          path="/"
          element={
            <PrivateRoute redirectTo="/signin" Component={<Dashboard />} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

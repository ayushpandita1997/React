import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { store } from "./store/appStore";
import { Provider } from "react-redux";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

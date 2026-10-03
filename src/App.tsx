import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router";
import Signin from "./Signin";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Pass from "./pages/Pass";
import Tests from "./pages/Tests";
import TestSeriesDetails from "./pages/TestSeriesDetails";
import TestPage from "./pages/TestPage";
import Result from "./pages/Result";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/pass" element={<Pass />} />
            <Route path="/test/:id" element={<TestPage />} />
            <Route path="/series/:id" element={<TestSeriesDetails />} />
            <Route path="/result" element={<Result />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
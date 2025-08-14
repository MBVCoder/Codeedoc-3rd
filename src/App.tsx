import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@screens/Login";
import Home from "@screens/Home";
import ProtectedRoute from "@config/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import MainLayout from "@components/Mainlayout";
import ModelDetail from "@screens/Modeldetail";
import ModelDescription from "@screens/ModelDescription";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/model/:id/description"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ModelDescription />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/model/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ModelDetail />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

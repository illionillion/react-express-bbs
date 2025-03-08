import { Home } from "./routes/Home";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { AuthContext, useAuthContext } from "./contexts/auth-context";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { MyPage } from "./routes/MyPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const ctx = useAuthContext(AuthContext);
  const queryClient = new QueryClient();
  const { userData } = ctx;
  const isLogin = !!userData.userId || !!userData.userName;

  return (
    <AuthContext.Provider value={ctx}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <main>
              <div className="main__inner">
                <Routes>
                  <Route
                    path="/"
                    element={isLogin ? <Home /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/my-page"
                    element={isLogin ? <MyPage /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/login"
                    element={isLogin ? <Navigate to="/" /> : <Login />}
                  />
                  <Route
                    path="/register"
                    element={isLogin ? <Navigate to="/" /> : <Register />}
                  />
                  <Route path="*" element={<h1>Not Found Page</h1>} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;

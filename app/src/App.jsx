import { Home } from "./routes/Home";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { AuthContext, useAuthContext } from "./contexts/auth-context";
import { Login } from "./routes/Login";

function App() {
  const ctx = useAuthContext(AuthContext);
  const { userData } = ctx
  const isLogin = !!userData.userId || !!userData.userName;

  return (
    <AuthContext.Provider value={ctx}>
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
                  element={
                    isLogin ? <h1>マイページ</h1> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/login"
                  element={isLogin ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/register"
                  element={isLogin ? <Navigate to="/" /> : <h1>登録</h1>}
                />
                <Route path="*" element={<h1>Not Found Page</h1>} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;

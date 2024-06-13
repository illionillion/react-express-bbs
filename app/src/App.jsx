import { Home } from "../routes/Home";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <div className="main__inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-page" element={<h1>マイページ</h1>} />
              <Route path="/signin" element={<h1>サインイン</h1>} />
              <Route path="*" element={<h1>Not Found Page</h1>} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

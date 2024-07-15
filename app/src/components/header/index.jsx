import { Link } from "react-router-dom";
import "./index.css";
import { AuthContext } from "../../contexts/auth-context";
import { useContext } from "react";

export const Header = () => {
  const { userData, onSignout } = useContext(AuthContext);

  const isLogin = !!userData.userId || !!userData.userName;

  const handleLogout = async () => {
    onSignout()
  }

  return (
    <header>
      <div className="header__inner">
        <h1>
          <Link to="/">掲示板</Link>
        </h1>
        <nav className="header__nav">
          {isLogin ? (
            <ul>
              <li>
                <Link to="/">ホーム</Link>
              </li>
              <li>
                <Link to="/my-page">マイページ</Link>
              </li>
              <li>
                <button onClick={handleLogout}>ログアウト</button>
              </li>
            </ul>
          ) : undefined}
        </nav>
      </div>
    </header>
  );
};

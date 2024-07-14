import { Link } from "react-router-dom";
import "./index.css";
import { AuthContext, useAuthContext } from "../../contexts/auth-context";

export const Header = () => {
  const { userData } = useAuthContext(AuthContext);

  const isLogin = !!userData.userId || !!userData.userName;

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
            </ul>
          ) : undefined}
        </nav>
      </div>
    </header>
  );
};

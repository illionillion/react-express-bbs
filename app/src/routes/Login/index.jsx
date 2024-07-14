import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../contexts/auth-context";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { onSignin } = useAuthContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_PROXY_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      }
    );
    if (response.ok) {
        const data = await response.json()
        onSignin({
            userId: data.userId,
            userName: data.userName,
        })
    }
  };

  return (
    <div className="login">
      <h3>ログイン</h3>
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="form-control">
          <label htmlFor="userName">ユーザー名</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
            id="userName"
            placeholder="ユーザー名を入力"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            id="password"
            placeholder="パスワードを入力"
          />
        </div>
        <div className="form-control">
          <Link to="/register">新規登録</Link>
        </div>
        <div className="form-control">
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};

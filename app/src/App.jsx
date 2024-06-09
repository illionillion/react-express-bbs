import "./App.css";
import { useState } from "react";
import { Header } from "./components/header";
import { TimelineItem } from "./components/timeline-item";

function App() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  return (
    <div className="App">
      <Header />
      <main>
        <div className="main__inner">
          <form
            className="userForm"
            onSubmit={(e) => {
              e.preventDefault();
              if (!userName || !userEmail || !content) {
                return
              }
              setPosts([...posts, {userName, userEmail, content}])
              setUserName("")
              setUserEmail("")
              setContent("")
            }}
          >
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
              <label htmlFor="userEmail">メールアドレス</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.currentTarget.value)}
                id="userEmail"
                placeholder="メールアドレスを入力"
              />
            </div>
            <div className="form-control">
              <label htmlFor="content">内容</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                placeholder="内容を入力"
              ></textarea>
            </div>
            <div className="form-control">
              <button type="submit">投稿</button>
            </div>
          </form>
        </div>
        <div className="timeline">
          <div className="timeline__inner">
            <h3>投稿一覧</h3>
            <div className="timeline__list">
              {posts.length === 0 ? <p>投稿がりません</p> : posts.map((post, index) => (
                <TimelineItem userName={post.userName} content={post.content} key={index} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

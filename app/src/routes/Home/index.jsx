import { useContext, useEffect, useState } from "react";
import { TimelineItem } from "../../components/timeline-item";
import "./index.css";
import { AuthContext } from "../../contexts/auth-context";

export const Home = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROXY_URL}/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.userId,
            content,
          }),
        }
      );

      if (response.ok) {
        setPosts([...posts, { userId: userData.userId, userName: userData.userName, content }]);
        setContent("");
        console.log("成功");
      } else {
        console.log("失敗");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROXY_URL}/api/post`
      );
      if (response.ok) {
        const { posts } = await response.json();
        setPosts(posts);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <form className="userForm" onSubmit={handleSubmit}>
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
      <div className="timeline">
        <div className="timeline__inner">
          <h3>投稿一覧</h3>
          <div className="timeline__list">
            {posts.length === 0 ? (
              <p>投稿がりません</p>
            ) : (
              posts.map((post, index) => (
                <TimelineItem
                  userName={post.userName}
                  content={post.content}
                  key={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

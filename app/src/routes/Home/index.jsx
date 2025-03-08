import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TimelineItem } from "../../components/timeline-item";
import "./index.css";
import { AuthContext } from "../../contexts/auth-context";

export const Home = () => {
  const [content, setContent] = useState("");
  const { userData } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // 投稿の送信（useMutation）
  const mutation = useMutation({
    mutationFn: async (content) => {
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
      if (!response.ok) throw new Error("投稿失敗");
      return await response.json();
    },
    onSuccess: () => {
      // 投稿後にキャッシュを更新（再取得）
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // 投稿を取得するためのuseQuery
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_PROXY_URL}/api/post`
      );
      if (!response.ok) throw new Error("データ取得失敗");
      const { posts } = await response.json();
      return posts;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    // 投稿送信
    mutation.mutate(content);
    setContent(""); // フォームをリセット
  };

  if (error instanceof Error) return <p>エラー: {error.message}</p>;

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
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "投稿中..." : "投稿"}
          </button>
        </div>
      </form>
      <div className="timeline">
        <div className="timeline__inner">
          <h3>投稿一覧</h3>
          <div className="timeline__list">
            {isLoading ? (
              <p>読み込み中...</p>
            ) : posts.length === 0 ? (
              <p>投稿がありません</p>
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

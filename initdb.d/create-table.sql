-- Windows環境で文字化け表示のために必要
SET CHARACTER SET utf8mb4;

-- 投稿テーブル
create table posts (
    post_id int auto_increment primary key,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    content varchar(255) not null,
    posted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Windows環境で文字化け表示のために必要
SET CHARACTER SET utf8mb4;

-- ユーザーテーブル
create table users (
    user_id int auto_increment primary key,
    user_name varchar(255) unique key not null,
    user_email varchar(255) unique key not null,
    password varchar(255) not null
);

insert into users (user_name, user_email, password) values 
('John', 'john@email.com', SHA2('password', 256));

-- 投稿テーブル
create table posts (
    post_id int auto_increment primary key,
    user_id int not null,
    content varchar(255) not null,
    posted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
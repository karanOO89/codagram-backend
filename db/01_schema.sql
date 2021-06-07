DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS user_followers CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts_comments CASCADE;
DROP TABLE IF EXISTS dm_rooms CASCADE;
DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  created TIMESTAMP,
  avatar_url VARCHAR(255) NOT NULL,
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (user_id) INTEGER REFERENCES users(id),
  type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  total_likes INTEGER,
  total_comments INTEGER,
  parent_post_id INTEGER
);

CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (user_id) INTEGER REFERENCES users(id),
  FOREIGN KEY (post_id) INTEGER REFERENCES posts(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE post_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (user_id) INTEGER REFERENCES users(id),
  FOREIGN KEY (post_id) INTEGER REFERENCES posts(id),
  comments VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


CREATE TABLE user_followers (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (user_id) INTEGER REFERENCES users(id),
  follower_id INTEGER,
  updated_at TIMESTAMP,
  created TIMESTAMP
);


CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (user_id) INTEGER REFERENCES users(id),
  FOREIGN KEY (room_id) INTEGER REFERENCES dm_rooms(id),
  message VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE dm_rooms (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (user1_id) INTEGER REFERENCES users(id),
  FOREIGN KEY (user2_id) INTEGER REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);




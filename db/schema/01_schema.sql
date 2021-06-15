-- DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_followers CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS post_comments CASCADE;
DROP TABLE IF EXISTS dm_rooms CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS fork_posts CASCADE;




-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   avatar_url VARCHAR(255) NOT NULL
-- );

CREATE TABLE posts(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image_url VARCHAR(255),
  tags VARCHAR(255),
  post_text TEXT NOT NULL,
  code TEXT,
  redirect_code TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  favourite BOOLEAN DEFAULT NULL,
  total_comments INTEGER,
  parent_post_id INTEGER NULL,
  trending_comment TEXT DEFAULT NULL ,
  search_vector TSVECTOR
);

CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE post_comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  code TEXT,
  image_url VARCHAR(255),
  votes SMALLINT NOT NULL DEFAULT 0,
  vote_state BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE user_followers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  follower_id INTEGER,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE dm_rooms (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


-- select post_comments.post_id,post_comments.id,post_comments.votes from post_comments 
-- join posts on post_id = posts.id
-- where posts.id=1 and post_comments.votes >= 
-- (select MAX(post_comments.votes) from post_comments
-- where post_id = 1);


CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dm_room_id INTEGER REFERENCES dm_rooms(id) ON DELETE CASCADE,
  msg VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE fork_posts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


-- CREATE TABLE tags (
--   id SERIAL PRIMARY KEY NOT NULL,
--   tagname VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE tag_post_relations (
--   id SERIAL PRIMARY KEY NOT NULL,
--   post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
--   tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
-- );






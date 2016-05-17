CREATE TABLE users (
       users_id SERIAL UNIQUE PRIMARY KEY,
       email VARCHAR(255),
       password_digest TEXT
);

CREATE TABLE searches (
        searches_id SERIAL UNIQUE PRIMARY KEY,
        latitude DECIMAL,
        longitude DECIMAL,
        user_id INTEGER
);

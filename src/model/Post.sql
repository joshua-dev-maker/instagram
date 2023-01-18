CREATE TABLE post(
    media text[] NOT NULL,
    caption VARCHAR(100),
    author VARCHAR(50) REFERENCES users (username),
    likes text[],
    comments json,
    id BIGSERIAL PRIMARY KEY

)
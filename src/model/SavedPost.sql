CREATE TABLE savedpost(
    owner VARCHAR(50) NOT NULL REFERENCES users(username),
    post BIGINT REFERENCES post(id),
    id BIGSERIAL NOT NULL PRIMARY KEY

)
CREATE TABLE users(
    username VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    bio varchar(150) NOT NULL,
    following text[],
    followers text[],
    profile VARCHAR(225)
);
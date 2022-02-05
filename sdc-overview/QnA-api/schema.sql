DROP DATABASE IF EXISTS questionsAndAnswers;

CREATE DATABASE questionsAndAnswers;

USE questionsAndAnswers;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    body VARCHAR(300) NOT NULL,
    productID INT NOT NULL,
    postedTime TIMESTAMP NOT NULL,
    askerName VARCHAR NOT NULL,
    askerEmail VARCHAR NOT NULL,
    helpfulness INTEGER DEFAULT 0,
    timesReported INT DEFAULT 0
);

CREATE TABLE answers (
    id BIGSERIAL PRIMARY KEY,
    body VARCHAR(300) NOT NULL,
    postedTime TIMESTAMP NOT NULL,
    answererName VARCHAR NOT NULL,
    answererEmail VARCHAR NOT NULL,
    helpfulness INTEGER DEFAULT 0,
    timesReported INT DEFAULT 0,
    id_questions INT NOT NULL,
    CONSTRAINT fk_questions
        FOREIGN KEY(id_questions)
            REFERENCES questions(id)
);

CREATE TABLE photos (
    id BIGSERIAL PRIMARY KEY,
    link VARCHAR(70),
    id_answers INT,
    CONSTRAINT fk_answers
        FOREIGN KEY(id_answers)
            REFERENCES answers(id)
);



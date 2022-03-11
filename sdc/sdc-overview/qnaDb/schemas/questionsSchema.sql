
CREATE DATABASE questionsandanswers;

USE DATABASE questionsandanswers;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;



CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    body VARCHAR(300) NOT NULL,
    date_written_secs BIGINT NOT NULL,
    asker_name VARCHAR(60) NOT NULL,
    asker_email VARCHAR(60) NOT NULL,
    reported INT DEFAULT 0,
    helpful INTEGER DEFAULT 0
);



CREATE TABLE answers (
    id BIGSERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    body VARCHAR(300) NOT NULL,
    date_written_secs BIGINT NOT NULL,
    answerer_name VARCHAR(60) NOT NULL,
    answerer_email VARCHAR(60) NOT NULL,
    reported INT DEFAULT 0,
    helpful INTEGER DEFAULT 0,
    CONSTRAINT fk_questions
        FOREIGN KEY(question_id)
            REFERENCES questions(id)
);

CREATE TABLE photos (
    id BIGSERIAL PRIMARY KEY,
    answer_id INT,
    url VARCHAR(200),
    CONSTRAINT fk_answers
        FOREIGN KEY(answer_id)
            REFERENCES answers(id)
);

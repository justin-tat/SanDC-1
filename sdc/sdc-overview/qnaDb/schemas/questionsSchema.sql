
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



ALTER TABLE questions 
ADD COLUMN dateString VARCHAR;

ALTER TABLE answers
ADD COLUMN dateString VARCHAR;

UPDATE questions
SET dateString = TO_TIMESTAMP(date_written_secs / 1000);

UPDATE answers
SET dateString = TO_TIMESTAMP(date_written_secs / 1000);

CREATE INDEX idx_questions_productId ON questions(product_id);


CREATE INDEX idx_questions_productId ON questions(product_id);
CREATE INDEX idx_answers_questionId ON answers(question_id);
CREATE INDEX idx_photos_answerId ON photos(answer_id);

ALTER SEQUENCE public.questions_id_seq RESTART WITH 3518964;
ALTER SEQUENCE public.answers_id_seq RESTART WITH 6879307;
ALTER SEQUENCE public.photos_id_seq RESTART WITH 2063760;
const express = require('express');

const qnaRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/qnaDb/index');

qnaRouter.use(express.json());
qnaRouter.use(bodyParser.urlencoded({ extended: false }));
qnaRouter.use(bodyParser.json());


qnaRouter.get('/', async (req, res) => {
    console.log('qna initial get');
    res.sendStatus(200);
});

//Create an index on product_id.
//Done
qnaRouter.get('/questions/:product_id', async (req, res) => {
    //console.log('Inside questions of qna.js of sdc');
    console.log('productID from questions: ', req.params.product_id);
    var id = req.params.product_id.split("product_id=")[1];
    db.db.query(`SELECT * FROM questions WHERE product_id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        console.log("Successfully found results");
        res.send(result.rows);
    });
});
//Done
qnaRouter.put('/questions/:id/helpful', async (req, res) => {
    console.log('Inside questions helpful');
    var id = req.params.id;
    db.db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = $1`, [id], (err) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        console.log('Successfully updated question helpfulness');
        res.send('Successfully updated question helpfulness of ' + req.params.id);
    });
});

//Done
qnaRouter.put('/answers/:id/helpful', async (req, res) => {
    console.log('Inside answers helpful sdc ');
    var id = req.params.id;
    db.db.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [id], (err) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        console.log('Successfully updated answer helpfulness');
        res.send('Successfully updated answer helpfulness of ' + id);
    });
});

//Done
qnaRouter.put('/answers/:id/report', async (req, res) => {
    console.log('Inside report answer sdc', req.params.id);
    var id = req.params.id;
    db.db.query('UPDATE answers SET reported = reported + 1 WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log('Errored while trying to update answers reportedness', err);
            res.status(400).send(err);
        }
        res.send('Successfully updated answer reportedness of ' + id);
    });
});

//Still need to configure dateString
qnaRouter.post('/questions', async (req, res) => {
    console.log('Inside questions post sdc', req.body);
    var productID = req.body.product_id;
    var body = req.body.body;
    var askName = req.body.name;
    var askEmail = req.body.email;
    var timestamp = Date.now();
    db.db.query(`SELECT max(id) FROM questions`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        var id = parseInt(result.rows[0].max);
        db.db.query(`INSERT INTO questions (id, product_id, body, date_written_secs, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, date_written_secs`, [id + 1, productID, body, timestamp, askName, askEmail ], (err, result) => {
            if (err) {
                console.log('Errored while trying to post new question', err);
                res.status(400).send(err);
            }
            var id = parseInt(result.rows[0].id);
            var time = parseInt(result.rows[0].date_written_secs);
            db.db.query(`UPDATE questions SET dateString = TO_TIMESTAMP(${time} / 1000) WHERE id = ${id}`, (err, result) => {
                if (err) {
                    console.log('Errored while trying to update time of ' + id, err);
                    res.status(400).send(err);
                }
                res.send('Successfully added question');
            })
        });
    });

    //res.sendStatus(200);
});

//Reconfigure variables. Figure out how to get question ID
qnaRouter.post('/questions/:questionId/answers', async (req, res) => {
    console.log('Inside answers post sdc', req.params);
    var questionID = parseInt(req.params.questionId);
    var body = req.body.body;
    var ansName = req.body.name;
    var ansEmail = req.body.email;
    var photos = req.body.photos;
    var timestamp = Date.now();

    db.db.query(`SELECT max(id) FROM answers`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        var id = parseInt(result.rows[0].max);
        db.db.query(`INSERT INTO answers (id, question_id, body, date_written_secs, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, date_written_secs`, [id + 1, questionID, body, timestamp, ansName, ansEmail], (err, result) => {
            if (err) {
                console.log('Errored while trying to post new question', err);
                res.status(400).send(err);
            }
            console.log('result', result);
            var id = parseInt(result.rows[0].id);
            var time = parseInt(result.rows[0].date_written_secs);
            db.db.query(`UPDATE questions SET dateString = TO_TIMESTAMP(${time} / 1000) WHERE id = ${id}`, (err, result) => {
                if (err) {
                    console.log('Errored while trying to update time of ' + id, err);
                    res.status(400).send(err);
                }
                db.db.query('SELECT max(id) FROM photos', (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    var photosId = parseInt(result.rows[0].max);
                    db.db.query(`INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3)`, [photosId + 1, id, photos], (err, result) => {
                        if (err) {
                            console.log('Errored while trying to insert photos', err);
                            res.status(400).send(err);
                        }
                        res.send('Successfully posted answer after updating photos');
                    } )
                })
            })
        });
    })
    // res.sendStatus(200);
});


module.exports = qnaRouter;
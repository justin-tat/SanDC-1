const express = require('express');

const qnaRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/qnaDb/index');

qnaRouter.use(express.json());
qnaRouter.use(bodyParser.urlencoded({extended: false}));
qnaRouter.use(bodyParser.json());


qnaRouter.get('/', async (req, res) => {
  console.log('qna initial get');
  res.sendStatus(200);
});

//Create an index on product_id.
qnaRouter.get('/questions/:product_id', async (req, res) => {
    //console.log('Inside questions of qna.js of sdc');
    console.log('productID from questions: ', req.params.product_id);
    var id = req.params.product_id.split("product_id=")[1];
    console.log('id', id);
    db.db.query(`SELECT * FROM questions WHERE product_id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        console.log("Successfully found results");
        console.log(result.rows[0]);
        res.sendStatus(200);
    });
});

qnaRouter.put('/questions/:id/helpful', async (req, res) => {
    console.log('Inside questions helpful');
    var id = '';
    db.db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = $1`, [id], (err, result) => {
        if(err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        console.log('Successfully updated question helpfulness');
        res.sendStatus(200);
    })
    res.sendStatus(200);
});

qnaRouter.put('/answers/:id/helpful', async (req, res) => {
    console.log('Inside answers helpful sdc ');
    db.db.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        console.log('Successfully updated answer helpfulness');
        res.sendStatus(200);
    });
});

qnaRouter.put('/answers/:id/report', async (req, res) => {
    console.log('Inside report answer sdc');
    var id = '';
    db.db.query('UPDATE answers SET reported = reported + 1 WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log('Errored while trying to update answers reportedness', err);
            res.status(400).send(err);
        }
        console.log('Successfully updated answer reportedness');
        res.sendStatus(200);
    });
});

qnaRouter.post('/questions', async (req, res) => {
    console.log('Inside questions post sdc');
    db.db.query('INSERT INTO questions ($1, $2, $3, $4, )', [productID, body, dateWritten, askName, askEmail,0, 0, dateString ], (err, result) => {
        if (err) {
            console.log('Errored while trying to post new question', err);
            res.status(400).send(err);
        }
        console.log('Successfully posted new question');
        res.sendStatus(200);
    })
});

qnaRouter.post('/questions/:questionId/answers', async (req, res) => {
    console.log('Inside answers post sdc');
    db.db.query('INSERT INTO answers ($1, $2, $3, $4, )', [productID, body, dateWritten, ansName, ansEmail, 0, 0, dateString ], (err, result) => {
        if (err) {
            console.log('Errored while trying to post new answer', err);
            res.status(400).send(err);
        }
        console.log('Successfully posted new question');
        res.sendStatus(200);
    })
    res.sendStatus(200);
});


module.exports = qnaRouter;
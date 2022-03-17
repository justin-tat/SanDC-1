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

//Done
//originalUrl: '/qna/getQuestionsList?id=64621',
qnaRouter.get('/getQuestionsList', async (req, res) => {
    var stringId = req.query.id;
    var id = parseInt(stringId);
    //console.log(req);
    db.db.query(`SELECT * FROM questions WHERE product_id = $1`, [id])
    .then(questions => {
        var returnedObject = {product_id: stringId, results: []};
        for (var i = 0; i < questions.rows.length; i++) {
            questions.rows[i].question_id = parseInt(questions.rows[i].id);
            questions.rows[i].question_body = questions.rows[i].body;
            questions.rows[i].question_date = new Date(parseInt(questions.rows[i].date_written_secs));
            questions.rows[i].question_helpfulness = questions.rows[i].helpful;
            questions.rows[i].reported = questions.rows[i].reported === 0 ? false : true;
            delete questions.rows[i].id;
            delete questions.rows[i].body;
            delete questions.rows[i].date_written_secs;
            delete questions.rows[i].helpful;
            delete questions.rows[i].product_id;
            delete questions.rows[i].asker_email;
            delete questions.rows[i].datestring;
            questions.rows[i].answers = {};
        }
        returnedObject.results = questions.rows;
        return returnedObject;
    })
    .then(retObject => {
        var promisesArray = [retObject];
        for (var i = 0; i < retObject.results.length; i++) {
            promisesArray.push(db.db.query(`SELECT * FROM answers WHERE question_id = $1`, [retObject.results[i].question_id]));
        }
        return Promise.all(promisesArray);
    })
    .then(qna => {
        var retObj = qna[0];
        qna.shift();
        var photos = [];
        retObj.answerIds = [];
        for(var i = 0; i < qna.length; i++) {
            qna[i] = qna[i].rows;
            for (var j = 0; j < qna[i].length; j++) {
                //retObj.answerIds.push(qna[i][j].id);
                for (var k = 0; k < retObj.results.length; k++) {
                    if (retObj.results[k].question_id === qna[i][j].question_id) {
                        retObj.results[k].answers[parseInt(qna[i][j].id)] = {
                            id : parseInt(qna[i][j].id),
                            body: qna[i][j].body,
                            date : new Date(parseInt(qna[i][j].date_written_secs)),
                            answerer_name : qna[i][j].answerer_name,
                            helpfulness : qna[i][j].helpful,
                            photos : []
                        }
                    }
                }
                photos.push(db.db.query(`SELECT * FROM photos WHERE answer_id = $1`, [parseInt(qna[i][j].id)]));
            }
        }
        photos.push(retObj);
        return Promise.all(photos);
    })
    .then(photos => {
        var retObj = photos.pop();
        var relevantPhotos = [];
        for(var i = 0; i < photos.length; i++) {
            photos[i] = photos[i].rows;
            for (var j = 0; j < photos[i].length; j++) {
                if (photos[i][j].length !== 0) {
                    relevantPhotos.push(photos[i][j]);
                }
            }
        }
        //Iterate through all of your results
        for (var a = 0; a < retObj.results.length; a++) {
            //Iterate through retObj.results[a].answers looking at each of the answer Ids whcih is stored as a key in answers
            for (var key in retObj.results[a].answers) {
                var photosUrls = [];
                //Iterate through relevantPhotos to look at what photos actually exist for all the given answer ids
                for (var i = 0; i < relevantPhotos.length; i++) {
                    //Executed if you find an answer key which matches up with the answerId from the relevant photo
                    if (parseInt(key) === relevantPhotos[i].answer_id) {
                        photosUrls.push(relevantPhotos[i].url);
                    }
                }
                //After iterating through all of the relevant photos, assign the relevant photo urls to that object. 
                retObj.results[a].answers[key].photos = photosUrls;
            }
        }
        res.send(retObj);
    })
    .catch(err => {
        console.log('Errored while trying to fetch questions: ', err);
        res.status(400).send(err);
    })
});

//Done after FE refactoring
qnaRouter.put('/updateQuestionHelp', async (req, res) => {
    var id = req.body.params.questionId;
    //console.log(req);
    console.log('questionId', req.body.params.questionId);
    console.log('productId', req.body.params.productId);
    db.db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = $1`, [id], (err) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        console.log('Successfully updated question helpfulness of ' + req.body.params.questionId)
        //res.send('Successfully updated question helpfulness of ' + req.params.id);
        res.redirect(303, `getQuestionsList?id=${req.body.params.productId}`);
        //next();
    });
});
//Done after FE refactoring
qnaRouter.put('/updateAnswerHelp', async (req, res) => {
    var id = req.params.id;
    id = req.body.params.answerId;

    db.db.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [id], (err) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        res.redirect(303, `getQuestionsList?id=${req.body.params.productId}`);
    });
});

//Done after FE Refactor
qnaRouter.put('/reportAnswer', async (req, res) => {
    var id = req.params.id;
    id = req.body.params.productId;
    db.db.query('UPDATE answers SET reported = reported + 1 WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log('Errored while trying to update answers reportedness', err);
            res.status(400).send(err);
        }
        //Status must be 303 to allow redirect to get request
        res.redirect(303, `getQuestionsList?id=${req.body.params.productId}`);
    });
});

//Done after FE Refactor
qnaRouter.post('/addNewQuestion', async (req, res) => {
    var productID = req.body.params.id;
    var body = req.body.params.body;
    var askName = req.body.params.name;
    var askEmail = req.body.params.email;
    var timestamp = Date.now();
    db.db.query(`INSERT INTO questions ( product_id, body, date_written_secs, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5) RETURNING id, date_written_secs`, [ productID, body, timestamp, askName, askEmail ])
    .then((result) => {
        //res.send('Successfully added question: ' + result.rows[0].id);
        console.log('Successfully added question');
        res.redirect(303, `getQuestionsList?id=${req.body.params.id}`);
    })
    .catch(err => {
        console.log('Errored while trying to add question', err);
        res.status(400).send(err);
    });

});

//Done
qnaRouter.post('/addNewAnswer', async (req, res) => {
    var questionID = req.body.params.id;
    var body = req.body.params.body;
    var ansName = req.body.params.name;
    var ansEmail = req.body.params.email;
    var photos = req.body.params.photos;
    var timestamp = Date.now();
    var aId = -1;
        return db.db.query(`INSERT INTO answers (question_id, body, date_written_secs, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5) RETURNING id, date_written_secs`, [questionID, body, timestamp, ansName, ansEmail])
        .then((result) => {
            aId = parseInt(result.rows[0].id);
            return db.db.query(`INSERT INTO photos (answer_id, url) VALUES ($1, $2)`, [aId, photos]);
        })
        .then(() => {
            //res.send('Successfully posted answer after updating photos');
            res.redirect(303, `getQuestionsList?id=${req.body.params.productId}`);
        })
        .catch(err => {
            console.log('Errored while trying to add answer', err);
            res.status(400).send(err);
        })
});


module.exports = qnaRouter;
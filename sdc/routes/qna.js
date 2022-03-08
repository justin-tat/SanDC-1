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
qnaRouter.get('/questions/:product_id', async (req, res) => {
    var stringId = req.params.product_id.split("product_id=")[1]
    var id = parseInt(stringId);
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
//Done
qnaRouter.put('/questions/:id/helpful', async (req, res) => {
    var id = req.params.id;
    db.db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = $1`, [id], (err) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        res.send('Successfully updated question helpfulness of ' + req.params.id);
    });
});

//Done
qnaRouter.put('/answers/:id/helpful', async (req, res) => {
    var id = req.params.id;
    db.db.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', [id], (err) => {
        if (err) {
            console.log('Errored while trying to update answers helpful', err);
            res.status(400).send(err);
        }
        res.send('Successfully updated answer helpfulness of ' + id);
    });
});

//Done
qnaRouter.put('/answers/:id/report', async (req, res) => {
    var id = req.params.id;
    db.db.query('UPDATE answers SET reported = reported + 1 WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log('Errored while trying to update answers reportedness', err);
            res.status(400).send(err);
        }
        res.send('Successfully updated answer reportedness of ' + id);
    });
});

qnaRouter.post('/questions', async (req, res) => {
    var productID = req.body.product_id;
    var body = req.body.body;
    var askName = req.body.name;
    var askEmail = req.body.email;
    var timestamp = Date.now();
    // console.log(productID);
    // Before autoincrement refactor
    // db.db.query(`SELECT max(id) FROM questions`)
    // .then(max => {
    //     var qId = parseInt(max.rows[0].max);
    //     return qId;
    // })
    // .then(qId => {
    //     return db.db.query(`INSERT INTO questions ( product_id, body, date_written_secs, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5) RETURNING id, date_written_secs`, [ productID, body, timestamp, askName, askEmail ])
    // })
    
    // .then(result => {
    //     var id = parseInt(result.rows[0].id);
    //     var time = parseInt(result.rows[0].date_written_secs);
    //     return db.db.query(`UPDATE questions SET dateString = TO_TIMESTAMP(${time} / 1000) WHERE id = ${id}`);
    // })
    // .then((result) => {
    //     res.send('Successfully added question: ' + result.rows[0].id);
    // })
    // .catch(err => {
    //     console.log('Errored while trying to add question', err);
    //     res.status(400).send(err);
    // })

        //After Autoincrement Refactor
        db.db.query(`INSERT INTO questions ( product_id, body, date_written_secs, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5) RETURNING id, date_written_secs`, [ productID, body, timestamp, askName, askEmail ])
        .then((result) => {
            res.send('Successfully added question: ' + result.rows[0].id);
        })
        .catch(err => {
            console.log('Errored while trying to add question', err);
            res.status(400).send(err);
        })

});

//Done
qnaRouter.post('/questions/:questionId/answers', async (req, res) => {
    var questionID = parseInt(req.params.questionId);
    var body = req.body.body;
    var ansName = req.body.name;
    var ansEmail = req.body.email;
    var photos = req.body.photos;
    var timestamp = Date.now();
    var aId = -1;
    //Before auto-increment Refactor of answers.id and photos.id
    // db.db.query(`SELECT max(id) FROM answers`, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err);
    //     }
    //     var id = parseInt(result.rows[0].max);
    //     db.db.query(`INSERT INTO answers (id, question_id, body, date_written_secs, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, date_written_secs`, [id + 1, questionID, body, timestamp, ansName, ansEmail], (err, result) => {
    //         if (err) {
    //             console.log('Errored while trying to post new question', err);
    //             res.status(400).send(err);
    //         }
    //         var id = parseInt(result.rows[0].id);
    //         var time = parseInt(result.rows[0].date_written_secs);
    //         db.db.query(`UPDATE answers SET dateString = TO_TIMESTAMP(${time} / 1000) WHERE id = ${id}`, (err, result) => {
    //             if (err) {
    //                 console.log('Errored while trying to update time of ' + id, err);
    //                 res.status(400).send(err);
    //             }
    //             db.db.query('SELECT max(id) FROM photos', (err, result) => {
    //                 if (err) {
    //                     console.log(err);
    //                     res.status(400).send(err);
    //                 }
    //                 var photosId = parseInt(result.rows[0].max);
    //                 db.db.query(`INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3)`, [photosId + 1, id, photos], (err, result) => {
    //                     if (err) {
    //                         console.log('Errored while trying to insert photos', err);
    //                         res.status(400).send(err);
    //                     }
    //                     res.send('Successfully posted answer after updating photos');
    //                 } )
    //             })
    //         })
    //     });
    // })

        //After autoIncrement Refactor of answers.id and photos.id
        db.db.query(`INSERT INTO answers (question_id, body, date_written_secs, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5) RETURNING id, date_written_secs`, [questionID, body, timestamp, ansName, ansEmail])
        .then((result) => {
            aId = parseInt(result.rows[0].id);
            var time = parseInt(result.rows[0].date_written_secs);
            return db.db.query(`UPDATE answers SET dateString = TO_TIMESTAMP(${time} / 1000) WHERE id = ${aId}`)
        })
        .then(() => {
            return db.db.query(`INSERT INTO photos (answer_id, url) VALUES ($1, $2)`, [aId, photos]);
        })
        .then(() => {
            res.send('Successfully posted answer after updating photos');
        })
        .catch(err => {
            console.log('Errored while trying to add answer', err);
            res.status(400).send(err);
        })
});


module.exports = qnaRouter;
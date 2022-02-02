/*
List of questions without reported

GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.
Params:
- product_id (int): Specifies the product for which to retrieve questions.
- page (int): Selects the page of results to return. Default 1.
- count (int): Specifies how many results per page to return. Default 5.
Response:
Status: 200 OK
*/

let questions = {
  'product_id': '42',
  'results': [{
    'question_id': 37,
    'question_body': 'Why is this product cheaper here than other sites?',
    'question_date': '2018-10-18T00:00:00.000Z',
    'asker_name': 'williamsmith',
    'question_helpfulness': 4,
    'reported': false,
    'answers': {
      68: {
        'id': 68,
        'body': 'We are selling it here without any markup from the middleman!',
        'date': '2018-08-18T00:00:00.000Z',
        'answerer_name': 'Seller',
        'helpfulness': 4,
        'photos': []
      }
    }
  },
  {
    'question_id': 38,
    'question_body': 'How long does it last?',
    'question_date': '2019-06-28T00:00:00.000Z',
    'asker_name': 'funnygirl',
    'question_helpfulness': 2,
    'reported': false,
    'answers': {
      70: {
        'id': 70,
        'body': 'Some of the seams started splitting the first time I wore it!',
        'date': '2019-11-28T00:00:00.000Z',
        'answerer_name': 'sillyguy',
        'helpfulness': 6,
        'photos': [],
      },
      78: {
        'id': 78,
        'body': '9 lives',
        'date': '2019-11-12T00:00:00.000Z',
        'answerer_name': 'iluvdogz',
        'helpfulness': 31,
        'photos': []
      },
      79: {
        'id': 79,
        'body': '42 months',
        'date': '2019-11-12T00:00:00.000Z',
        'answerer_name': 'dolphin',
        'helpfulness': 99,
        'photos': []
      }
    }
  },
  {
    'question_id': 40,
    'question_body': 'Will it changes after washing?',
    'question_date': '2018-10-18T00:00:00.000Z',
    'asker_name': 'albusDumbledore',
    'question_helpfulness': 146,
    'reported': false,
    'answers': {
      1: {
        'id': 1,
        'body': 'I don\'t know, I never wash my clothes!',
        'date': '2018-08-18T00:00:00.000Z',
        'answerer_name': 'Seller',
        'helpfulness': 4,
        'photos': []
      }
    }
  },
  ]
};

let questionsShort = {
  'product_id': '42',
  'results': [
    {
      'question_id': 38,
      'question_body': 'How long does it last?',
      'question_date': '2019-06-28T00:00:00.000Z',
      'asker_name': 'funnygirl',
      'question_helpfulness': 2,
      'reported': false,
      'answers': {
        70: {
          'id': 70,
          'body': 'Some of the seams started splitting the first time I wore it!',
          'date': '2019-11-28T00:00:00.000Z',
          'answerer_name': 'sillyguy',
          'helpfulness': 6,
          'photos': [],
        },
        78: {
          'id': 78,
          'body': '9 lives',
          'date': '2019-11-12T00:00:00.000Z',
          'answerer_name': 'iluvdogz',
          'helpfulness': 31,
          'photos': []
        },
        79: {
          'id': 79,
          'body': '42 months',
          'date': '2019-11-12T00:00:00.000Z',
          'answerer_name': 'dolphin',
          'helpfulness': 99,
          'photos': []
        }
      }
    },

  ]
};

/*
Answers list

GET /qa/questions/:question_id/answers
Params:
- question_id (int): Required ID of the question for wich answers are needed
Query params:
- page (int): Selects the page of results to return. Default 1.
- count (int): Specifies how many results per page to return. Default 5.
Response:
Status 200 OK
*/

let answers = {
  'question': '1',
  'page': 0,
  'count': 5,
  'results': [
    {
      'answer_id': 8,
      'body': 'What a great question!',
      'date': '2018-01-04T00:00:00.000Z',
      'answerer_name': 'metslover',
      'helpfulness': 8,
      'photos': [],
    },
    {
      'answer_id': 5,
      'body': 'Something pretty durable but I can\'t be sure',
      'date': '2018-01-04T00:00:00.000Z',
      'answerer_name': 'metslover',
      'helpfulness': 5,
      'photos': [{
        'id': 1,
        'url': 'urlplaceholder/answer_5_photo_number_1.jpg'
      },
      {
        'id': 2,
        'url': 'urlplaceholder/answer_5_photo_number_2.jpg'
      }
      ]
    }
  ]
};

/*
Add a question

POST /qa/questions
Body params:
- body (text): Text of question being asked
- name (text): Username for question asker
- email (text): Email address for question asker
- product_id (int): Required ID of the Product for which the question is posted
Response:
Status: 201 CREATED

Add an answer

POST /qa/questions/:question_id/answers
Params:
- question_id	(int): Required ID of the question to post the answer for
Body params:
- body (text) :
- name (text) :
- email (text) :
- photos([text]) : An array of urls corresponding to images to display
Response:
Status: 201 CREATED

Mark Question as Helpful

PUT /qa/questions/:question_id/helpful
Params:
- question_id (int) : Required ID of the question to update
Response:
Status: 204 NO CONTENT

Report Question

PUT /qa/questions/:question_id/report
Params:
- question_id (int) : Required ID of the question to update
Response:
Status: 204 NO CONTENT

Mark Answer as Helpful

Updates an answer to show it was found helpful.
PUT /qa/answers/:answer_id/helpful
Params:
- answer_id (int) : Required ID of the answer to update
Response:
Status: 204 NO CONTENT

Report Answer

Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
PUT /qa/answers/:answer_id/report
Params:
- answer_id	(int) : Required ID of the answer to update
Response:
Status: 204 NO CONTENT

*/

module.exports = {
  questions,
  answers,
  questionsShort
};
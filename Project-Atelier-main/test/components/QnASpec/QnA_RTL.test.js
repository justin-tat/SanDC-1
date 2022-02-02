import React from 'react';
import {act, render, waitFor, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/qnaHandlers.js';

//example data
import exampleQuestions from '../../../example/questions.js';
//components
import QnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import QuestionsList from '../../../client/src/components/QnAcomponents/QuestionsList.jsx';
import QuestionsListItem from '../../../client/src/components/QnAcomponents/QuestionsListItem.jsx';
import QuestionsListItemAnswer from '../../../client/src/components/QnAcomponents/QuestionsListItemAnswer.jsx';
import Search from '../../../client/src/components/QnAcomponents/SearchQuestions.jsx';
import MoreAnsweredQuestions from '../../../client/src/components/QnAcomponents/MoreAnsweredQuestions.jsx';
import AnswersList from '../../../client/src/components/QnAcomponents/AnswersList.jsx';
import AddQuestion from '../../../client/src/components/QnAcomponents/AddQuestion.jsx';
import AddAnswerForm from '../../../client/src/components/QnAcomponents/AddAnswerForm.jsx';
import AddQuestionForm from '../../../client/src/components/QnAcomponents/AddQuestionForm.jsx';
import AnswerPhotoUpload from '../../../client/src/components/QnAcomponents/AnswerPhotoUpload.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Questions and Answers rendering', () => {

  xtest ('Should render main Questions and Answers component', async () => {
    await render(<QnA productId={59553} />);

    expect (screen.getByText('QUESTIONS AND ANSWERS')).toBeInTheDocument();
    expect (screen.getByText('For authentication reasons, you will not be emailed')).toBeInTheDocument();
  });


  test('Should render Question List', async () => {
    await render(<QuestionsList data = {exampleQuestions.questions.results}
    />);
  });


  test('Should render one question', async () => {
    await render(<QuestionsListItem question = {exampleQuestions.questions.results[0]}
    />);
    expect (screen.getByText('Q: Why is this product cheaper here than other sites?')).toBeInTheDocument();

  });

  xtest('Should render question\'s answer ', async () => {
    await render(<QuestionsListItemAnswer answer = {exampleQuestions.answers.results[0]}
    />);
    expect (screen.getByText('A: What a great question!')).toBeInTheDocument();
  });

  test('Should render search component ', async () => {
    await render(<Search />);
  });

  test('Should render more answered questions component ', async () => {
    await render(<MoreAnsweredQuestions />);
    expect (screen.getByText('MORE ANSWERED QUESTIONS')).toBeInTheDocument();
  });

  xtest('Should render answers list ', async () => {
    await render(<AnswersList list={exampleQuestions.answers.results}/>);
  });

  xtest('Should render add question component ', async () => {
    await render(<AddQuestion />);
    expect (screen.getByText('Add a new question')).toBeInTheDocument();

  });

  test('Should render add question form ', async () => {
    await render(<AddQuestionForm />);

    expect (screen.getByText('Your question*')).toBeInTheDocument();
    expect (screen.getByText('What\'s your nickname?*')).toBeInTheDocument();
    expect (screen.getByText('For privacy reasons, do not use your full name or email address')).toBeInTheDocument();
    expect (screen.getByText('Your email?*')).toBeInTheDocument();
    expect (screen.getByText('For authentication reasons, you will not be emailed')).toBeInTheDocument();

  });

  test('Should render add answer form ', async () => {
    await render(<AddAnswerForm />);
    expect (screen.getByText('Submit your answer')).toBeInTheDocument();
    expect (screen.getByText('Your answer*')).toBeInTheDocument();
    expect (screen.getByText('What\'s your nickname?*')).toBeInTheDocument();
    expect (screen.getByText('For privacy reasons, do not use your full name or email address')).toBeInTheDocument();
    expect (screen.getByText('Your email?*')).toBeInTheDocument();
    expect (screen.getByText('For authentication reasons, you will not be emailed')).toBeInTheDocument();

  });

  test('Should render uploading photo to answers component', async () => {
    await render(<AnswerPhotoUpload />);
  });


});
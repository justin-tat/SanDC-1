/*
 * @jest-environment jsdom
 */

import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import QandA from '../../src/Components/QuestionsAndAnswers/QandA.jsx';
import Question from '../../src/Components/QuestionsAndAnswers/Question.jsx';
import AnswersList from '../../src/Components/QuestionsAndAnswers/AnswersList.jsx';

describe('QandA', () => {
  test('renders the QandA parent component', () => {
    render(<QandA/>);
  });
});

describe('Question', () => {
  test('renders individual question component', () => {
    render(<Question/>);
  });
});

describe('AnswersList', () => {
  test('renders AnswersList', () => {
    render(<AnswersList />);
  });
})


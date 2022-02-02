import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';
import exampleProducts from '../../../example/products.js';

import MoreAnsweredQuestions from '../../../client/src/components/QnAcomponents/MoreAnsweredQuestions.jsx';
import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import QuestionsList from '../../../client/src/components/QnAcomponents/QuestionsList.jsx';
import QuestionItem from '../../../client/src/components/QnAcomponents/QuestionsListItem.jsx';



describe('More answered questions button', function() {

  it('should render to static HTML', function() {
    var text = 'MORE ANSWERED QUESTIONS';
    expect(render(<MoreAnsweredQuestions />).text()).toEqual(text);
  });

  it('should trigger the passed function on click', function() {
    const click = jest.fn();
    const wrapper = mount(<MoreAnsweredQuestions click={click}/>);
    wrapper.find('.more-answered-questions-button').simulate('click');
    expect (click).toHaveBeenCalled();
  });

  it('should be shown if there are more than 2 questions', function() {

    //const parent = shallow(<MainQnA productId={42} currentProduct={exampleProducts.products[0]} questionsList={exampleQuestions.questions.results}/>).dive();
    const parent = shallow(<MainQnA productId={42} currentProduct={exampleProducts.products[0]} questionsList={exampleQuestions.questions}/>).dive();
   const state = {
     questions: exampleQuestions.questions.results
   };
   parent.setState(state);
   console.log('button 37', parent.state());

    expect(parent.state().questions.length).toEqual(3);
    expect(parent.state().isMoreQuestionsButtonShown).toEqual(true);
    let button = parent.find('.qna-button-wrapper');
    //console.log('test 53', button.text());
    expect(button.text()).toEqual('<MoreAnsweredQuestions /><AddQuestion />');
  });

  it('should not be shown if there are less than 2 questions', function() {

    const parent = shallow(<MainQnA productId={42} currentProduct={exampleProducts.products[0]} questionsList={exampleQuestions.questionsShort.results}/>).dive();
    expect(parent.state().questions.length).toEqual(0);
    expect(parent.state().isMoreQuestionsButtonShown).toEqual(false);

    let button = parent.find('.qna-button-wrapper');
    expect(button.text()).toEqual('<AddQuestion />');
  });


});


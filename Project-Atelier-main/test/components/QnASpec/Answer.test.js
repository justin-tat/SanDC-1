import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';
import Answer from '../../../client/src/components/QnAcomponents/QuestionsListItemAnswer.jsx';




describe('Rendering one answer item', function() {

  it('should call clickOnYes when clicking on \'Yes\' link', () => {
    let spy = jest.fn();

    const component = mount(<Answer clickOnHelpfulAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);

    component.find('.qna-answer-item-yes-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call reportAnswer() when clicking on \'Report answer\' link', () => {
    let spy = jest.fn();

    const component = mount(<Answer reportAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);

    component.find('.qna-answer-item-report-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('doesn\'t let you click again on alredy reported answer', () => {
    let spy = jest.fn();
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const component = mount(<Answer reportAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);
    const state = {
      isReported: true
    };
    component.setState(state);
    //console.log(component.state().isReported);
    component.find('.qna-answer-item-report-button').simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });

  it('doesn\'t let you click again on helpful counter', () => {
    let spy = jest.fn();
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const component = mount(<Answer clickOnHelpfulAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);
    const state = {
      isHelpful: true
    };
    component.setState(state);
    //console.log(component.state().isReported);
    component.find('.qna-answer-item-yes-button').simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });



  it('should render without throwing an error', function() {
    expect(shallow(<Answer answer={exampleQuestions.answers.results[0]}/>).contains(<div className='qna-answer-item-helpful-keyword'>Helpful?</div>
    )).toBe(true);
  });

  xit('should be selectable by class', function() {
    expect(shallow(<Answer answer={exampleQuestions.answers.results[0]}/>).is('.qna-answer-item-body')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Answer answer={exampleQuestions.answers.results[0]}/>).find('.qna-answer-item-body').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'A:What a great question!By user metsloverJanuary 03, 2018;Helpful?Yes(8)Report';
    expect(render(<Answer answer={exampleQuestions.answers.results[0]}/>).text()).toEqual(text);
  });

  it('should pass props', function() {
    const wrapper = mount(<Answer answer={exampleQuestions.answers.results[0]} />);
    const id = wrapper.props().answer.answer_id;
    const answerBody = wrapper.props().answer.body;
    expect(id).toEqual(8);
    expect(answerBody).toEqual('What a great question!');
  });
});
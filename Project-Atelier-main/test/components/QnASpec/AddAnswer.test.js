import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';

import AddAnswerForm from '../../../client/src/components/QnAcomponents/AddAnswerForm.jsx';
import AnswerPhoto from '../../../client/src/components/QnAcomponents/AnswerPhotoUpload.jsx';

describe('Add new answer form', function() {

  test('click on submit button without filling the form', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddAnswerForm />);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');
    //wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.find('form')).toHaveLength(1);
    //wrapper.find('form').simulate('submit', formEventMocked);
    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1).not.toHaveBeenCalled();

  });

  test('click on submit button when form not filled properly', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {};

    const wrapper = shallow(<AddAnswerForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      answerBody: 'This is an answer from tests',
      nickname: 'gandalf',
      email: ''
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form')).toHaveLength(1);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);

    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);

  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<AddAnswerForm />);

    const answer = wrapper.find({name: 'answerBody'});
    answer.props().value = 'bar';

    expect(answer.props().value).toBeTruthy();

  });

  it('should render without throwing an error', function() {
    expect(shallow(<AddAnswerForm />).contains( <div className="qna-add-answer-form-subtitle">Submit your answer</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddAnswerForm />).is('.qna-add-answer-form')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    //console.log(shallow(<AddAnswerForm />).debug());
    expect(shallow(<AddAnswerForm />).find('.qna-add-answer-form').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Submit your answer: Your answer*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailedClose without adding';
    expect(render(<AddAnswerForm />).text()).toEqual(text);
  });

  test('handle validation should return false without input', () => {
    const component = new AddAnswerForm;
    expect(component.handleValidation('', '', '')).toEqual(false);
  });

  test('handle validation should return false without answer', () => {
    const component = new AddAnswerForm;
    expect(component.handleValidation('', 'aragorn', 'kings@dunedain.com')).toEqual(false);
  });

  test('handle validation should return false without nickname', () => {
    const component = new AddAnswerForm;
    expect(component.handleValidation('for frodo', '', 'kings@dunedain.com')).toEqual(false);
  });

  test('handle validation should return false without email', () => {
    const component = new AddAnswerForm;
    expect(component.handleValidation('for frodo', 'bill the pony', '')).toEqual(false);
  });

  test('handle validation should return false with email in wrong format', () => {
    const component = new AddAnswerForm;
    expect(component.handleValidation('for frodo', 'bill the pony', 'dummyemail')).toEqual(false);
  });

  test('handle validation should return true with proper arguments', () => {
    const component = new AddAnswerForm;
    expect(component.handleValidation('for frodo', 'bill the pony', 'ponies@example.com')).toEqual(true);
  });

  test('adding new answer invoked passed functions', () => {

    const formEventMocked = { preventDefault: jest.fn() };

    const passedMock1 = jest.fn();
    const passedMock2 = jest.fn();
    const wrapper = shallow(<AddAnswerForm addNewAnswer={passedMock1} closeAnswer={passedMock2} />);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      answerBody: 'This is a answerfrom tests',
      nickname: 'gandalf',
      email: 'example@email.com'
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(spy3).toBeCalledTimes(1);
    expect(passedMock1).toBeCalledTimes(1);
    expect(passedMock2).toBeCalledTimes(1);

  });
});

describe('Uploading photos in answers', function() {

  it('should be selectable by class', function() {
    expect(shallow(<AnswerPhoto />).is('.qna-answer-photo-upload')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AnswerPhoto />).find('.qna-answer-photo-upload').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = '';
    expect(render(<AnswerPhoto />).text()).toEqual(text);
  });
});
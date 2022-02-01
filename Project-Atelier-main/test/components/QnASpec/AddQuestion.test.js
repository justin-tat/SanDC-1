import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';

import AddQuestionForm from '../../../client/src/components/QnAcomponents/AddQuestionForm.jsx';
import AddQuestion from '../../../client/src/components/QnAcomponents/AddQuestion.jsx';



describe('Rendering add question parent component', function() {
  xit('should render without throwing an error', function() {
    expect(shallow(<AddQuestion />).contains( <div className='qna-add-new-question-form'></div>
    )).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddQuestion />).is('.add-question-parent')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddQuestion />).find('.add-question-parent').length).toBe(1);
  });

  xit('should render to static HTML', function() {
    var text = 'Ask a question about the Your question*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailed';
    expect(render(<AddQuestion />).text()).toEqual(text);
  });

  test('invokes clickOnAddQuestion() and correctly changing state if clicking on button \'Add question\' ', () => {
    const mockCheckForm = jest.fn();
    const wrapper = shallow(<AddQuestion checkForm={mockCheckForm} />);
    const spy = jest.spyOn(wrapper.instance(), 'clickOnAddQuestion');
    wrapper.find('.qna-add-question-button').simulate('click');
    expect(spy).toHaveBeenCalled();
    //console.log(wrapper.state());
    expect(wrapper.state().isModalShown).toEqual(true);
    expect(wrapper.state().isAddButtonShown).toEqual(false);

  });



  xtest('child component correctly changes state of  parent component ', () => {
    const parent = shallow(<AddQuestion />);
    const spy = jest.spyOn(parent.instance(), 'closeForm');

    //imitating adding new question
    parent.find('.qna-add-question-button').simulate('click');
    expect(parent.state().isModalShown).toEqual(true);
    expect(parent.state().isAddButtonShown).toEqual(false);

    const formEventMocked = { preventDefault: jest.fn() };
    const passedMock1 = jest.fn();
    const wrapper = shallow(<AddQuestionForm addQuestion={passedMock1} closeForm={spy} />);

    const state = {
      questionBody: 'This is a question from tests',
      nickname: 'gandalf',
      email: 'example@email.com'
    };
    wrapper.setState(state);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    //
    expect (spy).toHaveBeenCalled();
    expect(parent.state().isModalShown).toEqual(false);
    expect (parent.state().isAddButtonShown).toEqual(true);

  });

});

describe('Add new question form', function() {

  test('click on submit button without filling the form', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddQuestionForm/>);
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
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddQuestionForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      questionBody: 'This is a question from tests',
      nickname: 'gandalf',
      email: ''
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();
    //expect(wrapper.find('form')).toHaveLength(1);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);

    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);

  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<AddQuestionForm/>);
    //wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});
    const question = wrapper.find({name: 'questionBody'});
    question.props().value = 'foo';
    //question.simulate('change', { target: { value: 'bla' } });
    //console.log(question.debug());
    //wrapper.update();
    //wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(question.props().value).toBeTruthy();

  });

  test('handle validation should return false without input', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('', '', '')).toEqual(false);
  });

  test('handle validation should return false without question', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('', 'aragorn', 'kings@dunedain.com')).toEqual(false);
  });

  test('handle validation should return false without nickname', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', '', 'kings@dunedain.com')).toEqual(false);
  });

  test('handle validation should return false without email', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', 'bill the pony', '')).toEqual(false);
  });

  test('handle validation should return false with email in wrong format', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', 'bill the pony', 'dummyemail')).toEqual(false);
  });

  test('handle validation should return true with proper arguments', () => {
    const component = new AddQuestionForm;
    expect(component.handleValidation('for frodo', 'bill the pony', 'ponies@example.com')).toEqual(true);
  });

  test('isValid if true should invoked passed functions', () => {

    const formEventMocked = { preventDefault: jest.fn() };

    const passedMock1 = jest.fn();
    const passedMock2 = jest.fn();
    const wrapper = shallow(<AddQuestionForm addQuestion={passedMock1} closeForm={passedMock2} />);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      questionBody: 'This is a question from tests',
      nickname: 'gandalf',
      email: 'example@email.com'
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(wrapper.state().isValid).toEqual(true);
    expect(spy3).toBeCalledTimes(1);
    expect(passedMock1).toBeCalledTimes(1);
    expect(passedMock2).toBeCalledTimes(1);

  });

  it('should render without throwing an error', function() {
    expect(shallow(<AddQuestionForm />).contains(<div className ='qna-add-question-form-your-question'>Your question*</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddQuestionForm />).is('.qna-add-new-question-form')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddQuestionForm />).find('.qna-add-new-question-form').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Ask a question about the Your question*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailedClose without submitting';
    expect(render(<AddQuestionForm />).text()).toEqual(text);
  });

  it('should have properties at state', () => {
    const wrapper = mount(<AddQuestionForm
    />);
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.state().questionBody).toEqual('');
    expect(wrapper.state().nickname).toEqual('');
    expect(wrapper.state().email).toEqual('');
  });

  it('allows to close form without submitting', () => {
    const mock = jest.fn();
    const wrapper = mount(<AddQuestionForm closeForm={mock}
    />);
    wrapper.find('.qna-add-question-form-close').simulate('click');
    expect(mock).toHaveBeenCalled();

  });

});
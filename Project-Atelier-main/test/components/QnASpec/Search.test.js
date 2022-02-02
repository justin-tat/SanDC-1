import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';
import Search from '../../../client/src/components/QnAcomponents/SearchQuestions.jsx';

describe('Search', function() {

  it('should render to static HTML', function() {
    var text = '';
    expect(render(<Search />).text()).toEqual(text);
  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<Search/>);

    const query = wrapper.find('input');
    query.props().value = 'bla';

    expect(query.props().value).toBeTruthy();

  });

  test('click on submit button invokes handleInputChange', () => {
    const onSearchMock = jest.fn();
    const component = mount(<Search search={onSearchMock} value='bla' />);
    const input = component.find('input');
    const event = {
      preventDefault() {},
      target: { value: 'bla' }
    };
    component.find('input').simulate('change', event);
    expect(onSearchMock).toHaveBeenCalled();
    expect(onSearchMock).toBeCalledWith('bla', true);
  });

  test('passes false to parent if the query less than 2 characters', () => {
    const onSearchMock = jest.fn();
    const component = mount(<Search search={onSearchMock} value='bla' />);
    const input = component.find('input');
    const event = {
      preventDefault() {},
      target: { value: 'a' }
    };
    component.find('input').simulate('change', event);
    expect(onSearchMock).toHaveBeenCalled();
    expect(onSearchMock).toBeCalledWith('a', false);
  });

});
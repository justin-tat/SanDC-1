import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';

import exampleQuestions from '../../../example/questions.js';
import exampleProducts from '../../../example/products.js';

import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import ClickedData from '../../../client/src/components/ClickDataAnalytics.jsx';


// jest.mock('ClickedData', () => {
//   return {
//     QnAwithClickData: () => {
//       return (Component) => {
//         return (props) => {
//           return <Component newProp={jest.fn} {...props} />;
//         };
//       };
//     },
//   };
// });



xdescribe('Main Questions and Answers form', function() {

  xit('should mount in a full DOM', function() {
    const qna = shallow(<MainQnA productId={42} currentProduct={exampleProducts.products[0]} questionsList={exampleQuestions.questions}/>).dive();
    expect(qna.find('.qna-main-component').length).toBe(1);
  });

  xit('should mount and unmount', function() {

    const wrapper = shallow(<MainQnA productId={42} currentProduct={exampleProducts.products[0]} questionsList={exampleQuestions.questions}/>).dive();

    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    expect(wrapper.instance()._isMounted).toEqual(true);
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });

  xit('should render to static HTML', function() {
    var text = 'QUESTIONS AND ANSWERSADD A QUESTIONAsk a question about the This is not a nameYour question*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailedClose without submitting';
    expect(render(<MainQnA productId={59553}/>).text()).toEqual(text);
  });



});
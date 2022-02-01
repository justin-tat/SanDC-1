import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import { products } from '../../../example/products.js';
import ProductCards from '../../../client/src/components/RelProductsComponents/ProductCards.jsx';


describe('Related Product Cards Rendering', function() {

  it('should render to static HTML', function() {
    var text = 'Related ProductsJacketsCamo OnesieAccessoriesBright Future SunglassesPantsMorning Joggers';
    expect(render(<ProductCards productCards={products} />).text()).toEqual(text);
  });

});
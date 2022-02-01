import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import { products } from '../../../example/products.js';
import MyOutfitCards from '../../../client/src/components/RelProductsComponents/MyOutfitCards.jsx';


describe('My Outfits Card Rendering', function() {

  it('should render to static HTML', function() {
    var text = 'My Outfits Cards+Add to OutfitJacketsCamo Onesie140AccessoriesBright Future Sunglasses69PantsMorning Joggers40';
    expect(render(<MyOutfitCards myOutfitCards={products} />).text()).toEqual(text);
  });

  it('should trigger a mock function upon click', function() {
    const click = jest.fn();
    const wrapper = mount(<MyOutfitCards myOutfitCards={products} handleAddOutfitClick={click}/>);
    wrapper.find('.add-outfit').simulate('click');
    expect(click).toHaveBeenCalled();
  });

});
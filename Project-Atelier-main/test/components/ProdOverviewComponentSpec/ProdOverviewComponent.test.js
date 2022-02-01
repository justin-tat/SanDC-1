import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import Enzyme from 'enzyme';
import { shallow, mount, ShallowWrapper, instance } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProductOverview from '../../../client/src/components/ProdOverview/OverView.jsx';
import DefaultGallery from '../../../client/src/components/ProdOverview/ImageGallery/DefaultGallery.jsx';
import ExpandedModal from '../../../client/src/components/ProdOverview/ImageGallery/ExpandedModal.jsx';
import AddToCart from '../../../client/src/components/ProdOverview/AddToCart/AddToCart.jsx';
import SizeDropdown from '../../../client/src/components/ProdOverview/AddToCart/SizeDropDown.jsx';
import QuantityDropdown from '../../../client/src/components/ProdOverview/AddToCart/QuantityDropdown.jsx';
import StyleSelector from '../../../client/src/components/ProdOverview/StyleSelector/StyleSelect.jsx';
import StyleBubble from '../../../client/src/components/ProdOverview/StyleSelector/StyleSelectBubble.jsx';
import ProductInfo from '../../../client/src/components/ProdOverview/ProductInfo/ProductInfo.jsx';
import StarRating from '../../../client/src/components/ProdOverview/ProductInfo/StarRating.jsx';

Enzyme.configure({ adapter: new Adapter() });

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from '../../mocks/ProdOverviewHandlers.js';
import { specificProduct, style } from '../../../example/products.js';
import { dummyReviews } from '../../../example/reviews.js';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe ('Product Overview Component Testing', () => {
  test('Loads and displays a Product Overview Component', () => {
    render(<ProductOverview currentProduct={specificProduct} currentProductStyle={style} currentReview={dummyReviews.meta}
      toggleFavorite={jest.fn()} currentStyleId={style.results[0].style_id} addToFavorites={[]} />);
    expect(screen.getByTestId('Overview')).toBeInTheDocument();
  });

  test('It should Update useModal in state when switchImageModal function is ran', () => {
    const overview = shallow(<ProductOverview currentProduct={specificProduct} currentProductStyle={style} currentReview={dummyReviews.meta}
      toggleFavorite={jest.fn()} currentStyleId={style.results[0].style_id} addToFavorites={[]} />).dive();
    expect(overview.state('useModal')).toBe(false);
    overview.instance().switchImageModal();
    expect(overview.state().useModal).toBe(true);
  });
});

describe ('Add To Cart Component Testing', () => {
  test('Loads and displays Add to Cart Parent Component', () => {
    render(<AddToCart displayedStyle={style.results[0]} toggleFavorite={jest.fn()} addToFavorites={[]} />);
    expect(screen.getByRole('button', {name: 'Add To Cart'})).toBeInTheDocument();
  });

  test('Loads and displays Size Selector Dropdown Child Component', () => {
    render(<SizeDropdown displayedSkus={style.results[0].skus} />);
    expect(screen.getByRole('option', {name: 'Select Size'})).toBeInTheDocument();
  });

  test('Loads and displays Quantity Selector Dropdown Child Component', () => {
    render(<QuantityDropdown selectedQuantity={10} />);
    expect(screen.getByRole('option', {name: '1'})).toBeInTheDocument();
  });

  test('Should select correct size', () => {
    const sizeDropdown = mount(<SizeDropdown displayedSkus={style.results[0].skus} />);
    expect(sizeDropdown.find('#sizeSelector').at(0).instance().value = 'S');
  });
});

describe('Image Gallery Component Testing', () => {
  test('Loads and displays Default Gallery Component', () => {
    render(<DefaultGallery photos={style.results[0].photos} />);
    expect(screen.getByTestId('ImageGallery')).toBeInTheDocument();
  });

  test('Default Thumb Gallery includes 7 or less images', () => {
    const wrapper = shallow(<DefaultGallery photos={style.results[0].photos} />);
    expect(wrapper.find('.POThumbImg')).toHaveLength(7);
  });

  test('Loads and displays Modal Gallery Component', () => {
    render(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>);
    expect(screen.getByTestId('ModalGallery')).toBeInTheDocument();
  });

  test('Runs two functions when Default Gallery display image is clicked', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const defaultGal = shallow(<DefaultGallery photos={style.results[0].photos} switchImageModal={spy} updateIndex={spy2} />);

    defaultGal.find('.PODisplayImg').simulate('click');
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });

  test('Runs a function when right or left arrow is clicked', () => {
    const defaultGal = shallow(<DefaultGallery photos={style.results[0].photos} />);

    defaultGal.find('.PORight').simulate('click');
    expect(defaultGal.state('selectedIndex')).toBe(1);

    defaultGal.find('.POLeft').simulate('click');
    expect(defaultGal.state('selectedIndex')).toBe(0);
  });

  test('Expanded Modal should run componentDidMount to disable scrolling when Modal is loaded', () => {
    const expandedGal = shallow(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>).instance();
    const componentDidMount = jest.spyOn(expandedGal, 'componentDidMount');
    expandedGal.componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
  });

  test('Expanded Modal should initial state index to *', () => {
    const expandedGal = shallow(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>);
    expect(expandedGal.state('index')).toEqual(0);
  });

  test('Expanded Modal should run rotateRight function when right arrow is clicked', () => {
    const expandedGal = shallow(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>);
    const spy = jest.spyOn(expandedGal.instance(), 'rotateRight');
    expandedGal.instance().forceUpdate();
    expandedGal.find('#ModalArrowRight').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  test('Expanded Modal should run rotateLeft function when left arrow is clicked', () => {
    const expandedGal = shallow(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>);
    const spy = jest.spyOn(expandedGal.instance(), 'rotateLeft');
    expandedGal.instance().forceUpdate();
    expandedGal.find('#ModalArrowLeft').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  test('Expanded Modal index state should increase by 1 when rotateRight function is called', () => {
    const expandedGal = shallow(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>);
    expect(expandedGal.state('index')).toEqual(0);
    expandedGal.find('#ModalArrowRight').simulate('click');
    expect(expandedGal.state('index')).toEqual(1);
  });

  test('Expanded Modal index state should decrease by 1 when rotateLeft function is called', () => {
    const expandedGal = shallow(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>);
    expect(expandedGal.state('index')).toEqual(0);
    expandedGal.find('#ModalArrowRight').simulate('click');
    expect(expandedGal.state('index')).toEqual(1);
    expandedGal.find('#ModalArrowLeft').simulate('click');
    expect(expandedGal.state('index')).toEqual(0);
  });

  test('Expect activateZoom to be called when Expanded Modal gray space is clicked', ()=> {
    const expandedGal = mount(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>, { attachTo: document.body });
    const spy = jest.spyOn(expandedGal.instance(), 'activateZoom');
    expandedGal.instance().forceUpdate();
    expandedGal.find('#POModalLens').simulate('click');
    expect(spy).toHaveBeenCalled();
    expandedGal.unmount();
  });

  test('Expect activateZoom to be called when Expanded Modal display image is clicked', ()=> {
    const expandedGal = mount(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>, { attachTo: document.body });
    const spy = jest.spyOn(expandedGal.instance(), 'activateZoom');
    expandedGal.instance().forceUpdate();
    expandedGal.find('#PONormalImage').simulate('click');
    expect(spy).toHaveBeenCalled();
    expandedGal.unmount();
  });

  test('Expect calling activateZoom to toggle zoomActivated state', () => {
    const expandedGal = mount(<ExpandedModal photos={style.results[0].photos} selectedIndex={0}/>, { attachTo: document.body });
    expect(expandedGal.state('zoomActivated')).toEqual(false);
    expandedGal.find('#PONormalImage').simulate('click');
    expect(expandedGal.state('zoomActivated')).toEqual(true);
    expandedGal.find('#PONormalImage').simulate('click');
    expect(expandedGal.state('zoomActivated')).toEqual(false);
    expandedGal.unmount();
  });
});

describe('Style Select Component Testing', () => {
  test('Loads and displays Style Selector Parent Component', () => {
    render(<StyleSelector styles={style} displayedStyle={style.results[0]} />);
    expect(screen.getByText('Style >')).toBeInTheDocument();
  });

  test('Loads and displays Style Selection Bubble Child Component', () => {
    render(<StyleBubble style={style.results[0]}/>);
    expect(screen.getByAltText('Forest Green & Black')).toBeInTheDocument();
  });
});

describe('Product Info Component Testing', () => {
  test('Loads and displays Product Info Parent Component', () => {
    render(<ProductInfo product={specificProduct} style={style.results[0]} ratings={dummyReviews.meta.ratings} />);
    expect(screen.getByText('Air Minis 250')).toBeInTheDocument();
  });

  test('Loads and displays Star Rating Child Component', () => {
    render(<StarRating ratings={dummyReviews.meta.ratings} />);
    expect(screen.getByTestId('starRating')).toBeInTheDocument();
  });
});
/*
 * @jest-environment jsdom
 */

import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react';
import Overview from '../../src/Components/Overview/Overview';
import Gallery from '../../src/Components/Overview/Gallery';
import Description from '../../src/Components/Overview/Description';
import Styles from '../../src/Components/Overview/Styles';
import Cart from '../../src/Components/Overview/Cart';


describe('Overview', () => {
  test('Renders the Overview component', () => {
    render(<Overview/>)
  })
})

describe('Gallery', () => {
  test('Renders the Gallery component', () => {
    render(<Gallery/>)
  })
})


describe('Description', () => {
  test('Renders the Description component', () => {
    render(<Description/>)
  })
})



describe('Styles', () => {
  test('Renders the Styles component', () => {
    render(<Styles/>)
  })
})



describe('Cart', () => {
  test('Renders the Cart component', () => {
    render(<Cart/>)
  })
})


import React from 'react';
import { shallow } from 'enzyme';
import AppLayer from './index.js';

describe('AppLayer text', () => {
  test('snapshot renders', () => {
    const component = shallow(<AppLayer/>);
    expect(component).toMatchSnapshot();
  });

  it('Unit test state AppLayer', ()=>{
    const component = shallow(<AppLayer/>);
    const value = component.find('.header');
    expect(value.contains(<div></div>)).toEqual(false);
  })
});

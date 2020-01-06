import React,{useState} from 'react';
import { shallow, mount } from 'enzyme';
import Map from './index.js';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { renderHook, act } from '@testing-library/react-hooks'

const mockStore = configureMockStore();
const initialState ={googleMap: {isMakePolyLine: false}};
const store = mockStore(initialState);

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState')
useStateSpy.mockImplementation((init) => [init, setState]);

const e = {preventDefault: () => null};

//두 describe 중 하나는 주석 처리를 하고 testing해야한다.
describe('jest enzyme test', () => {
  test('snapshot renders', () => {
    const component = mount(<Provider store={store}><Map/></Provider>);
    expect(component).toMatchSnapshot();
  });

  it('Button Test', ()=>{
    const component = mount(<Provider store={store}><Map/></Provider>);
    const btnTheme = component.find('#btn-theme').at(0);
    const btnRoute = component.find('#btn-make-route').at(0);
    btnTheme.props().onClick(e);
    btnRoute.props().onClick(e);
    //state 변화
    expect(setState).toHaveBeenCalledWith(true);
    //reducer 테스트
    expect(store.getActions()[0].type).toEqual('NAVIGATION_PAGE_SET_GOOGLE_MAP_ROUTING_DISPLAY_TRUE')
  });
  it('WrappedMap Start Props Test', ()=>{
    const component = mount(<Provider store={store}><Map/></Provider>);
    const wrappedMap = component.find('#wrapped-map').at(0);
    expect(wrappedMap.props().changeMapTheme).toBe(false);
    expect(wrappedMap.props().isMakePolyLineToMap).toBe(false);
    expect(wrappedMap.props().centers).toStrictEqual({ lat: 45.4211, lng: -75.6903 });
    expect(wrappedMap.props().boundValue).toBe(null);
  });
});

//hooks에 관한 테스팅으로 return 중 하나의 주석을 풀도록 하자, -> 삭제하지 말 것
describe('react-hooks test', () => {
  it('Button Theme Test', ()=>{
    const e = {preventDefault: () => null};
    const wrapper = ({ children }) => (<Provider store={store}>{children}</Provider>)
    wrapper.displayName = 'react-hooks-testing'
    const { result } = renderHook(() => Map(), { wrapper })
    console.log(result.current);
    act(() => {
      result.current.onChangeDisplayMode(e);
    })
    //console.log(component.html())
    expect(result.current.isDisplayDarkMode).toBe(true);
    expect(result.current.isDisplayDarkMode).toHaveBeenCalledTimes(1);
  });
});

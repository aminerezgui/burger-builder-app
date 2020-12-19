import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should output 2 <NavigationItem /> when logged out', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should output 3 <NavigationItem /> when logged in', () => {
        wrapper.setProps({
            logged: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contains a Log out Button when logged in', () => {
        wrapper.setProps({
            logged: true
        });
        expect(wrapper.contains(<NavigationItem clicked={wrapper.props().clicked} link="/logout" exact={false}>Log out</NavigationItem>)).toEqual(true);
    });

});

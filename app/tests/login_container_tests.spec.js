import {Login} from '../containers/Login';
import test from 'tape';
import {shallow} from 'enzyme';
import React from 'react';

test('Login component has an h1', (assert) => {
	const wrapper = shallow(<Login/>);
	assert.equal(wrapper.contains(<h1>Login</h1>), true)
	assert.end()
});
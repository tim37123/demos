import {Register} from '../containers/Register';
import test from 'tape';
import {shallow} from 'enzyme';
import React from 'react';

test('Register component has an h2', (assert) => {
	const wrapper = shallow(<Register/>);
	assert.equal(wrapper.contains(<h2>Register</h2>), true)
	assert.end()
});
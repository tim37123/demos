import {Navbar} from '../containers/Navbar';
import test from 'tape';
import {shallow} from 'enzyme';
import React from 'react';

test('Navbar has a brand element', (assert) => {
	const wrapper = shallow(<Navbar/>);
	assert.equal(wrapper.contains(<span className="navbar-brand" href="#">Brand</span>), true)
	assert.end()
});
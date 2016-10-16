import test from 'tape';
import Firebaseutils from '../utils/firebaseUtils';

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { addTodoAsync, register, login, logout, setUser, clearUser } from '../sagas'

test('addTodoAsync Saga test', (assert) => {
	const gen = addTodoAsync({type: 'addTodo', todo: 'hello world!'});

	assert.deepEqual(
		gen.next().value,
		call(delay, 1000),
		'incrementasync should start by yielding to delay'
	)

	assert.deepEqual(
		gen.next().value,
		put({type: 'addTodo', todo: 'hello world!'}),
		'incrementasync should generate new todo action for reducer'
	)

	assert.deepEqual(
		gen.next(),
		{ done: true, value: undefined },
		'incrementasync saga should complete'
	)

	assert.end()
});

test('registration Saga test', (assert) => {
	const action = {type: 'REGISTER_USER', creds: {'email': 'timwlindsey@gmail.com', 'password': 'blahblah'}}
	const gen = register(action);

	assert.deepEqual(
		gen.next().value,
		call(Firebaseutils.registerUser,action.creds),
		'register should start by calling the firebase register action'
	)

	assert.end()
});

test('login saga', (assert) => {
	const action = {type: 'login', user: 'hello'}
	const gen = login(action);

	assert.deepEqual(
		gen.next().value,
		call(Firebaseutils.login,action.creds),
		'login should activate the firebase login function'
	)

	assert.end()
});

test('logout saga', (assert) => {
	const action = {type: 'logout'}
	const gen = logout(action);

	assert.deepEqual(
		gen.next().value,
		call(Firebaseutils.logout),
		'logout should activate the firebase logout function'
	)

	assert.end()
});

test('clear user saga', (assert)=> {
	const gen = clearUser();
	assert.deepEqual(
		gen.next().value,
		put({type: 'CLEAR_USER'}),
		'clear user should pass to reducer to remove user from state'
	)

	assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'clear user saga should complete'
    )

	assert.end()
});

// test('set user saga', (assert)=> {

// });
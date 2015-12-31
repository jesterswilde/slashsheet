import {createStore} from 'redux'; 
import {reducer} from './reducers.js'; 
import initialState from './initial.js';

const store = createStore(reducer, initialState); 

export default store;

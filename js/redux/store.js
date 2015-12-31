import {createStore} from 'redux'; 
import {reducer} from './reducers.js'; 
import initialState from '../util/initial.js';

const store = createStore(reducer, initialState); 

export default store;

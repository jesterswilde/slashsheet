
/*jshint esnext:true*/
// import {value} from 'test.js';
// var app = require('./app.js'); 

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import SlashSheet from './components/slashSheet.js'; 
import store from './redux/store.js'; 



class App extends React.Component {
  render() {
    return (<div>
	    		<Provider store={store}>
	    			 <SlashSheet />
		    	</Provider>
	    	</div>
	    	)
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
module.exports ={
	entry: {
		index: './js/index.js'
	},
	output: {
		filename:'public/dist.js'
	},
	devtool: 'source-map',
	module: {
        loaders: [
	      {
	        test: /.jsx?$/,
	        loader: 'babel-loader',
	        exclude: /node_modules/,
	        query: {
      		presets: ['es2015', 'react']
        }
      }
    ]
    }
};
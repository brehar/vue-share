const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: 'variables.env' });

const filePath = path.join(__dirname + '/typeDefs.graphql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

const User = require('./models/User');
const Post = require('./models/Post');

mongoose.set('useCreateIndex', true);

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => {
		console.log('Database Connected');
	})
	.catch(err => {
		console.error(err);
	});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		User,
		Post
	}
});

server
	.listen()
	.then(({ url }) => {
		console.log(`Server listening on ${url}`);
	})
	.catch(err => {
		console.log(err);
	});

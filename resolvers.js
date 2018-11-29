module.exports = {
	Query: {
		async getPosts(_, args, { Post }) {
			return await Post.find({})
				.sort({ createdDate: 'desc' })
				.populate({
					path: 'createdBy',
					model: 'User'
				});
		}
	},
	Mutation: {
		async signupUser(_, { username, email, password }, { User }) {
			const user = await User.findOne({ username });

			if (user) {
				throw new Error('User already exists.');
			}

			return await new User({
				username,
				email,
				password
			}).save();
		},
		async addPost(_, { title, imageUrl, categories, description, creatorId }, { Post }) {
			return await new Post({
				title,
				imageUrl,
				categories,
				description,
				createdBy: creatorId
			}).save();
		}
	}
};

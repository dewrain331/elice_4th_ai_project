import { Community } from "../schemas/community";

export const communityModel = {
	create: async ({ newArticle }) => {
		const createdNewArticle = await Community.create(newArticle);

		return createdNewArticle;
	},

	deleteById: async ({ articleId }) => {
		const deletedArticle = await Community.deleteOne({ articleId });

		return deletedArticle;
	},

	findById: async ({ articleId }) => {
		const foundArticle = await Community.findOne({ articleId });

		return foundArticle;
	},

	update: async ({ articleId, data }) => {
		const update = { $set: data };
		const option = { returnOriginal: false };
		const updatedArticle = await Community.findOneAndUpdate(
			articleId,
			update,
			option
		);
		return updatedArticle;
	},

	findAll: async ({ getArticles }) => {
		const total = await Community.countDocuments({});

		const limit = getArticles.limit;
		const offset = (getArticles.page - 1) * limit;

		const articles = await Community.find({}).limit(limit).skip(offset);

		const sendArticles = {
			total: total,
			articles,
		};

		return sendArticles;
	},

	findHead: async ({ getArticles }) => {
		const head = getArticles.head;

		const total = await Community.countDocuments({ head });

		const limit = getArticles.limit;
		const offset = (getArticles.page - 1) * limit;

		const articles = await Community.find({ head }).limit(limit).skip(offset);

		const sendArticles = {
			total: total,
			articles,
		};

		return sendArticles;
	},
};

const mongoose = require("mongoose");
const Feed = mongoose.model("feed");
const checkAuth = require("../middleware/check-auth"); // checkAuth function is for making the API to work only with an "access_token".

module.exports = (app) => {

	app.get("/api/feed/", checkAuth, (req, res) => {
		const page = parseInt(req.query.page) || 0;
		const limit = parseInt(req.query.limit) || 3; // If not limit provided in the API call, return 3 only.
		const query = {};
		Feed.find(query)
			.skip(page * limit)
			.limit(limit)
			.sort({date:-1})
			.exec((err, doc) => {
				if (err) {
					return res.json(err);
				}
				Feed.countDocuments(query).exec((count_error, count) => {
					if (err) {
						return res.json(count_error);
					}
					return res.json({
						total: count,
						page: page,
						page_size: doc.length,
						posts: doc
					});
				});
			});
	});

	// app.get("/api/feed/total/", checkAuth, function (req, res) {
	// 	Feed.find({})
	// 	.countDocuments()
	// 	.then((data) => {
	// 		res.status(200).send({
	// 		total: data,
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.status(400).send({
	// 		err: err,
	// 		});
	// 	});
  // });

  app.post(`/api/feed/`, checkAuth, async (req, res) => {
	let feed = await Feed.create(req.body);
	return res.status(201).send({
	  error: false,
	  feed,
	});
  });

  app.put(`/api/feed/:id`, checkAuth, async (req, res) => {
	const { id } = req.params;

	let feed = await Feed.findByIdAndUpdate(id, req.body);

	return res.status(202).send({
	  error: false,
	  feed,
	});
  });

  app.delete(`/api/feed/:id`, checkAuth, async (req, res) => {
	const { id } = req.params;

	let feed = await Feed.findByIdAndDelete(id);

	return res.status(202).send({
	  error: false,
	  feed,
	});
  });
};

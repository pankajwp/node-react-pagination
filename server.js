const paginate = require("jw-paginate");


// @access Private
  // @desc get all products
  app.get(
    "/api/product/get-all",
    // passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        // get page from query params or default to first page
        const currentPage = parseInt(req.query.page) || 1;
        // get pager object for specified page
        const pageSize = 10;
        let start = 0;

        if (currentPage > 1) {
          start = (currentPage - 1) * pageSize;
        }

        const productList = await db.Product.findAndCountAll({
          where: { status: "1" },
          order: [["createdAt", "DESC"]],
          limit: pageSize,
          offset: start,
        });
        const pager = paginate(productList.count, currentPage, pageSize);
        // console.log(pager);
        // get page of items from items array
        const pageOfItems = productList.rows;

        // return res.json(pageOfItems);
        if (productList.count > 0) {
          return res.status(200).json({ pager, pageOfItems });
        } else {
          errors.flashError = "No categories found.";
          return res.status(400).json(errors);
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

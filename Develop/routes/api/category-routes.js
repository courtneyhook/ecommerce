const router = require("express").Router();
const { Category, Product } = require("../../models");
const { findOne } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products+
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await findOne(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({
        status: "error",
        message: "There was no CATEGORY found with that id.",
      });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(categoryData);
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: error.message });
  }
});

module.exports = router;

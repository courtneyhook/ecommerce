const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    return res.json(categoryData);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    return res.json(categoryData);
  } catch (err) {
    return res.status(500).json({ status: "error", msg: err.message });
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
    return res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
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
    return res.json(deletedCategory);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

module.exports = router;

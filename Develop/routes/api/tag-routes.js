const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    return res.json(tagData);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.json(tagData);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    return res.json(tagData);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(updatedTag);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete on tag by its `id` value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(deletedTag);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
});

module.exports = router;

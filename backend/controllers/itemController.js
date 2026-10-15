
import Item from "../models/Item.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch items",
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch item",
    });
  }
};

export const createItem = async (req, res) => {
  try {
    const discountPercentage =
      req.body.discountPercentage === undefined ||
      req.body.discountPercentage === ""
        ? 0
        : Number(req.body.discountPercentage);

    if (
      !Number.isFinite(discountPercentage) ||
      discountPercentage < 0 ||
      discountPercentage > 100
    ) {
      return res.status(400).json({
        message: "Discount percentage must be between 0 and 100",
      });
    }

    const newItem = await Item.create({
      ...req.body,
      discountPercentage,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create item",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (
      Object.prototype.hasOwnProperty.call(
        updateData,
        "discountPercentage"
      )
    ) {
      const discount =
        updateData.discountPercentage === ""
          ? 0
          : Number(updateData.discountPercentage);

      if (
        !Number.isFinite(discount) ||
        discount < 0 ||
        discount > 100
      ) {
        return res.status(400).json({
          message: "Discount percentage must be between 0 and 100",
        });
      }

      updateData.discountPercentage = discount;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete item",
    });
  }
};

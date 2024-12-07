const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Get product by ID middleware
exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
    req.product = product;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Product not found' });
  }
};

// Read product details
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Create a new product
exports.create = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }

    const { name, description, price, quantity, shipping } = fields;

    if (!name || !description || !price || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: 'Image should be less than 1MB in size' });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    try {
      const result = await product.save();
      res.json(result);
    } catch (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
  });
};

// Delete a product
exports.remove = async (req, res) => {
  try {
    let product = req.product;
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

// Update a product
exports.update = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: 'Image should be less than 1MB in size' });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    try {
      const result = await product.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
  });
};

// List products with filters and pagination
exports.list = async (req, res) => {
  const order = req.query.order || 'asc';
  const sortBy = req.query.sortBy || '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try {
    const products = await Product.find()
      .select('-photo')
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    res.json(products);
  } catch (error) {
    return res.status(400).json({ error: 'Products not found' });
  }
};

// List products by search
exports.listBySearch = async (req, res) => {
  const order = req.body.order || 'desc';
  const sortBy = req.body.sortBy || '_id';
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = parseInt(req.body.skip);
  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      }
    }
  }

  try {
    const products = await Product.find(findArgs)
      .select('-photo')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec();
    res.json({ size: products.length, data: products });
  } catch (error) {
    return res.status(400).json({ error: 'Products not found' });
  }
};

// Product photo handler
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// List products by search (query-based)
exports.listSearch = async (req, res) => {
  const query = {};

  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };

    try {
      const products = await Product.find(query).select('-photo').exec();
      res.json(products);
    } catch (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
  }
};

// Decrease product quantity after purchase
exports.decreaseQuantity = async (req, res, next) => {
  const bulkOps = req.body.order.products.map((item) => ({
    updateOne: {
      filter: { _id: item._id },
      update: { $inc: { quantity: -item.count, sold: +item.count } },
    },
  }));

  try {
    await Product.bulkWrite(bulkOps, {});
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Could not update product' });
  }
};
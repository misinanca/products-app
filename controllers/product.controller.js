/* eslint-disable no-param-reassign */
const saveCallback = (err, res, product) => {
  if (err) {
    return res.send(err);
  }

  return res.json(product);
};

function productsController(Product) {
  function post(req, res) {
    const product = new Product(req.body);

    if (!req.body.productName) {
      res.status(400);

      return res.send('Product name is required');
    }

    product.save();
    res.status(201);

    return res.json(product);
  }
  function getProducts(req, res) {
    const { query } = req;
    Product.find(query, (err, products) => {
      if (err) {
        return res.send(err);
      }

      return res.json(products);
    });
  }
  function getProduct(req, res) {
    res.json(req.product);
  }
  function updateProduct(req, res) {
    const { product } = req;
    product.productName = req.body.productName;
    product.productCode = req.body.productCode;
    product.releaseDate = req.body.releaseDate;
    product.description = req.body.description;
    product.price = req.body.price;
    product.starRating = req.body.starRating;
    product.imageUrl = req.body.imageUrl;

    product.save((err) => saveCallback(err, res, product));
  }
  function updateProductProperty(req, res) {
    const { product } = req;

    if (req.body.productId) {
      delete req.body.productId;
    }

    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];

      product[key] = value;
    });

    product.save((err) => saveCallback(err, res, product));
  }
  function deleteProduct(req, res) {
    req.product.remove((err) => {
      if (err) {
        res.send(err);
      }

      return res.sendStatus(204);
    });
  }

  return {
    post,
    getProducts,
    getProduct,
    updateProduct,
    updateProductProperty,
    deleteProduct,
  };
}

module.exports = productsController;

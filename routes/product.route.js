const express = require('express');
const productsController = require('../controllers/product.controller');

function routes(Product) {
  const router = express.Router();
  const controller = productsController(Product);

  router
    .route('/products')
    .post(controller.post)
    .get(controller.getProducts);

  router.use('/products/:productId', (req, res, next) => {
    Product.findOne({ productId: req.params.productId }, (err, product) => {
      if (err) {
        return res.send(err);
      }

      if (product) {
        req.product = product;

        return next();
      }

      return res.sendStatus(404);
    });
  });

  router
    .route('/products/:productId')
    .get(controller.getProduct)
    .put(controller.updateProduct)
    .patch(controller.updateProductProperty)
    .delete(controller.deleteProduct);

  return router;
}

module.exports = routes;

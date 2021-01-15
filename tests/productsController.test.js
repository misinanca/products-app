// eslint-disable-next-line no-unused-vars
const should = require('should');
const sinon = require('sinon');
const productsController = require('../controllers/product.controller');

describe('Products Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty name on post', () => {
      // eslint-disable-next-line no-unused-vars
      const Product = function (product) { this.save = () => {}; };

      const req = {
        body: {
          productCode: 'DGH-2325',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = productsController(Product);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad status: ${res.status.args[0][0]}`);
      res.send.calledWith('Product name is required').should.equal(true);
    });
  });
});

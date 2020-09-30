// modules
const express = require('express');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateOrder = require('../../middleware/validateOrder');
const validateObjectId = require('../../middleware/validateObjectId');

//actions
const placeOrder = require('../../actions/order/placeOrder');
const getOrder = require('../../actions/order/getOrder');
const getAllOrders = require('../../actions/order/getAllOrders');
const getPurchaseOrdersOfUser = require('../../actions/order/getPurchaseOrdersOfUser');
const getPaymentOrdersOfUser = require('../../actions/order/getPaymentOrdersOfUser');
const editOrder = require('../../actions/order/editOrder');

// router instance
const router = express.Router();

/*
 * Routes for /api/order
 * post order
 * get order
 * edit order
 */

// @desc        place order
// @route       POST api/order
// @access      Private
router.post(
  '/',
  [
    auth,
    validateOrder(),
    validateObjectId('seller_id', strings.NO_DATA),
    validateObjectId('book_id', strings.NO_DATA),
    validateObjectId('copy_id', strings.NO_DATA),
    validate,
  ],
  async (req, res) => {
    try {
      const data = {
        buyer: req.user.id,
        seller: req.body.seller_id,
        item: {
          book: req.body.book_id,
          copy: req.body.copy_id,
        },
        paymentMethod: req.body.paymentMethod,
        paymentAccount: req.body.paymentAccount,
        amount: req.body.amount,
      };
      if ((await placeOrder(data)) === strings.SUCCESS) {
        return res.json(strings.SUCCESS);
      }
      return res.status(400).json(strings.FAIL);
    } catch (error) {
      handleError(error.message);
    }
  }
);

// @desc        get order
// @route       POST api/order
// @access      Private
router.get(
  '/',
  [auth, validateObjectId('order_id', strings.NO_DATA), validate],
  async (req, res) => {
    try {
      const order = await getOrder(req.body.order_id);
      if (!order) {
        return res.status(400).json(strings.NO_DATA);
      }
      return res.json(order);
    } catch (error) {
      handleError(error.message);
    }
  }
);

// @desc        get all orders
// @route       POST api/order
// @access      Private
router.get('/all', [auth], async (req, res) => {
  try {
    const order = await getAllOrders();
    if (!order) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(order);
  } catch (error) {
    handleError(error.message);
  }
});

// @desc        get purchase order of user
// @route       POST api/order
// @access      Private
router.get('/purchase-orders', [auth], async (req, res) => {
  try {
    const orders = await getPurchaseOrdersOfUser(req.user.id);
    if (!orders) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(orders);
  } catch (error) {
    handleError(error.message);
  }
});

// @desc        get payment order of user
// @route       POST api/order
// @access      Private
router.get('/payment-orders', [auth], async (req, res) => {
  try {
    const orders = await getPaymentOrdersOfUser(req.user.id);
    if (!orders) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(orders);
  } catch (error) {
    handleError(error.message);
  }
});

// @desc        edit order status
// @route       PUT api/order
// @access      Private
router.put('/', [auth], async (req, res) => {
  try {
    const operation = await editOrder(req.body.order_id);
    if (operation !== strings.SUCCESS) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(operation);
  } catch (error) {
    handleError(error.message);
  }
});

module.exports = router;

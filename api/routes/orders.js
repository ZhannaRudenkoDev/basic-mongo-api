const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
        .then(result => {
            res.status(201).json({
                message: "Order was created",
                createdProduct: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;

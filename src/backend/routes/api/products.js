const express = require('express');
// const request = require('request');
// const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const Product = require('../../models/Product');


//TODO: 
//post Product toevoegen          admin


//get alle producten ophalen      all

// @route    GET api/products
// @desc     Get all products
// @access   Private
router.get('/', auth, 
    async (req, res) => {
        try {
            const products = await Product.find().sort({ date: -1 });
            res.json(products);
        } 
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);





//get product/:id                 all
// @route    GET api/products/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', 
    async (req, res) => {
        try {
          // Check for ObjectId format
          let product;
          if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            product = await Post.findById(req.params.id);
            if (product) {
              return res.json(product);
            }
          }
          return res.status(404).json({ msg: 'product not found' });
        } 
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);




//get searchbyname /products?cat=sport   all

//update product                admin

//delete product                admin


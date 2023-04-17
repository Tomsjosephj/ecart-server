//import express


const express= require('express')

//import controller

const controller= require('../controller/productcontroller')

//import wishlist controller

const wishlistcontroller= require('../controller/wishlistcontroller')


const cartcontroller= require('../controller/cartcontroller')


//to make routing

const router= new express.Router()

//getallproducts

router.get('/products/getallproducts',controller.getallproducts)

//togetindividualproduct

router.get('/products/:id',controller.viewproduct)


//route for add to wishlist

router.post("/products/addtowishlist",wishlistcontroller.addtowishlist)

//to get all wishlist

router.get('/wishlists/getallwishlist',wishlistcontroller.getallwishlist)


//to remove item from wishlist

router.delete('/wishlists/removewishlist/:id',wishlistcontroller.removewishlistitem)

//to add to cart

router.post('/products/addtocart', cartcontroller.addtocart)


//getcartitems

router.get('/cart/getcartitems',cartcontroller.getcartitems)


//removecartitem

router.delete('/cart/item/:id',cartcontroller.removecartitem)

//increment cart item

router.get('/cart/increment/:id',cartcontroller.incrcartitem)

//decrement cart

router.get('/cart/decrement/:id',cartcontroller.decrecartitem)

//emptycart
router.delete('/cart/emptycart',cartcontroller.emptycart)

//export router

module.exports= router
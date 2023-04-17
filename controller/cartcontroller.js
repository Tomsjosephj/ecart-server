const cartitems = require("../models/cartschema")

//logic to add item to cart

exports.addtocart= async(req,res)=>{
    //logic
    const{id,title,price,image,quantity}=req.body

    try{

        const product= await cartitems.findOne({
            id
        })

        if(product){
            //product already in cart
            product.quantity+=1
            //update total price for the product

            product.grandtotal=product.price*product.quantity

            //to save changes in mongo db

            await product.save()
            //send res to client
            res.status(201).json("Items added to your cart")
        }
        else{
            //product is not in the cart

            const newproduct= new cartitems({
                id,title,price,image,quantity,grandtotal:price
            })

            await newproduct.save()

            res.status(201).json("Item added to your cart")

        }

    }
    catch(error){
        res.status(401).json(error)
    }

}


//get cart items


exports.getcartitems = async (req,res)=>{

    try{

    const allitems= await cartitems.find()

    res.status(200).json(allitems)

    }
    catch(error){
        res.status(401).json(error)
    }

}

//remove cart item

exports.removecartitem= async(req,res)=>{
    const{id}=req.params


    try{
        const removeitem= await cartitems.deleteOne({
            id
        })

        if(removeitem){
            const item= await cartitems.find()

            res.status(200).json(item)
        }
        else{
            res.status(401).json("Item not in  the cart")
        }

    }
    catch{

    }

}

//increment cart item
exports.incrcartitem= async(req,res)=>{

    const{id}=req.params

    try{

    const item= await cartitems.findOne({
        id
    })
    if(item){
        item.quantity+=1

        item.grandtotal= item.price*item.quantity

        await item.save()

        //getallitems

        const allitems= await cartitems.find()

        res.status(200).json(allitems)
    }
    else{
        res.status(401).json("Item is not in the cart")
    }
}
catch(error){

    res.status(401).json(error)

}
}

//decrement cart item
exports.decrecartitem= async(req,res)=>{

    const{id}=req.params

    try{

    const item= await cartitems.findOne({
        id
    })
    if(item){
        item.quantity-=1

        if(item.quantity==0){

            const deleteitems= await cartitems.deleteOne({id})

            if(deleteitems){
                const allitems=await cartitems.find()

                res.status(200).json(allitems)

            }
            else{
                res.status(401).json("Item is not in the cart") 

            }
       
        }
     
        else{
         item.grandtotal= item.price*item.quantity

        await item.save()

        //getallitems

        const allitems= await cartitems.find()

        res.status(200).json(allitems)
        }
        
    }
    else{
        res.status(401).json("Item is not in the cart")
    }
}
catch(error){

    res.status(401).json(error)

}
}

exports.emptycart= async (req,res)=>{
    try{

    const items= await cartitems.deleteMany({})

    res.status(200).json("Your cart is empty")
    }
    catch(error){

        res.status(401).json(error)
    
    }
   
}



const wishlists= require("../models/wishlistschema")


//logic to add wishlist 

exports.addtowishlist =async(req,res)=>{

    //destructuring
    //get product details from  req.body

    const{id,title,price,image}=req.body

    try{

    const item= await wishlists.findOne({
        id
    })

    if(item){
        res.status(401).json("Item already present in wishlist")
    }
    else{

        const newproduct= new wishlists({
            id,title,price,image
        })
        //save to db
       await newproduct.save()
       res.status(200).json("Item added to your wishlist")
    }
}
catch (error){

    res.status(401).json(error)

}

}

//logic to get all wishlist
/*

exports.getallwishlist= async (req,res)=>{

    try{

    const items= await wishlists.find()

    res.status(200).json(items)
    }
    catch(error){
        res.status(401).json(error)
    }

}
*/


exports.getallwishlist= async (req,res)=>{

    try{
 
    const allwishlist =await wishlists.find()
 
    //send to frontend

    if(allwishlist){
        res.status(200).json(allwishlist)

    }
    else{
        res.status(400).json("Your wishlist is empty")
    }
 
    
    }
    catch(error){
       res.status(401).json(error)
    }
             
 
 }

 //remove item from wishlist

 exports.removewishlistitem= async (req,res)=>{

    const {id}=req.params

    try{

        const item= await wishlists.deleteOne({
            id
        })

        if(item){

            const allitems= await wishlists.find()

            res.status(200).json(allitems)

        }
        else{

            res.status(401).json("Item is not in the wishlist")

        }

    }
    catch(error){
        res.status(401).json(error)

    }
 }

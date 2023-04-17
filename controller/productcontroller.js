//logic to get allproducts from mongodb
// import products collection

const products= require('../models/productschema')

exports.getallproducts= async (req,res)=>{

   try{

   const allproducts =await products.find()

   //send to frontend

   res.status(200).json(allproducts)
   }
   catch(error){
      res.status(401).json(error)
   }
            

}

//logic to get a particular product from mongodb

exports.viewproduct= async(req,res)=>{

   //get id of the product from paramater

   const id= req.params.id


    try{
   const singleproduct= await products.findOne({
      id
   })
   //send to frontend
   if(singleproduct){
      res.status(200).json(singleproduct)



   }else{

      res.status(400).json("Item not available")

   }

  
}
catch(error){

   res.status(401).json(error)

}
}
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js ";


// Placing the order Using COD method
const placeOrder = async (req,res) => {
   try {

    const {userId, items, address, amount} = req.body;

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "COD",
        payment: false,
        date: Date.now()
    } 

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({success:true, message:"Order placed successfully!"})
    
   } catch (error) {
     console.error(error)
     res.json({success: false, message:error.message})    
   } 
}

// Placing the order Using Stripe method
const placeOrderStripe = async (req,res) => {
    
}


// Placing the order Using Razorpay method
const placeOrderRazorpay = async (req,res) => {
    
}

// All Orders Data for Admin Panel!
const allOrders = async (req,res) => {
    try {
      
      const orders = await orderModel.find({})
      res.json({success:true, orders})

    } catch (error) {
      console.error(error)
      res.json({success: false, message:error.message})    
    
    }
}

// User Order Data for Frontend!
const userOrders = async (req,res) => {
    try {
      
      const {userId} = req.body

      const orders = await orderModel.find({userId})
      res.json({success:true, orders})
      
    } catch (error) {
      console.error(error)
      res.json({success: false, message:error.message})
    }
}

// Update Order Status from Admin Panel !
const updateStatus = async (req,res) => {
    try {
      
      const {orderId, status} = req.body
      
      await orderModel.findByIdAndUpdate(orderId, { status })
      res.json({success:true, message:"Order Status Updated successfully!"})

    } catch (error) {
      console.error(error)
      res.json({success: false, message:error.message})
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}


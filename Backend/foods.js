const mongoose=require('mongoose');
const foodSchema=new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number});
const Food=mongoose.model('Food',foodSchema);
module.exports=Food;
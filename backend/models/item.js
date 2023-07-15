import mongoose from 'mongoose';
const itemSchema = mongoose.Schema({
    name:String,
    phone:String,
    type:String,
    site:String,
    email:String,
    image:String
},{ timestamps: true })
const Item = mongoose.model('Item',itemSchema);
export default Item;
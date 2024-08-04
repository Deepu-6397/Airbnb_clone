const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title : {
      type :String,
      required :true,
  },
  description : String,
  image : {
      filename:{
        type:String,
      },
      url:{
        type:String,
        default: "https://images.unsplash.com/photo-1717137389747-d1d4ced6abc8?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
  },
  price : Number ,
  location : String,
  country : String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});



// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default: "https://images.unsplash.com/photo-1721069275326-5fd80e01ce8d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D",
//     set: (v) => v === "" ? "https://images.unsplash.com/photo-1721069275326-5fd80e01ce8d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D" : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
// });

// it delete the all reviews of that item when any listing is delete
listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing) {
    await Review.deleteMany({_id : {$in: listing.reviews}})
  }
});


const Listing = mongoose.model("Listing" ,listingSchema);
module.exports = Listing ;




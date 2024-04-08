import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({  // Define the schema for the User model
    username:{
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
          
    },
    profilePicture:{
        type:String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png",

    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, {timestamps: true});  // Automatically manage createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);
export default User;

const { createHmac , randomBytes} = require("crypto")
const {Schema, model} = require('mongoose');
const { createTokenForUser } = require("../jsonServiceForAuthentication/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: '/images/avatar',
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},{timestamps: true})

userSchema.pre('save', function (next) {
    const user = this; //this is a user
    if (!user.isModified("password")) return;
     
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex")
    
    this.salt = salt;
    this.password = hashedPassword;

    next()
})

//making the virtual function
userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found!");
    
    const salt = user.salt
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");
   
    if(hashedPassword !== userProvidedHash) throw Error("Incorrect Password")


    const token = createTokenForUser(user)
    return token; 
})



const User = model('user', userSchema)

module.exports = User































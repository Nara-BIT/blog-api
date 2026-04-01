const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add a name'] 
    },
    email: { 
        type: String, 
        required: [true, 'Please add an email'],
        unique: true, // This creates an index in MongoDB to prevent duplicates
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // This hides the password by default when we fetch user data
    }
}, { timestamps: true })
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return;

    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports= mongoose.model('User',UserSchema);
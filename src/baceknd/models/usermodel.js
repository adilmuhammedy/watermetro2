const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter name'],
        min:[4,"Minimun 4 characters are required"],
        max:[30,"Maximum 30 characters are required"]
    },

    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        min:[8,"Minimun 8 characters are required"]
    },
    gender:{    
        type:String,
        required:true,
    },
    DOB:{
        type:Date,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        min:10,
        max:10
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
    });

    userSchema.pre("save", async function(next) {
        if(!this.isModified("password"))
          next();
        this.password = await bcrypt.hash(this.password, 10);  // to store the hashed password
      })
      
      // JWT TOKEN
      userSchema.methods.getJWTToken = function() {
        return jwt.sign({id: this._id}, process.env.JWT_SECRETE, {  // we are making id as _id to verify data in future
          expiresIn: process.env.JWT_EXPIRE,
        });
      };
      
      // compare password
      userSchema.methods.comparePassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      }
      
      //reset password
      userSchema.methods.getResetPasswordToken = function () {
        const resetToken = crypto.randomBytes(20).toString("hex");
      
        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
      
        return resetToken;
      }
      
      
      module.exports = mongoose.model('User', userSchema);
      
      
      
      
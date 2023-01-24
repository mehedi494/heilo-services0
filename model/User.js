const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({

    /* Basic Info */
    name: {
        type: String,
        required: [true, "please provide your name"],
        trim: true
    },

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Please provide your valid email"],
        validate: [validator.isEmail, "please Provide valid email"]

    },
    password: {
        type: String,
        require: [true],
        validate: {
            validator: (value) => {

                return validator.isStrongPassword(value, {
                    minLength: 6,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1
                })

            },
            message: "{VALUE} not Strong Password!! Follow: minumum 6 character  min_number 1, min_Uppercase 1, min_symbol 1 ; eg: Example#1"
        }
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Please provide your phone number"],
        validate: [validator.isMobilePhone],
        message: "{VALUE} is not valid number"
    },
    gender: {
        type: String,
        enum: ["male", "female", "transgender"],

    },
    division: {
        type: String,
        lowercase: true,
        trim: true
    },
    village: {
        type: String,
        trim: true
    },

    /* Education */

    currentInstitution: {
        name: {
            type: String,
            lowercase: true
        },
        class: {
            type: String,
            lowercase: true
        },
        medium: {
            type: String,
            lowercase: true
        },
        background: {
            type: String,
            lowercase: true
        }
    },


    role: {
        type: String,
        required: true,

        enum: {
            values: ["student", "teacher", "admin"],
            message: "{VALUE} is not student or teacher"
        }
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "inactive"
    },


    // balance: {
    //     ref:"UserWallate"
    // },
    /**
     * TEACHER iNFORMATION
     */
    previousInstitution: {
        name: {
            type: String,
            lowercase: true
        },
        department: {
            type: String,
            lowercase: true
        },

    },
    hourlyRate: {
        type: Number,
        min: 0

    },
    tuitionSubjects: [{
        name: {
            type: String,
            trim: true,
            lowercase: true
        },
        class: {
            type: String
        }
    }],


    preferredMedium: [{
        type: String,
        lowercase: true

    }],
    availability: [
        {
            type: String,
            lowercase: true,
            trim: true
        }

    ],
    /* preferredClass: [{
        type: String
    }] */
    rating: {
        type: Number
    }

},
    {
        timestamps: true
    })

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    next()
})
userSchema.methods.hashPassAfterUpdate = function (password) {
    const hashedPassword = bcrypt.hashSync(password);
    return hashedPassword;

}


userSchema.methods.comparePassword = function (password) {

    const isPasswordValid = bcrypt.compareSync(password, this.password)

    return isPasswordValid

}

const User = mongoose.model("User", userSchema)
module.exports = User;
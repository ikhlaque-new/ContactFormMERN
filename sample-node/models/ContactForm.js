const mongoose = require('mongoose');
const validator = require("validator")

var contactFormSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is inValid")
            }
        }
    },
    country: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    }
})


contactFormSchema.set("timestamps", true);
const contactForm = mongoose.model("contactform", contactFormSchema);

module.exports = {
    contactForm
}
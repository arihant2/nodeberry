import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    username: { type: String, trim: true, required: true, maxLength: 20 },
    email: { type: String, trim: true, required: true, unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true, minLength: 8 },

    ownership: { type: String, trim: true, default: 'user' }

}, { timestamps: true } );

userSchema.plugin(uniqueValidator);

export default mongoose.model('user',userSchema);


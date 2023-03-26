import { Schema, model } from 'mongoose';
const UserItem = new Schema({
    userId: Number,
    name: String,
    username: String,
    email: String,
    address: {
        street: String,
        city: String,
        zipcode: String,
    },
    phone: String,
    website: String,
    companyName: String
}, {
    timestamps: true,
});
export default model('UserItem', UserItem);
//# sourceMappingURL=UserItem.js.map
import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        pass: String
    }, {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
export default User;
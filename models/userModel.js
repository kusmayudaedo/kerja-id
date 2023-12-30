import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		username: String,
		email: String,
		password: String,
		firstName: {
			type: String,
			default: 'firstName',
		},
		lastName: {
			type: String,
			default: 'lastName',
		},
		location: {
			type: String,
			default: 'Indonesia',
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		avatar: String,
		avatarPublicId: String,
	},
	{ timestamps: true }
);

UserSchema.methods.toJSON = function () {
	let obj = this.toObject();
	delete obj.password;
	return obj;
};

export default mongoose.model('User', UserSchema);

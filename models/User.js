/*jshint esversion: 8 */
// import { jwt } from 'jsonwebtoken';
const mongoose = require('mongoose');
// const validator  = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
	{
		active: {
			type: Boolean,
			default: true
		},

		access: {
			type: String,
			default: 'basic'
		},

		salt: String,

		imageUrl: String,

		firstName: String,

		lastName: String,

		email: {
			index: true,
			type: String,
			required: [true, 'you must enter an email']
		},

		phone: {
			index: true,
			type: String,
			required: [true, 'you must enter a phone number']
		},

		password: {
			type: String,
			required: [true, 'you must provide a password']
		},

		parks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Park'
			}
		],

		updates: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Update'
			}
		]
	},
	{
		timestamps: true
	}
);

// Create Schema Virtuals
UserSchema.virtual('name').set(function(props) {
	const N = props.split(' ');
	this.firstName = N[0];
	this.lastName = N[1];
});

UserSchema.virtual('name').get(function() {
	return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('subscription').set(function(props) {
	const { access, active, email, twilio } = props;
	this.active = active;
	this.access = access;
	this.email = email;
	if (twilio.phone) this.twilio.phone = twilio.phone;
	if (twilio.subscriptions) this.twilio.subscriptions.push(twilio.subscriptions);
});

UserSchema.virtual('subscription').get(function() {
	return {
		active: this.active,
		access: this.access,
		email: this.email,
		twilio: {
			phone: this.phone,
			subscriptions: this.parks
		}
	};
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

/** Configure Custom Validators */ 
UserSchema.plugin(uniqueValidator, {
	type: 'mongoose-unique-validator'
});

UserSchema.pre('save', async function (next) {
	console.log(`Entered 'pre' save hook`);
	var user = this;
	if (!user.isModified('password')) return next();
	await user.setPassword(user.password);
	next();
});

/**
 * Schema Methods
 * 
 * @property
      " Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above *examples will not work."
 *
 * @see  https://mongoosejs.com/docs/guide.html,
 */

/**
 * Set user password
 * 
 * @param {string} newPassword
 * 
 */
UserSchema.methods.setPassword = async function setPassword(newPassword) {
	console.log(`[User Model] setting password`);
	var salt = await bcrypt.genSaltSync(16);
	this.salt = salt;

	var password = await bcrypt.hashSync(newPassword, this.salt);
	this.password = password;
	console.log(`Pasword has been set to ${this.password}`);
};

/**
 * Validate user  password
 * 
 * @param {string} candidatePassword
 * 
 */
UserSchema.methods.validatePassword = async function(candidatePassword) {
	return new Promise(async (resolve, reject) => {
		await bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err) return reject(err);
			resolve(isMatch);
		});
	});
};

/**
 * Generate web token
 * 
 * @returns {jwt} token
 * 
 */
UserSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 30);
	const token = jwt.sign(
		{
			_id: this._id,
			userName: this.userName,
			access: this.access,
			expirationDate: parseInt(expirationDate.getTime() / 1000, 10)
		},
		require('../config/keys').secret,
		{ expiresIn: '30 days' }
	);
	return token;
};

/**
 * 
 */
UserSchema.methods.toAuthJSON = function() {
	return {
		_id: this._id,
		name: this.name,
		email: this.email,
		token: this.generateJWT()
	};
};

module.exports = mongoose.model('User', UserSchema);

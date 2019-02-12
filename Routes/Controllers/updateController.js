/*jshint esversion: 6 */
const db = require('../../models');
const { respond } = require('../../lib');

/**
 * @public
 * @function index
 * @param {request} req 
 * @param {response} res 
 * @method GET /api/updates 
 * @desc Get all updates's  
 */
function index(req, res) {
	db.Update
		.find()
		.sort({
			username: 1,
			phone: 1
		})
		.then((users) => respond(res, true, users))
		.catch((err) => respond(res, false, err));
}

/**
 * @public
 * @function read
 * @param {request} req 
 * @param {response} res 
 * @method GET api/update/:updateId 
 * @desc  Read an update with '_id:updateId'
 */
function read(req, res) {
	db.Update.findById(req.params.updateId)
		.then((user) => respond(res, true, user))
		.catch((err) => respond(res, false, err));
}

/**
 * @public
 * @function create
 * @param {request} req 
 * @param {response} res 
 * @method POST /api/update/ 
 * @desc Create a new update
 */
function create(req, res) {}

function send(req, res) {
    const messageSender = require('../lib');  
    
    // Get message info from form submission   
    const message = req.body.message;
    const parkID = req.body.parkID;   
    console.log(req.session);   
    if (!message) {
        respond(res, false, { msg:'Reason: Empty message.'});   
    } else if (typeof (parkID) === 'string') {
        respond(res, false, {msg:'Reason: No park selected'});
    }
    else {
        // TODO prettify res with message displayed     
        respond(res, true, { msg:`Message: ${message}\nSent to parks: ${parkID}\nSent by: ${req.session.username}`});
        
        // Send messages to all users subscribed
    // to parks in Parks     
        db.User
            .find({ parks: { $in: parkID } })
            .populate("subscription")
          .then((users) => messageSender.sendMessageToSubscribers(users, message, ''))
          .catch((err) => respond(res, true, err));
    }

}

// @route UPDATE api/message/:messageId @desc Update a message with '_id =
// messageId' @access Public
function edit(req, res) {}

// @route DELETE api/message/:messageId @desc Delete a message with '_id =
// messageId' @access Public
function destroy(req, res) { }

// const express = require('express');
// const router = express.Router();

// // @route /api/messages
// router.route('/api/messages')
//   // .get(index)
//   // .post(create);

// // @route /api/messages/_id
// router.route('/api/messages/:messagId')
//   // .get(read)
//   // .put(update)
//   // .delete(destroy);

module.exports = /*router*/{
    index,
    read,
    create,
    edit,
    send,
    destroy
};
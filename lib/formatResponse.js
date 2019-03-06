/*jshint esversion: 8 */

/**
 * Creates a response object
 *
 * @param {object} res
 * @param {boolean} success
 * @param {Object} payload
 * @param {string} message
 * 
 */
async function respond(res, success, payload = {}, message = "") {

  if (!res || (!success && !payload  && !message)) message = new Error("Something went wrong");
  res.status(success ? 200 : 500).json({ success, payload, message });
}

module.exports = respond;

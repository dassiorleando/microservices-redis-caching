/**
 * Empty service.
 */

/**
 * A function (show case).
 * @param {boolean} isPublic To know if the route is public or not (optinal).
 * @returns {string} Just a simple message for now.
 */
exports.aFunction = function (isPublic = false) {
  return isPublic ? 'Public route' : 'Protected route';
}

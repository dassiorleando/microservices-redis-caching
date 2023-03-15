/**
 * Some utilities.
 */

/**
 * Default callback doing nothing
 * @returns {void}
 */
exports.noop = function () {
  // Nothing
}

/**
 * Prints error
 * @param {Object} error The error to show
 * @returns {void}
 */
exports.error = function (error) {
  console.error('❌ Something went wrong: ', error);
}

/**
 * To initialize some stuff when starting
 * @param {Object} config The config we defined into the corresponding folder
 * @returns {boolean} If or not we succeeded to initiate the App
 */
exports.init = function (config) {
  if (!config) return false;
  console.log('Initing configs ...');

  console.log('Microservice Inited');
  return true;
}

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function (err) {
  var output;

  try {
    var fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('.$') + 2, err.errmsg.lastIndexOf('_1'));
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function (err) {
  var message = '';

  if (typeof err === 'string') {
    message = err;
  } else if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      case 'LIMIT_FILE_SIZE': // multer error on file size
        message = err.message;
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }

  return message;
};

exports.objectToArray = function (object) {
  if (!object || typeof object !== 'object') return [];
  const array = [];

  for (const field in object) {
    if (object.hasOwnProperty(field)) {
      let value = object[field];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      array.push(field, value && value !== 'null' ? value : '');
    }
  }

  return array;
}

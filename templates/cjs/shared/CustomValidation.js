const empty = require('./empty');

/**
 * Image Data URL validation.
 */
exports.isImageDataUrl = function(value) {
  if (empty(value))
    return true;
  if (!value.match(/^data:image\/[\w-+\d.]+;\w+,/))
    throw new Error('Invalid as image Data URL');
  return true;
}
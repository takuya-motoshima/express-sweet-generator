import empty from './empty';

/**
 * Image Data URL validation.
 */
export function isImageDataUrl(value) {
  if (empty(value))
    return true;
  if (!value.match(/^data:image\/[\w-+\d.]+;\w+,/))
    throw new Error('Invalid as image Data URL');
  return true;
}
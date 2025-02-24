export default (color) => {
  const hex = color.replace(/#/, '');
  const R = parseInt(hex.substr(0, 2), 16);
  const G = parseInt(hex.substr(2, 2), 16);
  const B = parseInt(hex.substr(4, 2), 16);

  // Calculate the perceptive luminance (aka luma) - human eye favors green color...
  const luma = ((0.299 * R) + (0.587 * G) + (0.114 * B)) / 255;

  // Return (almost) black for bright colors, white for dark colors
  return luma > 0.5 ? '#212121' : '#FFFFFF';
};

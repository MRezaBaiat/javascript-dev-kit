const initFileName = (fileName: string) => {
  return fileName.replace(/[/\\?%*:|"<>]/g, '-');
};

const getFileName = (path: string): string => {
  return decodeURIComponent(path)
    .replace(/^.*[\\\/]/, '')
    .replace('primary:', '');
};

const getFileExtension = (filename: string): string => {
  return filename.split('.').pop() as string;
};

const generateNameFromUrl = (url: string) => {
  url = decodeURIComponent(url);
  url = url
    .replace('http://', '')
    .replace('https://', '')
    .replaceAll('/', '_')
    .replaceAll(String.fromCharCode(92), '_')
    .replaceAll('|', '_')
    .replaceAll('?', '_')
    .replaceAll('*', '_')
    .replaceAll('<', '_')
    .replaceAll('>', '_')
    .replaceAll('"', '_')
    .replaceAll(':', '_')
    .replaceAll('.', '_');
  return url;
};

export default {
  initFileName,
  generateNameFromUrl,
  getFileName,
  getFileExtension
};

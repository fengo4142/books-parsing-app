import fs from 'fs'

export const readSingleFile = (filename) => {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    console.log(data)
  });
}

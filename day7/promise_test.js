var fs = require('fs');

function fileWritePromise(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile (path, data, (err) => {
            if(err) {
                reject(err);
            }
            else {
                console.log('actually wrote file');
                resolve();
            }
        });
    });
}

function fileReadPromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

var fp = fileReadPromise('test.txt').then(
    (val) => {
        console.log(val.toString());
        return fileWritePromise('out_test.txt', val);
    }
).then(
    () => {
        console.log('write file done'); 
    }
)
.catch(
    (err) => {
        console.log(err);
    }
);
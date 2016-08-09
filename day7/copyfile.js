var fs = require('fs');

function copyData(savPath, srcPath) {
    console.log('copyData(' + savPath + ', ' + srcPath);
    fs.readFile(srcPath, 'utf8', function (err, data) {
            console.log('reading file ' + srcPath);
            if (err) throw err;
            fs.writeFile (savPath, data, function(err) {
                if (err) throw err;
                console.log('complete');
            });
        });
}
copyData('out.txt', 'in.txt');
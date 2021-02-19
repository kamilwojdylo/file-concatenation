import fs from 'fs';

function concatFiles(...args) {
  const cb = args.pop();
  const dst = args.pop();

  if (args.length < 1) {
    console.log("minimum 3 args");
    return 0;
  }

  let idx = 0;
  let fileExists = false;

  fs.readFile(dst, (err) => {
    if (!err) {
      fs.rm(dst, () => console.log('removed'));
      return;
    }
    fs.writeFile(dst, '', () => {
    });
  });

  function concat() {
    fs.readFile(args[idx], (err, fileData) => {
      fs.appendFile(dst, fileData, () => {
        if (idx === args.length) {
          return cb();
        }
        concat();
      });
      idx++;
    });
  }

  concat();
}

function finalCb() {
  console.log('Concatenation completed.');
}

concatFiles('src1.txt', 'src2.txt', 'src3.txt', 'src4.txt', 'src5.txt', 'dst', finalCb);

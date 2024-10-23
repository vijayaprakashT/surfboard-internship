const http = require("http");

const options = {
  "method": "POST",
  "hostname": "localhost",
  "port": "3000",
  "path": "/create",
  "headers": {
    "Content-Type": "application/json",
    "Content-Length": "55"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];
console.log('-------------------------')
  req.on('error', (e) => {
    console.log(`error occured ------ ${e.message}`)
  })

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({name: 'nanananan', age: 27, gender: 'male'}));
req.end();
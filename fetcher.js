const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];


if (args.length !== 2) {
  console.log('Usage: node fetcher.js <url> <file path>');
  process.exit(1);
}

const downloadFile = function() {
  request(url, (error, response, body) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
    if (response.statusCode !== 200) {
      console.log(`Error: ${response.statusCode} ${response.statusMessage}`);
      process.exit(1);
    }
    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    });
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// if a file already exists in the file path prompt user. 
if (fs.existsSync(filePath)) {
  rl.question(
    `A file named ${filePath} already exists. Do you want to overwrite? (Y/N)`,
    (answer) => {
      if (answer.toUpperCase() !== "Y") {
        console.log(" File not Overwritten!!");
        process.exit(1);
      }
      downloadFile();
      console.log("File has been overwritten!!")
      process.exit(1);
    }
  );
} else {
  downloadFile();
}

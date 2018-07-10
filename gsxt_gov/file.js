const path = require('path');
const fs = require('fs');
const util = require("util");

module.exports = {
  write(filePath, data) {
    try {
      // fs.unlinkSync(path.resolve(__dirname, filePath));
      fs.writeFileSync(path.resolve(__dirname, filePath),
        util.inspect(data, {
          depth: null
        })
      );
    } catch (error) {
      console.error(error)
    }
  }
}
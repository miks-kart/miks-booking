const fs = require("fs");

fs.unlink("optimizedList.json", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File deleted successfully");
});

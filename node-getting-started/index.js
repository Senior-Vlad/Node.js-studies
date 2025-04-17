// ---------------------- Module imports ----------------------
const http = require("http"); // Core HTTP module to create the server
const dt = require("./datemodule.js"); // Custom module to return current date/time
const url = require("url"); // Module to parse incoming URL and query string
const fs = require("fs"); // File System module to read, write, rename, delete, etc.

// ---------------------- Server ----------------------
const server = http.createServer((req, res) => {
  // Basic response setup
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8"); // HTML output with UTF-8 support

  // Print current time and requested URL
  res.write(
    "Current time is: " + dt.myDateTime() + "<br>" + req.url + "<br><br>"
  );

  // Parse URL query string
  const q = url.parse(req.url, true).query;
  const txt = `${q.year || ""} ${q.month || ""} ${q.day || ""},${q.time || ""}`; // formatted string

  // Display parsed query data
  res.write(txt + "<br><br>");

  // ---------------------- File operations ----------------------

  // Append txt to file mynewfile1.txt
  fs.appendFile("mynewfile1.txt", txt + "\n", function (err) {
    if (err) throw err;
    console.log("✔️ Appended to mynewfile1.txt");
  });

  // Create a new empty file mynewfile2.txt
  fs.open("mynewfile2.txt", "w", function (err, file) {
    if (err) throw err;
    console.log("✔️ Created mynewfile2.txt");
  });

  // Write txt content to mynewfile3.txt (overwrite if exists)
  fs.writeFile("mynewfile3.txt", txt, function (err) {
    if (err) throw err;
    console.log("✔️ Written to mynewfile3.txt");
  });

  // Append a custom string to mynewfile1.txt
  fs.appendFile("mynewfile1.txt", "\nappended text...\n", function (err) {
    if (err) throw err;
    console.log("✔️ Appended custom text");
  });

  // Read and display index.html content in browser
  fs.readFile("index.html", function (err, data) {
    if (err) {
      res.write("<br>Error loading index.html");
    } else {
      res.write(data);
    }
    res.end(); // Close the response stream
  });

  // Clear mynewfile3.txt, write new content, then rename
  fs.truncate("mynewfile3.txt", 0, function () {
    fs.writeFile("mynewfile3.txt", "This is the modified text", function (err) {
      if (err) throw err;
      console.log("✔️ Replaced content in mynewfile3.txt");

      fs.rename("mynewfile3.txt", "myNewRenamedFile3.txt", function (err) {
        if (err) throw err;
        console.log("✔️ Renamed to myNewRenamedFile3.txt");
      });
    });
  });

  // Delete mynewfile2.txt
  fs.unlink("mynewfile2.txt", function (err) {
    if (err) throw err;
    console.log("🗑️ Deleted mynewfile2.txt");
  });
});

// ---------------------- Start server ----------------------
server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

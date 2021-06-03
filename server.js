const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });
connectDB();

//Importing route files
const users = require("./routes/users");
const posts = require("./routes/posts");

app.use(express.json());

app.use("/users", users);
app.use("/posts", posts);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
      .yellow.underline
  );
});

// //Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`.red);
//   //Close the server and exit the process
//   server.close(() => process.exit(1));
// });

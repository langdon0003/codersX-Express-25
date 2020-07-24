const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const bookRoute = require("./routes/book.route");
const transactionRoute = require("./routes/transaction.route");
const authRoute = require("./routes/auth.route");
const cartRoute = require('./routes/cart.route');

const cookieMiddleware = require("./middleware/cookie.middleware");
const authMiddleware = require("./middleware/auth.middleware");
const sessionMiddleware = require("./middleware/session.middleware");

const app = express();
const port = 8080;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser("xxx"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(sessionMiddleware);

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/books",bookRoute);
app.use("/transactions", authMiddleware.requireAuth, transactionRoute);
app.use("/auth", authRoute);
app.use('/cart', cartRoute);

app.get("/", authMiddleware.requireAuth, (req, res) => res.render("index"));

app.listen(port, () => console.log("Server listening on port " + port));

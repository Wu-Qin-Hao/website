const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 3000;

// 在路由之前添加中间件
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码的请求体
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(express.static("views"));

// 配置 session 中间件
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// 定义路由
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // 这里可以添加数据库查询等逻辑来验证用户名和密码
  // 假设用户名为"admin"，密码为"123456"为有效用户
  if (username === "admin" && password === "123456") {
    req.session.user = username; // 设置会话中的用户信息
    res.redirect("/"); // 登录成功，重定向到首页
  } else {
    res.send("Invalid username or password");
  }
});

// 监听端口
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

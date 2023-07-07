const express = require("express");
const bcrpyt = require("bcryptjs");
const cors = require("cors");
const app = express();
const {
  createUser,
  findUser,
  addTask,
  deleteTask,
  updateTask,
  fetchTasks,
  fetchAll,
} = require("./crud");
const user = express.Router();
const admin = express.Router();

const { ADMIN_MAIL, ADMIN_PASSWORD } = require("../constants/Admin.js");

app.use(cors());
app.get("/", (req, res) => {
  res.send("home page");
  // send the home page (file)
});

app.get("/user", (req, res) => {
  res.send("user login page");
  // send the user home page (file)
});

app.get("/admin", (req, res) => {
  res.send("admin login page");
  // send the admin home page (file)
});

// User auth test db
/**
 * const user = {
 *  name: 'name',
 *  email: 'email',
 *  password: 'password'
 *  tasks: [
 *      {
 *          title: 'title',
 *          description: 'description',
 *          date: 'date',
 *          ststus: 'pending',
 *          user: 'email'
 *      }, ]
 *  }
 **/

// Middleware
user.use(express.json());
admin.use(express.json());

// User Operations
user.get("/profile", (req, res) => {
  res.send("user profile page");
  // send the user profile page (file)
});

user.get("/dashboard", (req, res) => {
  res.send("user dashboard page");
  // send the user dashboard page (file)
});

user.post("/", (req, res) => {
  res.status(200).end();
});

user.post("/register", async (req, res) => {
  try {
    const salt = await bcrpyt.genSalt(10);
    const hashedPassword = await bcrpyt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      tasks: [],
    };

    if (await createUser(user)) {
      res.status(201).send(user);
    } else {
      res.status(500).send(false);
    }
  } catch (error) {
    res.status(500).send(false);
  }
  // send the user registred page (file)
});

user.post("/login", async (req, res) => {
  console.log(req.body.email, req.body.password);
  findUser(req.body.email, req.body.password).then((user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send(false);
    }
  });
});

user.post("/tasks", (req, res) => {
  const email = req.body.email;
  fetchTasks(email).then((tasks) => {
    if (tasks) {
      res.status(200).send(tasks);
    } else {
      res.status(400).send();
    }
  });
});

user.post("/addtask", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const email = req.body.email;
  console.log(email, req.body.task);
  addTask(email, req.body.task)
    .then((taskSet) => {
      console.log(taskSet);
      res.status(201).send(taskSet).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to add task").end();
    });
});

user.post("/deletetask", (req, res) => {
  const email = req.body.email;
  // console.log(email, req.body.task.title)
  deleteTask(email, req.body.task)
    .then((taskSet) => {
      console.log(taskSet);
      res.status(201).send(taskSet).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to delete task").end();
    });
});

user.post("/updatetask", (req, res) => {
  const email = req.body.email;
  updateTask(email, req.body.task, req.body.updatedTask)
    .then((taskSet) => {
      console.log(taskSet);
      res.status(201).send(taskSet).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Failed to update task").end();
    });
});

// Admin Operations
admin.get("/dashboard", (req, res) => {
  res.send("admin dashboard page");
  // send the admin dashboard page (file)
});

admin.post("/fetchAll", (req, res) => {
  const Admin = req.body.email;
  const password = req.body.password;
  if (Admin === ADMIN_MAIL && password === ADMIN_PASSWORD) {
    fetchAll().then((users) => {
      if (users) {
        res.status(201).send(users).end();
      } else {
        res.status(500).send("Access Denied").end();
      }
    });
  } else {
    res.status(500).send("Access Denied").end();
  }
});

admin.post("/addtask", (req, res) => {
  const email = req.body.email;
  const taskSet = addTask(email, req.body.task);
  if (taskSet) {
    res.status(201).send(taskSet).end();
  } else {
    res.status(500).send("Failed to add task").end();
  }
});

admin.post("/deletetask", (req, res) => {
  const email = req.body.email;
  const taskSet = deleteTask(user.tasks, req.body.task);
  if (taskSet) {
    res.status(201).send(taskSet).end();
  } else {
    res.status(500).send("Failed to delete task").end();
  }
});

admin.post("/updatetask", (req, res) => {
  const email = req.body.email;
  const taskSet = updateTask(user.tasks, req.body.task, req.body.updatedTask);
  if (taskSet) {
    res.status(201).send(taskSet).end();
  } else {
    res.status(500).send("Failed to update task").end();
  }
});

app.use("/user", user);
app.use("/admin", admin);

app.listen(5000).on("listening", () => {
  console.log("Server is running on port 5000");
});

/**
 * It's time to test the d3 and dashboard if possible
 **/

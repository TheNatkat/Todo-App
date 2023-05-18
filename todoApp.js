require("dotenv").config();
const express = require("express");
const { Client } = require("pg");
const port = 8080;
const bodyParser = require("body-parser");
const yup = require("yup");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
    },
  },
});

function errorHandler(err, req, res, next) {
  res.status(500).json({ error: "Something went wrong" });
}

const app = express();

app.use(bodyParser.json());

const todoCheck = yup.object().shape({
  title: yup.string().required(),
  is_completed: yup.boolean().required(),
});

app.get("/todos", async (req, res, next) => {
  try {
    const rows = await prisma.todos.findMany();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.get("/todos/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkingId = await prisma.todos.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!checkingId) {
      return res.status(404).json({ message: "not found" });
    }

    const rowData = await prisma.todos.findMany({
      where: {
        id: Number(id),
      },
    });

    res.json(rowData);
  } catch (err) {
    next(err);
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    await todoCheck.validate(req.body);
  } catch (err) {
    return res.status(400).json({ error: "invalid" });
  }
  const { title, is_completed } = req.body;

  try {
    const newRow = await prisma.todos.create({
      data: {
        title,
        is_completed,
      },
    });
    res.status(201).json(newRow);
  } catch (err) {
    next(err);
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    await todoCheck.validate(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const { id } = req.params;
  const { title, is_completed } = req.body;

  if (typeof id !== "number")
    return res.status(404).json({ error: "Invalid id" });

  try {
    const checkingId = await prisma.todos.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!checkingId) {
      return res.send(404);
    }

    const updatedRow = await prisma.todos.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        is_completed,
      },
    });

    res.status(200).json(updatedRow);
  } catch (err) {
    next(err);
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkingId = await prisma.todos.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!checkingId) {
      return res.status(404).json({ message: "not found" });
    }

    await prisma.todos.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(port);
console.log(`App running on http://localhost:${port}`);

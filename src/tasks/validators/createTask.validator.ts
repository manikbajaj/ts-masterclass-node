import { checkSchema } from "express-validator";

export const createTaskValidator = checkSchema({
  title: {
    in: ["body"], // 'query'
    notEmpty: true,
    errorMessage: "Title is required",
    isString: true,
    isLength: {
      options: {
        max: 100,
      },
      errorMessage: "Title should atleast be 100 chars",
    },
    trim: true,
  },
  description: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Description is required",
    isString: true,
    trim: true,
  },
  status: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Status must be one of the specified values",
    isIn: {
      options: [["todo", "inProgress", "completed"]],
    },
  },
  priority: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Priority must be one of the specified values",
    isIn: {
      options: [["low", "normal", "high"]],
    },
  },
  dueDate: {
    in: ["body"],
    errorMessage: "Due date must be a valid ISO8601 string",
    isISO8601: true,
  },
});

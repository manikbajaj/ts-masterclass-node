import { checkSchema } from "express-validator";

export const updateTaskValidator = checkSchema({
  _id: {
    in: ["body"],
    errorMessage: "Valid document Id not optional",
    notEmpty: true,
    isMongoId: true,
  },
  title: {
    in: ["body"], // 'query'
    optional: true,
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
    optional: true,
    errorMessage: "Description is required",
    isString: true,
    trim: true,
  },
  status: {
    in: ["body"],
    optional: true,
    errorMessage: "Status must be one of the specified values",
    isIn: {
      options: [["todo", "inProgress", "completed"]],
    },
  },
  priority: {
    in: ["body"],
    optional: true,
    errorMessage: "Priority must be one of the specified values",
    isIn: {
      options: [["low", "normal", "high"]],
    },
  },
  dueDate: {
    in: ["body"],
    optional: true,
    errorMessage: "Due date must be a valid ISO8601 string",
    isISO8601: true,
  },
});

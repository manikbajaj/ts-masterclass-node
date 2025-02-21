import { checkSchema } from "express-validator";

export const getTasksValidator = checkSchema({
  limit: {
    in: ["query"],
    errorMessage: "Limit must be a valid integer",
    optional: true,
    isInt: true,
    toInt: true,
  },
  page: {
    in: ["query"],
    errorMessage: "Page must be a valid integer and greater than or equal to 1",
    optional: true,
    isInt: {
      options: { min: 1 },
    },
    toInt: true,
  },
  order: {
    in: ["query"],
    errorMessage: "Order must be one of ['asc', 'dsc']",
    optional: true,
    isIn: {
      options: [["asc", "dsc"]],
    },
  },
});

import * as z from "zod";

const FIELD_REQUIRED_STR = "This field is required";

export const taskSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .optional(),

  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, "Task Name is required")
    .max(150, "Maximum 150 characters")
    .trim(),

  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, "Description is required")
    .trim(),

  status: z
    .string({
      invalid_type_error: "Status must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, "Status is required")
    .trim(),

  dueDate: z
    .string({
      invalid_type_error: "Due date must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, "Due date is required")
    .trim(),

  priority: z
    .string({
      invalid_type_error: "Priority must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, "Priority is required")
    .trim(),

  assignee: z
    .string({
      invalid_type_error: "Assignee must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(1, "Assignee is required")
    .trim(),

  createdAt: z
    .string({
      invalid_type_error: "Created date must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .optional(),

  updatedAt: z
    .string({
      invalid_type_error: "Updated date must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;

import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup.string().required().min(3).max(30),
    email: yup.string().email().required().min(3).max(30),
    password: yup.string().required().min(5).max(20),
    confirmPassword: yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([yup.ref('password')], 'Confirm Password should matches with password') : field)
}).required();

export const loginSchema = yup.object({
    email: yup.string().email().required().min(3).max(30),
    password: yup.string().required().min(5).max(20),
}).required();
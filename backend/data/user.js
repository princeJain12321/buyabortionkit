import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("123455678", 10), // Hashing the password for security,
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "johndoe@email.com",
        password: bcrypt.hashSync("123455678",10),
        isAdmin: false
    }
]

export default users;
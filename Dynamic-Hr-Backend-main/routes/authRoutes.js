const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { userModel } = require("../models/user");

const {
    loginUser,
    addEmployee,
    getEmployee,
    deleteEmployee,
    specificEmployee,
    editEmployee,
    adminCount,
    salCount,
    empCount,
    adminRecords,
    deleteAdmin,
    logout,
    leavereq,
    leaveStatus,
    pendingRequest,
    editAdmin,
    getAdmin,
    payroll,
    allpendingRequest,
    event,
    getEvent,
    deleteEvent,
    registerAdmin,
    positions,
    addPosition,
    deletePosition,
    trainingMaterial,
    AddtrainingMaterial,
    deleteMaterial,
} = require("../controllers/authController");
const { TrainingMaterial } = require("../models/user");

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

//Routes
router.post("/login", loginUser);
router.post("/register", registerAdmin);

router.get("/logout", logout);
router.get("/employee", getEmployee);
router.get("/employee/:id", specificEmployee);

router.get("/admin/:id", getAdmin);
router.put("/edit_admin/:id", editAdmin);
router.post('/add-mock-user', async (req, res) => {
    try {
        // Create mock data
        const mockUser = new userModel({
            name: 'John Doe',
            email: 'mrhr@gmail.com',
            password: '12345678', // In a real app, ensure passwords are hashed
            salary: 50000,
            address: '1234 Elm Street, Springfield',
            category: 'Full-time',
            position: 'Software Engineer',
            image: 'profile.jpg',
            dateofbirth: new Date('1990-05-12'),
            gender: 'Male',
            maritalStatus: 'Single',
            bankAccount: 123456789,
            IFSC: 'ABC0123456',
            taxId: 987654321,
            postGraduation: 'MSc Computer Science',
            graduation: 'BSc Computer Science',
            schooling: 'Springfield High School',
            hobbies: 'Reading, Hiking',
            doj: new Date('2020-01-15'),
        });

        // Save mock user to the database
        await mockUser.save();

        // Respond with success message
        res.status(201).json({ message: 'Mock user added successfully', data: mockUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the user', error });
    }
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/images");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
});

router.get('/departments', (req, res) => {
    res.send(['IT', 'Software', 'Law', 'Finance']); // Example departments
});

router.post("/add_employee", upload.single("image"), addEmployee);
router.put("/edit_employee/:id", editEmployee);

router.delete("/delete_employee/:id", deleteEmployee);
router.delete("/delete_admin/:id", deleteAdmin);
router.get("/leave_requests", leavereq);
router.post("/leave_requests/:id", leaveStatus);
router.get("/payroll", payroll);
router.post("/event", event);
router.get("/events", getEvent);
router.delete("/event_delete/:id", deleteEvent);

router.get("/pending_leave_requests", allpendingRequest);
router.get("/pending_leave_requests/:id", pendingRequest);

router.get("/admin_records", adminRecords);
router.get("/admin_count", adminCount);
router.get("/employee_count", empCount);
router.get("/salary_count", salCount);

router.get('/positions', positions);
router.post('/positions', addPosition);
router.delete('/positions/:id', deletePosition);
router.get('/trainingModules', trainingMaterial);
router.post('/trainingModules', AddtrainingMaterial);
router.delete('/trainingModules/:id', deleteMaterial);

module.exports = router;

const express = require('express');
const { showAllStudents,createAllList,showSingleData,editData,studentDataStore, deleteStudent, updateData, showAllUnverifiedStudents, verifyAccount, verification, verifiedSMSData } = require('../controllers/studentController');
const multer = require('multer');
const path = require('path');
const { verify } = require('crypto');

// Init Router
const router = express.Router();

// multer config
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/students/'));
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const studentPhotoMulter = multer({
    storage : storage 
}).single('student-photo');


// Route
router.get('/', showAllStudents);
router.get('/verification/:id', verification);
router.post('/verification/:id', verifiedSMSData);
router.get('/unverified', showAllUnverifiedStudents);
router.get('/create', createAllList);
router.post('/create', studentPhotoMulter, studentDataStore);

router.get('/verify/:token', verifyAccount);
router.get('/edit/:id', editData);
router.post('/update/:id', studentPhotoMulter, updateData);
router.get('/delete/:id', deleteStudent);
router.get('/:id', showSingleData);

// Export Router
module.exports = router;
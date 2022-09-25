const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const sendMail = require('../utility/sendMail');
const sendSMS = require('../utility/sendSMS');


// showAllStudents
const showAllStudents = (req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));

    const verified = students.filter( data => data.isVerified == true);
    res.render('students/index', {
        students : verified
    })
}

const showAllUnverifiedStudents = (req, res) => {
    //Unverified Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const unverified = students.filter( data => data.isVerified == false);
    res.render('students/unverified', {
        students : unverified
    })
}

// createAllList
const createAllList = (req, res) => {
    res.render('students/create')
}


// showSingleData
const showSingleData = (req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const { id } = req.params;
    const student = students.find( data => data.id == id )

    res.render('students/show', { student });
}

// editData
const editData = (req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const {id} = req.params;
    const edit_data = students.find( data => data.id == id);
    res.render('students/edit', {
        student : edit_data
    });
}

// studentDataStore
const studentDataStore = async (req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const { name, email, cell, location } = req.body;
    const pin = Math.floor(Math.random() * 100000000);

    const stringPin = '' + pin;
    let otp = '';

    if ( stringPin.length > 4 ) {
        otp = stringPin.slice(0, 4);
    }

    // Get Last ID
    let last_id = 1;
    if (students.length > 0) {
        last_id = students[students.length - 1].id + 1
    }

    // Token 
    const token = Date.now() +'_'+ Math.floor(Math.random() * 10000000);

    // Send Mail
    await sendMail.verifyAccount(email, 'Verify Account', {
        name, email, token, cell
    });

    // Push New Data
    students.push({
        id: last_id,
        name: name, 
        email: email, 
        cell: cell, 
        location: location,
        photo : req.file ? req.file.filename : 'avatar.png',
        isVerified : false,
        token : token,
        otp : otp
    });

    // Write Data
    writeFileSync(path.join(__dirname, '../database/students.json'), JSON.stringify(students));

    // Redirect
    res.redirect('/students')
}


// Delete Data
const deleteStudent = (req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const { id } = req.params;
    const newStudent = students.filter( data => data.id != id);

    writeFileSync(path.join(__dirname, '../database/students.json'), JSON.stringify(newStudent));

    res.redirect('/students');
}

// updateData 
const updateData = (req, res ) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const { id } = req.params;
    const updateIndex = students.findIndex(data => data.id == id);
    
    students[updateIndex] = {
        ...students[updateIndex],
        name : req.body.name,
        email : req.body.email,
        cell : req.body.cell,
        location : req.body.location
    }

    // Write Data
    writeFileSync(path.join(__dirname, '../database/students.json'), JSON.stringify(students));

    res.redirect('/students');
}

// Verify Account
const verifyAccount = (req, res) => {

    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));

    // token
    const token = req.params.token;

    const updateIndex = students.findIndex(data => data.token == token);
    
    students[updateIndex] = {
        ...students[updateIndex],
        isVerified : true,
        token : ''
    }

    // Write Data
    writeFileSync(path.join(__dirname, '../database/students.json'), JSON.stringify(students));

    res.redirect('/students/');
}


const verification = async(req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));
    const { id } = req.params;

    const findData = students.find(data => data.id == id);

    await sendSMS(findData.cell, `Hi ${ findData.name }! Your Verification OTP is ${ findData.otp } `)


    res.render('students/SMS', {
        name : findData.name,
        id : findData.id
    })
}

const verifiedSMSData = (req, res) => {
    // Student Data
    const students = JSON.parse(readFileSync(path.join(__dirname, '../database/students.json')));

    const { otp } = req.body;

    console.log(otp);
    const updateIndex = students.findIndex(data => data.otp == otp);
    
    students[updateIndex] = {
        ...students[updateIndex],
        isVerified : true,
        otp : ''
    }

    // Write Data
    writeFileSync(path.join(__dirname, '../database/students.json'), JSON.stringify(students));

    res.redirect('/students');
}



// Export Modules
module.exports = {
    showAllStudents,
    createAllList,
    showSingleData,
    editData,
    studentDataStore,
    deleteStudent,
    updateData,
    showAllUnverifiedStudents,
    verifyAccount,
    verification,
    verifiedSMSData
}
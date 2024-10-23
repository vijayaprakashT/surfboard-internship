const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectDb,dbClient } = require('./connectdb');

connectDb();
app.use(express.json());

//app.use(bodyParser.json());

//const empStorage = [];

// Create a new employee
app.post('/create', async (request, response) => {
    console.log('req===========>>>', request.body);
    try {
    const data = request.body;

    const id = Math.random().toString().slice(2, 10);
    data.empId= id;

    // Check for missing fields
    // if (data.name == null && data.age == null && data.gender == null) {
    //     console.log("All fields are required");
    //     return response.status(400).send({ status: 'ERROR', message: "All fields are required", data });
    // }

    // // Check for individual missing fields
    // if (data.FIRST_NAME == null) {
    //     console.log("Name required");
    //     return response.status(400).send({ status: 'ERROR', message: "Name required", data });
    // }

    // if (data.age == null) {
    //     console.log("Age required");
    //     return response.status(400).send({ status: 'ERROR', message: "Age required", data });
    // }

    // if (data.gender == null) {
    //     console.log("Gender required");
    //     return response.status(400).send({ status: 'ERROR', message: "Gender required", data });
    // } 
   
    const sql = `
    INSERT INTO employee_detail (
      emp_id, first_name, middle_name, last_name, date_of_birth, phone_number, email, address, role, experience
    ) VALUES (
      '${data.empId}', '${data.firstName}', '${data.middleName}', '${data.lastName}', '${data.dateOfBirth}',
      '${data.phoneNumber}', '${data.email}', '${data.address}', '${data.role}', '${data.experience}'
    )
  `;
 console.log("SQL Query: ", sql);
// typeof operator is used for know the type of the value 

  if (typeof data.firstName !== 'string') {
    return response.send({ status: 'ERROR', message: 'First name should be a string.' });
  }

  if ( typeof data.middleName!== 'string') {
    return response.send({ status: 'ERROR', message: 'Middle name should be a string.' });
  }

 if (typeof data.lastName!== 'string') {
    return response.send({ status: 'ERROR', message: 'Last name should be a string.' });
  }

  if ( typeof data.phoneNumber !==  'string' || data.phone_number < 10 ) {
    return response.send({ status: 'ERROR', message: 'enter a valid 10 digit phone number' });
  }

  if (typeof data.address !== 'string') {
    return response.send({ status: 'ERROR', message: 'enter a valid Address .' });
  }

  if (typeof data.dateOfBirth !== 'string') {
    return response.send({ status: 'ERROR', message: 'Enter valid DOB' });
  }

  if (typeof data.email !== 'string') {
    return response.send({ status: 'ERROR', message: ' enter a valid email' });
  }

  if (typeof data.role !== 'string') {
    return response.send({ status: 'ERROR', message: ' enter a valid role' });
  }

  if (typeof data.experience == 'string') {
    return response.send({ status: 'ERROR', message: ' exp should be in number' });
  }

// Execute the query
    await dbClient.query(sql);
    response.send({ status: 'SUCCESS', message: "Employee created successfully!" });
  } catch (err) {
    // Error handling
    response.status(500).send({ status: 'ERROR', message: 'Failed to insert employee data', error: err });

     
  }    
});
// // Get all employees
// app.get('/getAll', async function (request, response) {
// //     const dataBase = empStorage; // Access the employee data
// //     console.log("Storage:", dataBase);
// try{
//     const data = request.body;
//    console.log("============" , data)

//    const getall_query = `SELECT * FROM employee_detail ORDER BY ${data.first_name} ASC, ${data.first_name} DESC`;
  
// //     const names = dataBase.map(employee => employee.name); // Extract employee names
// //     const sortedNames = names.sort(); // Sort names alphabetically
// //     console.log("Sorted names:", sortedNames);
  
// //     // Retrieve employee details based on sorted names
// //     const employeeDetails = sortedNames.map((names) =>   dataBase.find((employee) => employee.name === names));
  
// //     console.log('getEmployeeDetails==============>>>', employeeDetails);

// //   if(!employeeDetails){
// //     return response.status(400).send({ status: 'ERROR', message: "employee not found" });
// //   }
// //     // Send the response with all employee details   

//  const result = await dbClient.query(getall_query);

//  console.log("result===>" , result)
//   return response.status(200).send({  status: 'SUCCESS',  message: "Employee details retrieved", employeeDetails });
// }
// catch(error){
//     response.status(400).send({ status: 'ERROR', message: "Error retrieving data" });

// } 

// }); // Send the sorted employee details
app.get('/getAll', async function (request, response) {

    try {
      const data = request.body;
      console.log("Received Data: ", data);
      const filter = data.filter;
      console.log("order======>" , filter)
      const page = data.page;     

      const admin = `SELECT * FROM employee_detail   WHERE emp_id = '${data.adminId}'`
      const access = await dbClient.query(admin)

      const check = access.rows.find(emp => emp.role === 'admin')
       console.log("======" , check)

    if(!check){
      return response.send({ status: 'ERROR', message: "Enter a valid adminId." });
}
     const sortDetails = filter === "asc" ? "ASC" : "DESC";  
     console.log("details" , sortDetails)
     const start = (page - 1) * 100;
     console.log("page start" , start)

     const getQuery = `SELECT
     E.*
     FROM
     EMPLOYEE_DETAIL AS E
     ORDER BY
     E.FIRST_NAME ${sortDetails}
     OFFSET
     ${start} ROWS
     FETCH NEXT
     100 ROWS ONLY`;

     const get = await dbClient.query(getQuery) 
     console.log("===" , get)
     const empDetails = get.rows 

     const attendanceQuery = `
     SELECT  A.PRESENT, A.ENTRYTIME 
     FROM ATTENDANCE AS A 
     LEFT JOIN EMPLOYEE_DETAIL AS E ON A.EMP_ID = E.EMP_ID 
     ORDER BY A.ENTRYTIME DESC 
     LIMIT 30`;  

     const status = await dbClient.query(attendanceQuery);
     const attendanceRecords = status.rows;

     const employeeDetails = empDetails.map(emp => {
     const employeeAttendance = attendanceRecords.filter(record => record.emp_id === emp.emp_id );
      
     const presentCount = employeeAttendance.filter(record => record.present === true).length;
     const absentCount = employeeAttendance.filter(record => record.present === false).length;

     return { ...emp, attendanceRecords: employeeAttendance , numberOfDaysPresent : presentCount , numberOfDaysAbsent : absentCount };

      });

  return response.status(200).send({status: 'SUCCESS', message: "Employee details retrieved"  , data : employeeDetails   });
      } 
  catch(error){
  response.status(500).send({ status: 'ERROR', message: "Error retrieving data" , err: error.message });
  }
  });

// Get employee by ID
app.get('/get', async (request, response)=> {
   // const data = empStorage;
   try{
    
    const data = request.body;
    console.log("received data " , data)

    
    if(!data.empId){
      return response.send({ status: 'ERROR', message: "enter valid id." });

    }
    // console.log(emp);

    // if (emp.empId == null) {
    //     return response.status(400).send({ status: 'ERROR', message: "ID is required" });
    // }

    // const foundDetails = data.filter((employee) => employee.empId == emp.empId);

    // console.log("====>", foundDetails);

    // if (foundDetails.length == 0) {
    //     return response.status(400).send({ status: 'ERROR', message: "Invalid user" });
    // }
    // return response.send({ status: 'SUCCESS', message: "Emp data found", foundDetails });
  // Using string 
  const admin = `SELECT * FROM employee_detail   WHERE emp_id = '${data.adminId}'`
  const access = await dbClient.query(admin)

  const check = access.rows.find(emp => emp.role === 'admin')
  console.log("======" , check)

 if(!check){
  return response.send({ status: 'ERROR', message: "Enter a valid adminId." });

 }

   const get_query = `SELECT * FROM employee_detail  WHERE emp_id = '${data.empId}'`;
    // Execute the query
    const fetch =  await dbClient.query(get_query);
    console.log("access" , fetch)
    const empDetails = fetch.rows[0]
    
   const deletedEmployee  = fetch.rows.find(emp => emp.is_deleted === true)
 
 if(deletedEmployee){
   return response.send({ status: 'ERROR', message: "Employee data  doesn't exist." });
 }


  const attendance = `SELECT present,entrytime FROM attendance WHERE emp_id = '${data.empId}' ORDER BY entrytime DESC LIMIT 20 `
  const attendanceDetails = await dbClient.query(attendance)
  const record = attendanceDetails
  const records = record.rows

  const presentCount = records.filter(record => record.present === true).length;
  const absentCount = records.filter(record => record.present === false).length;


  const employeeDetails = {  ... empDetails,attendanceRecord :records , numberOfdaysPresent : presentCount , numberOfdaysAbsent :absentCount };
 
  console.log("employeedetails" , employeeDetails)

  return  response.send({ status: 'SUCCESS', message: "Employee data found" , data: employeeDetails });

//fetch.rows[0] => When you access a single object from an array and return it in your response, it effectively removes the array structure. ex: fetch.rows[0]
 }
 
catch(error) {
    // If an error occurs, return a generic error response
    response.status(400).send({ status: 'ERROR', message: "Error retrieving employee data" , error: error.message });
}
   
});

// // Update employee data
 app.patch('/update', async function (request, response) {
//     const dataBase = empStorage;
try{     
const data = request.body;

//     const empData = dataBase.find((employee) => employee.empId == data.empId);

//     if (!empData) {
//         return response.status(400).send({ status: 'ERROR', message: "Invalid ID" });
//     }

//     if (data.name) {
//         empData.name = data.name;
//     }

//     if (data.age) {
//         empData.age = data.age;
//     }

//     if (data.gender) {
//         empData.gender = data.gender;
//     }

//     return response.send({ status: 'SUCCESS', message: "Emp data updated", data: empData });
 const update_query  = `UPDATE employee_detail SET first_name = '${data.firstName}' , 
  middle_name ='${data.middleName}',
  last_name ='${data.lastName}' , 
  date_of_birth ='${data.dateOfBirth}' , 
  phone_number = '${data.phoneNumber}',
  address ='${data.address}' , 
  role ='${data.role}' , 
  experience ='${data.experience}'WHERE emp_id = '${data.empId}'`

console.log('query===>>',update_query)

  const result = await dbClient.query(update_query);

  console.log('result======>' , result)

    response.send({ status: 'SUCCESS', message: "Employee data updated"});
}

catch(error){

    response.status(400).send({ status: 'ERROR', message: "not updated" });
}
 });

// Delete employee
// app.delete('/del', async function (request, response) {
//     //const dataBase = empStorage;
//     try{
//     const data = request.body;
//     console.log("========>", data);

//     // const empData = dataBase.find((employee) => employee.empId == data.empId);

//     // if (!empData) {
//     //     return response.status(400).send({ status: 'ERROR', message: "Invalid ID" });
//     // }

//     // const deletionIndex = dataBase.indexOf(empData);
//     // dataBase.splice(deletionIndex, 1); // start, delcount

//     // return response.send({ status: 'SUCCESS', message: "DATA DELETED", data: empData });
//    // const addColumn = `ALTER TABLE employee_detail ADD is_deleted BOOLEAN NOT NULL DEFAULT false`
// //        if (!data.empId) {
// //     return response.status(400).send({ status: 'ERROR', message: "Employee ID is required." });
// //  }
// // const fetchQuery = ` SELECT * FROM employee_detail where emp_id = '${data.empId}'`
// // const result = await dbClient.query(fetchQuery)
// // const findId = result.rows.find((emp)=> emp.empid == data.empId)

// //   if (findId ) {
// //     findId.is_deleted = true;
// //     return response.send({ status: 'SUCCESS', message: "Employee data deleted successfully" });
// //   } 
// //   else {
// //     return response.send({ status: 'ERROR', message: "Employee data not deleted " });
// //   }

// //     }
  
// //     catch(error){
// //         console.log(error.message)

// //         response.status(400).send({ status: 'ERROR', message: "employee data not found" });
// //     }
// Create a new function to only add the column and check the result

app.delete('/del', async function (request, response) { 
  try {
    console.log("Received data:", request.body);

      const data = request.body; 
      console.log("Received data:", data);

     console.log("Employee ID received:", data.empId);

     if(!data.empId){
      return response.send({ status: 'ERROR', message: "enter a valid id " });
     }

     
     const deleteQuery = `SELECT * FROM employee_detail WHERE emp_id = '${data.empId}'`;
     const deletion = await dbClient.query(deleteQuery);
     console.log("=====" , deletion)

    const employee = deletion.rows.find(emp => emp.emp_id === data.empId);
      
   if (employee) {

      const addColumnQuery = `ALTER TABLE employee_detail ADD IF NOT EXISTS is_deleted  BOOLEAN DEFAULT false `;
      const check = await dbClient.query(addColumnQuery);
      console.log("======" , check)
    
      const updateQuery = `UPDATE employee_detail SET is_deleted = true WHERE emp_id = '${data.empId}'`;
      const result = await dbClient.query(updateQuery);
      return response.send({ status: 'SUCCESS', message: "Employee data deleted." });
 }
      
  } catch (error) { 
      console.error("Error executing query:", error); 
      return response.status(500).send({ status: 'ERROR', message: "employee data not found" });
  }
});
app.post('/updaterole', async function (request, response){
  try{
    
     const data = request.body;
     console.log("data received" , data)
 
     const update = `UPDATE employee_detail  SET role = '${data.role}' WHERE emp_id = '${data.empId}' `
     const updateRole = await dbClient.query(update)
     return response.send({ status: 'SUCCESS', message: "role  updated" });
     } 
 
 
  
  catch(error){
   return response.send({ status: 'ERROR', message: "role is not updated" });
 }
 
 });

 app.post('/promotion', async function (request, response){


  try{
   
    const data = request.body;
    console.log("data received" , data)

    const superAdmin = `SELECT * FROM employee_detail   WHERE emp_id = '${data.superadminId}'`
    const promotion = await dbClient.query(superAdmin)

     const check = promotion.rows.find(emp => emp.role === 'super_admin')
     console.log("======" , check)

     if(!check){
      return response.send({ status: 'ERROR', message: "enter a valid adminId " });
    }
  else{   
    const promotion = `UPDATE employee_detail  SET role = '${data.role}' WHERE emp_id = '${data.empId}' `;
    const promoted = await dbClient.query(promotion)
    console.log("promoted..." , promoted)
    return response.send({ status: 'SUCCESS', message: "role  updated" });
    } 
}

 
 catch(error){
  return response.send({ status: 'ERROR', message: "role is not updated" });
}

})

app.post('/entry', async function (request, response){
   try{
     //const attendanceStorage = []
     const data = request.body;
     
     console.log("received data " , data)

    /*In code we have to write only create update and deletion other than this
    like alter table we have to do in postgresql*/

     const admin = `SELECT * FROM employee_detail   WHERE emp_id = '${data.adminId}'`
     const attendance = await dbClient.query(admin)
     const logged = attendance.rows.find(emp => emp.role === 'admin')

     console.log("======" , logged)

     if(!logged){
      return response.send({ status: 'ERROR', message: "enter a valid adminId " });
}

   const check = ` SELECT emp_id  FROM attendance  WHERE emp_id = '${data.empId}' AND DATE(entryTime) = CURRENT_DATE;`;
   const exist = await dbClient.query(check);
   console.log(" already entered :", exist.rows);

   if (exist.rows.length > 0) {
  // If the employee already has an entry for today, throw an error
  return response.send({ status: 'ERROR', message: 'Attendance already recorded for today' });
}

   const insertQuery = `INSERT INTO attendance( emp_id , present ,entrytime  ) VALUES (
       '${data.empId}',  '${data.present}' , CURRENT_TIMESTAMP )   `;
      
      const  inserted = await dbClient.query(insertQuery)
      console.log("attendance updated " , inserted)

    
    return response.send({ status: 'SUCCESS', message: "attendance status updated " });
  
}
   catch(error){
    return response.send({ status: 'ERROR', message: "attendance not updated" });

  }

});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

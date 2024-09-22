
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const empStorage = [] ;

app.post('/create', (request, response) => {
    console.log('req===========>>>', request.body);

    const data = request.body;
    
    const id = Math.random().toString().slice(2,10)
    data.empId = id;
    //Object.keys(data).length==0
    
    if( data.name == null && data.age == null && data.gender == null){  // counts the number of properities in request body if its empty it will give error
        console.log("all fields are required")
        return response.status(400).send({status:'ERROR' , message:"All fields are required",data})
    } 

    // Check for missing or invalid fields with custom logic
    if (data.name == null ) {
        console.log("Name  required");
        return response.status(400).send({status:'ERROR' , message:"Name required",data});
    }
    
     if (data.age == null ) {
        console.log("Age required");
        return response.status(400).send({status:'ERROR' , message:"Age required",data});
    }
    
     if (data.gender == null ) {
        console.log("Gender required");
        return response.status(400).send({status:'ERROR' , message:"Gender required",data});
    }
    
    empStorage.push(data);
     console.log("Empdata stored==>" , empStorage)

    return response.send({status:'SUCCESS',message:"Successfully created",data});


});


app.get('/getAll', function (request, response)   {

    console.log(request.body); 
    return response.status(200).send({status: 'SUCCESS', data: empStorage});
});


app.get('/get' , function(request ,response){
  
    const data = empStorage;
   
    const emp = request.body;

    console.log(emp);

    if(emp.empId == null){
      
        return response.status(400).send({status: 'ERROR', message : " ID is required "});

    }

   const foundDetails = data.filter((employee) =>employee.empId == emp.empId)

   console.log("====>" , foundDetails)

   if(foundDetails.length == 0   ) {

    return response.status(400).send({status: 'ERROR', message : " invalid user"   });

   }
   return response.send({status:'SUCCESS',message:"Emp data found", foundDetails : data});
})


app.patch('/update' , function(request,response){
  
    const dataBase = empStorage;
    const data = request.body;

    const foundData = dataBase.find((employee) => employee.empId == data.empId);

    if(foundData == undefined ){
        return response.status(400).send({status: 'ERROR', message : " invalid ID"   });
    }

    if(foundData != undefined){
         if(data.name){
            foundData.name = data.name;
         }
         if(data.age){
            foundData.age= data.age;
         }

         if(data.gender){
            foundData.gender = data.gender;
         }
      
         
         
         return response.send({status:'SUCCESS',message:"Emp data found", foundData : data});
    }



})

app.put('/updateAll' ,  function(request,response){

    const dataBase = empStorage;

    const up_Date= request.body;
    console.log("Request Body: ", up_Date); 

    const foundId = dataBase.find((employee) => employee.empId == up_Date.empId)


    if (foundId == undefined) {
        return response.status(400).send({  status: 'ERROR',  message: 'invalid id' });
    }

if(foundId){
        let update = {
        name : up_Date.name, 
        age : up_Date.age,
        gender : up_Date.gender,
}
    let find = dataBase.indexOf(foundId)
    dataBase.splice(find , 1, update)

    return response.status(200).send({status: 'SUCCESS', message : " DATA UPDATED"  , foundId : dataBase  });
    
} 

 
 })

 app.delete('/delete' , function(request,response){
     const dataBase = empStorage;

     const data = request.body

     const foundId = dataBase.find((employee) => employee.empId == data.empId)

     if(foundId==undefined){
            return response.status(400).send({  status: 'ERROR',  message: 'invalid id' });
        }
        
    if(foundId){

        const deletion = data.indexOf(foundId);
    
        data.splice(deletion,1)
    }
    return response.status(200).send({status: 'SUCCESS', message : " DATA DELETED"  , foundId : dataBase  });

 })



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port `);
});


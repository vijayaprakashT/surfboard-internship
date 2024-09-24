
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

app.get('/getAll', function (request, response) {
    const dataBase = empStorage

    const data = request.body


    const names = dataBase.map(employee => employee.name); 
    const sortedNames = names.sort(); 
    console.log(sortedNames); 
    
const getEmployDtls=sortedNames.map((v)=>dataBase.find((employee) => employee.name == v))
console.log('getEmployDtls==============>>>',getEmployDtls)
    const dataOrder = dataBase.find((employee) => employee.name == sortedNames.name);
     
 if(dataOrder == undefined){
    return response.status(400).send({ status: 'ERROR', message :'invalid' });
 }

 if(dataOrder){
    return response.send( {   status:'SUCCESS',   message:" found", employee :dataOrder });
 }
    
   
});

 // return response.status(200).send({ status: 'SUCCESS', data: sortedNames });


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
   return response.send( {   status:'SUCCESS',   message:"Emp data found",    foundDetails });

})


app.patch('/update' , function(request,response){
  
    const dataBase = empStorage;
    const data = request.body;

    const Data = dataBase.find((employee) => employee.empId == data.empId);

    if(Data == undefined){
        return response.status(400).send({status: 'ERROR', message : " invalid ID"   });
    }
    
    if(data.name){
            Data.name = data.name;
         }
         
          if(data.age ){
            Data.age= data.age;
         }

         if(data.gender){
            Data.gender = data.gender;
         }        
         
         return response.send({status:'SUCCESS',message:"Emp data found", Data : data});

})

app.delete('/del' , function(request,response){

      const dataBase = empStorage

      const data = request.body
      console.log("========>" , data)

      const Data = dataBase.find((employee) => employee.empId == data.empId)

      if(Data == undefined){

        return response.status(400).send({status: 'ERROR', message : " invalid ID"   });

      }

      if(Data ){

        const deletion = dataBase.indexOf(Data)
        dataBase.splice(deletion,1) // start , delcount

      return response.status(400).send ({status:'SUCCESS', message:" DATA DELETED" ,Data : data})

      }
    
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port `);
});

// const eligible = dataBase.filter((employee) => employee.age >= 18);
    // // if(eligible != data.age){
    // //      return response.status(400).send({status: 'ERROR', message : "enter age above 18 and equal to 18"   });
    // //  }  have to use in create (post method)


     // const sortedData = empStorage.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
//How to convert excel file into JSON object by using JavaScript

// let selectedFile;

// // window.onload=function(){
//     document.getElementById('upload').addEventListener("change",(event)=>{
//         console.log(event.target.files);
//         selectedFile = event.target.files[0];
//     })
// //   }

// document.getElementById('button').addEventListener("click",()=>{
//     console.log("click");
//     if(selectedFile){
//         let fileReader = new FileReader();

//         fileReader.readAsBinaryString(selectedFile);
//         fileReader.onload = (event)=>{
//             console.log(event.target.result);

//             let data = event.target.result;
//             console.log(data);
//             let workbook = XLSX.read(data,{type:"binary"});
//             console.log(workbook);

//             workbook.SheetNames.forEach(sheet => {
//                 let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
//                 console.log(rowObject);

//                 document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4);
//             });
//         }
//     }
// })
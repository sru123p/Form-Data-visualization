const LIST = "LIST"
const MCQ = "MCQ"
const CHECKBOX = "CHECKBOX"

// const data = [
//     {
//         question: "What is your choice of beverage ?",
//         type: LIST,
//         options: ["Tea", "Coffee", "Soft drinks", "Water"],
//         responses: ["Coffee", "Coffee", "Tea", "Soft drinks", "Coffee", "Coffee", "Water"]
//     },
//     {
//         question: "What is your favourite travel destination ?",
//         type: MCQ,
//         options: ["England", "Australia", "UAE", "Malaysia"],
//         responses: ["England" , "Norway", "England", "France", "England", "Malaysia", "UAE"]
//     },
//     {
//         question: "Which chocolates do you like ?",
//         type: CHECKBOX,
//         options: ["Dairy milk", "Five star", "Milky bar", "Munch", "KitKat"],
//         responses: [["Five star", "Milky bar", "Munch", "KitKat"],
//                 ["KitKat"],
//                 ["Five star", "Milky bar", "Munch", "KitKat"],
//                 ["KitKat"],
//                 ["Dairy milk"],
//                 ["Dairy milk"],
//                 ["Dairy milk", "KitKat"]
//             ]
//     }
// ]

var data1 = [];
var ques; var subs;
const types = [LIST, CHECKBOX, MCQ]; 
const options = [
    ["Tea", "Coffee", "Soft drinks", "Water"],
    ["Dairy milk", "Five star", "Milky bar", "Munch", "KitKat"],
    ["England", "Australia", "UAE", "Malaysia"],
  ];

//   var opt= [];
 


function listProcessing(listData) {
    const map = new Map()

    const options = listData.Options
    for(let i=0;i<options.length;i++){
        map.set(options[i], 0)
    }

    const responses = listData.Responses
    for(let i=0;i<responses.length;i++){
        map.set(responses[i], map.get(responses[i]) + 1)
    }

    appendGraph(map,listData.Subs, 'bar',LIST)
}

function checkboxProcessing(checkboxData) {
    const map = new Map()
    const options = checkboxData.Options
    for(let i=0;i<options.length;i++){
        map.set(options[i], 0)
    }

    const responses = checkboxData.Responses
    for(let i=0;i<responses.length;i++){
        for(let j=0;j<responses[i].length;j++) {
            map.set(responses[i][j], map.get(responses[i][j])+1)
        }
    }

    appendGraph(map,checkboxData.Subs, 'horizontalBar',CHECKBOX)
}

function mcqProcessing(mcqData) {
    const map = new Map()
    const others = "Others"
    const options = mcqData.Options
    for(let i=0;i<options.length;i++){
        map.set(options[i], 0)
    }
    map.set(others, 0)

    const responses = mcqData.Responses
    for(let i=0;i<responses.length;i++){
        if(map.has(responses[i])) {
            map.set(responses[i], map.get(responses[i])+1)
        } else{
            map.set(others, map.get(others)+1)
        }
    }

    appendGraph(map,mcqData.Subs,'doughnut',MCQ)
}

function appendGraph(map, question, chartType, type) {

    const data = [[],[]]
    map.forEach((value, key) => {
        data[0].push(key)
        data[1].push(value)
    })

    const div = document.createElement("div")
    div.className = "ChartContainer"
    document.body.append(div)
    const title = document.createElement("h4")
    title.className = "the-ques"
    title.innerText = question
    div.append(title)
    const graph = document.createElement("canvas")
    const ctx = graph.getContext('2d');
    const chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: data[0],
            datasets: [{
                label: '',
                data: data[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        max: Math.max(...data[1])+1,
                        min: 0
                    }
                }],
                xAxes: [{
                    ticks: {
                        stepSize: 1,
                        max: Math.max(...data[1])+1,
                        min: 0
                    }
                }]
            }
        }
    });
    div.append(graph)
}

let selectedFile;

// window.onload=function(){
    document.getElementById('upload').addEventListener("change",(event)=>{
        console.log(event.target.files);
        selectedFile = event.target.files[0];
    })
//   }

document.getElementById('button').addEventListener("click",()=>{
    console.log("click");
    if(selectedFile){
        let fileReader = new FileReader();

        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
            console.log(event.target.result);

            let data = event.target.result;
            console.log(data);
            let workbook = XLSX.read(data,{type:"binary"});
            console.log(workbook);

            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);

                document.getElementById("jsondata").innerHTML = "";
                // document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4);

                 // ques = rowObject.columns;
                // rowObject.shift();
                // console.log(ques);
                console.log(rowObject);
                // console.log(ques);
                
                console.log(rowObject[0]);
                // for(let i=0;i<rowObject.length;i++){
                //     console.log(rowObject[i].beverage);
                // }

                subs = ["beverage", "chocolates", "destination"];
                ques = ["What is your preferred choice of beverage ?", "Which chocolates do you like ?", "Your favourite travel destination ?"];

                for(let i = 0;i<3;i++){
                    var temp = {};
                    // console.log(temp);
                    temp.Subs = subs[i];
                    temp.Type = types[i];
                    temp.Options = options[i];
                    temp.Responses = [];

                    data1.push(temp);
                    console.log(temp);
                    console.log(data1);
                }

                for (i = 0; i < rowObject.length; i++) {
                    for (j = 0; j < data1.length; j++) {
                        
                      var form_res = [];
                      
                      console.log(subs[j]);
                      console.log(rowObject[i][subs[j]]);
                      form_res.push(rowObject[i][subs[j]].split(", "));
                      console.log(rowObject[i][subs[j]].split(", "));
                      console.log(form_res[0]);

                      

                      if (j == 1) {
                          //Checkbox => push array
                          console.log(data1[j]);
                        data1[j].Responses.push(form_res[0]); 
                      } 
                      else {
                          // List or Mcq => 
                        // if (form_res[0].length == 1) {
                          // List or MCQ => push only one ans
                          console.log(data1[j]);
                          data1[j].Responses.push(form_res[0][0]); 
                        // }
                      }

                      
                    }
                  }
                  
                  for(i =0;i<data1.length;i++){
                    console.log(data1[i].Subs);
                    data1[i].Subs = ques[i];
                    console.log(data1[i].Subs);
                  }
                  console.log(data1);
                //   document.getElementById("jsondata").innerHTML = JSON.stringify(data1,undefined,4);

                  data1.forEach(item => {
                    console.log("hereeeeeeeeeeee")
                    switch (item.Type) {
                        case LIST:
                            console.log(item);
                            listProcessing(item)
                            break;
                        case MCQ:
                            mcqProcessing(item)
                            break;
                        case CHECKBOX:
                            checkboxProcessing(item)
                            break;
                    }
                })
            });
        }
    }
})

// var ExcelToJSON = function() {

//     this.parseExcel = function(file) {
//         var reader = new FileReader();
//         const result = []
//         // var result;
//         var XL_row_object;
//         reader.onload = function(e) {
//             var data = e.target.result;
//             var workbook = XLSX.read(data, {
//                 type: 'binary'
//             });
//             workbook.SheetNames.forEach(function(sheetName) {
//                 // Here is your object
//                 XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
//                 // var json_object = JSON.stringify(XL_row_object);
//                 // var json_string = JSON.parse(json_object);
//                 result.push(XL_row_object)
//                 console.log(XL_row_object);
//                 // document.getElementById("jsondata").innerHTML = JSON.stringify(XL_row_object,undefined,4);

                // // ques = XL_row_object.columns;
                // // XL_row_object.shift();
                // // console.log(ques);
                // console.log(XL_row_object);
                // // console.log(ques);
                
                // console.log(XL_row_object[0]);
                // // for(let i=0;i<XL_row_object.length;i++){
                // //     console.log(XL_row_object[i].beverage);
                // // }

                // subs = ["beverage", "chocolates", "destination"];
                // ques = ["What is your preferred choice of beverage ?", "Which chocolates do you like ?", "Your favourite travel destination ?"];
                
                // for(let i = 0;i<3;i++){
                //     var temp = {};
                //     temp.Subs = subs[i];
                //     temp.Type = types[i];
                //     temp.Options = options[i];
                //     temp.Responses = [];

                //     data1.push(temp);
                //     console.log(temp);
                //     console.log(data1);
                // }

                // for (i = 0; i < XL_row_object.length; i++) {
                //     for (j = 0; j < data1.length; j++) {
                //       var res = [];
                //       console.log(XL_row_object[i][subs[j]].split(", "));
                //       res.push(XL_row_object[i][subs[j]].split(", "));
                //       // console.log(res[0]);
                //       if (j == 1) {
                //         data1[j].Responses.push(res[0]); // Always push the response array for CHECKBOX type
                //       } else {
                //         if (res[0].length == 1) {
                //           // If there is only 1 response, just push the string, no the array
                //           data1[j].Responses.push(res[0][0]); 
                //         } else {
                //           data1[j].Responses.push(res[0]); // If there are multiple responses, push the array
                //         }
                //       }
                //     }
                //   }
                  
                //   for(i =0;i<3;i++){
                //     console.log(data1[i].Subs);
                //     data1[i].Subs = ques[i];
                //     console.log(data1[i].Subs);
                //   }
                //   console.log(data1);

//                 // ques = XL_row_object.columns;
//                 // ques.shift();
//                 // console.log(ques);
//                 // console.log(typeof XL_row_object);
//                 // console.log(typeof ques);
                

//             })
//             return XL_row_object;
//         };

//         reader.onerror = function(ex) {
//             console.log(ex);
//         };

//         reader.readAsBinaryString(file);
//         console.log("resultt");
//         console.log(XL_row_object);
//         console.log(result);

//         document.getElementById("jsondata").innerHTML = JSON.stringify(data1,undefined,4);

//         // return XL_row_object;
//         // return result;
        
//     };
// };

// function handleFileSelect(evt) {
//     var files = evt.target.files; // FileList object
//     var xl2json = new ExcelToJSON();
//     console.log(typeof xl2json)
//     console.log(xl2json)
//     console.log(files[0]);
//     const res = xl2json.parseExcel(files[0]);
//     console.log(res)
//     // console.log(typeof(res));
//     // console.log(res.length);
//     // console.log(res["0"]);

//     // for(key in res){
//     //     // value = object[key] ;
//     //     console.log(res[key]);
//     // }
//     // Add logic here to render charts from excel data1
//     // You can modify excel file yourself

//     // ques = res.columns;
//     // console.log(res.columns);
//     // console.log(Object.keys(res).length);
//     // res.shift();
//     // console.log(ques);


// }




// window.onload = () => {
// //     document.getElementById('upload').addEventListener('change', handleFileSelect, false);

// //     // You can remove this after your data1 is done
    
// console.log(data1);

// data1.forEach(item => {
//     console.log("hereeeeeeeeeeee")
//     switch (item.Type) {
//         case LIST:
//             console.log(item);
//             listProcessing(item)
//             break;
//         case MCQ:
//             mcqProcessing(item)
//             break;
//         case CHECKBOX:
//             checkboxProcessing(item)
//             break;
//     }
// })
// }
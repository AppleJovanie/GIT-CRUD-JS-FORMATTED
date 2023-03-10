let searchInput = document.querySelector('#search-input');
let details = []; 



function table() {
    let table = `<table class="table">
  <thead>
    <tr>
      <th clsaa="col-1">ID</th>
      <th clsaa="col-3">Name</th>
      <th clsaa="col-4">Email</th>
      <th clsaa="col-2">Edit</th>
      <th clsaa="col-2">Delete</th>
    </tr>
  </thead>
  <tbody>`; 
    for (let i = 0; i < details.length; i++){
        table = table + `<tr>
      <td>${details[i].ID}</td>
      <td>${details[i].name}</td>
      <td>${details[i].email}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${i})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
    </tr> `;
    };
    table = table+`</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
};
document.getElementById("form").innerHTML;
details = [];
getData();
table();

function getData(){
    let Data = localStorage.getItem("details");
    if (Data) {
        details = JSON.parse(Data);
    } else {
        setData();
    };
};
//data in local storage
function setData() {
    localStorage.setItem("details", JSON.stringify(details));
};

function save() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");

    if (name.value == 0) {
        alert("name is Empty");
        return
    }
    let data = {
        ID: GenerateUniqueID(),
        name: name.value,
        email: email.value
    };
    details.push(data);
    setData();

    // console.log(details)
    // console.log(email.value)
    table();
    name.value = "";
    email.value = "";
};

function deleteData(index) {
    details.splice(index, 1);
    setData();
    table();

    // console.log('delete work')
    // console.log(details)
};

function edit(ID ) {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let update =document.getElementById("btnUpdate");
  let submit =document.getElementById("btnSubmit");
  submit.style.display = "none";
  update.style.display = "block";
  
  //alert();

  let indexes =  details.findIndex(indexes => indexes.ID ==  ID)

  name.value = details[indexes].name;
  email.value = details[indexes].email;
  
  
  update.onclick= function (){
    //alert(index);
  details[indexes] = {
        ID: GenerateUniqueID(),
        name: name.value,
        email: email.value,
    };
    submit.style.display = "block";
    update.style.display = "none";
    name.value = "";
    email.value = "";
   
    setData();
    table();
    alert();
    document.getElementById("form").innerHTML;
  }
    
};

function handleSearch(event) {
  const searchText = event.target.value.toLowerCase();
  const filteredDetails = details.filter(detail => {
    return detail.ID.includes(searchText) ||
           detail.name.includes(searchText) ||
           detail.email.includes(searchText);
  });
  const tableBody = document.querySelector('#table tbody');
  tableBody.innerHTML = '';
  filteredDetails.forEach((detail, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${detail.ID}</td>
      <td>${detail.name}</td>
      <td>${detail.email}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${index.ID})">Edit</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${index})">Delete</button></td>
    `;
    tableBody.appendChild(tr);
  });
}
function GenerateUniqueID(){      
  let ID;
  do ID = Math.floor(Math.random()* 1000000).toString().padStart(10,"0");
  while (localStorage.getItem(ID));
  return ID;
}

searchInput.addEventListener('input', handleSearch);










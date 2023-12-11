let form = document.getElementById("myForm");
let submitBtn = document.querySelector(".submit");
let userInfo = document.getElementById("data");
let modal = document.getElementById("userForm");
let modalTitle = document.querySelector("#userForm .modal-title");
let newUserBtn = document.querySelector(".newUser");

let name = document.getElementById("name");
let email = document.getElementById("email");
let register = document.getElementById("register");
let number = document.getElementById("number");
let blood = document.getElementById("blood");
let std = document.getElementById("std");

let getData = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
let isEdit = false;
let editId;

function ValidateData() {
    if (name.value == "") {
        alert("name is required");
    } else if (email.value == "") {
        alert("email is required");
    } else if (register.value == "") {
        alert("register is required");
    } else if (number.value == "") {
        alert("mobile number is required");
    } else if (blood.value == "") {
        alert("blood is required");
    } else if (std.value == "") {
        alert("std is required");
    }
}

newUserBtn.addEventListener("click", () => {
    submitBtn.innerText = "Submit";
    modalTitle.innerText = "Add Form";
    isEdit = false;

    form.reset();
});

function showData() {
    // It removes all elements with the class studentDetails from the document
    document
        .querySelectorAll(".studentDetails")
        .forEach((info) => info.remove());

    getData.forEach((element, index) => {
        let createElement = `<tr class="studentDetails">
            <td>${index + 1}</td>
            <td>${element.name}</td> 
            <td>${element.email}</td>
            <td>${element.register}</td>
            <td>${element.number}</td>
            <td>${element.blood}</td>
            <td>${element.std}</td>
            <td>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${
            element.name
        }', '${element.email}', '${element.register}', '${element.number}', '${
            element.blood
        }', '${
            element.std
        }')" data-bs-toggle="modal" data-bs-target="#userForm">Edit</button>

                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteInfo(${index})">Delete</button>
                            
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
    console.log(getData);
}

showData();

// edit data
function editInfo(index, name, email, register, number, blood, std) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("register").value = register;
    document.getElementById("number").value = number;
    document.getElementById("blood").value = blood;
    document.getElementById("std").value = std;

    isEdit = true;
    editId = index;
    name.value = name;
    email.value = email;
    register.value = register;
    number.value = number;
    blood.value = blood;
    std.value = std;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update Form";
}

// submit data
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const information = {
        name: name.value,
        email: email.value,
        register: register.value,
        number: number.value,
        blood: blood.value,
        std: std.value,
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        getData[editId] = information;
    }   
    
    localStorage.setItem("student", JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Add Form";

    showData();

    form.reset();

    modal.style.display = "none";
    document.querySelector(".modal-backdrop").remove();
});

// Delete data
function deleteInfo(index) {
    getData.splice(index, 1);
    document.getElementById("confirm").addEventListener("click", function () {
        localStorage.setItem("student", JSON.stringify(getData));
        showData();
    });
}
function saveStudent() {
   
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var bloodGroup = document.getElementById("bloodGroup").value;
    var mobileNumber = document.getElementById("mobileNumber").value;
    
    
    var student = {
        name: name,
        dob: dob,
        address: address,
        bloodGroup: bloodGroup,
        mobileNumber: mobileNumber
    };
    
  
    if (typeof(Storage) !== "undefined") {
        var studentRecords = JSON.parse(localStorage.getItem("studentRecords")) || [];
        
        studentRecords.push(student);
        
        localStorage.setItem("studentRecords", JSON.stringify(studentRecords));
        
        document.getElementById("studentForm").reset();
        
        displayStudentList();
    } else {
        alert("Local storage is not supported in your browser.");
    }
}

function displayStudentList() {
    var studentRecords = JSON.parse(localStorage.getItem("studentRecords")) || [];
    var studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    studentRecords.forEach(function(student, index) {
        var studentDiv = document.createElement("div");
        studentDiv.innerHTML = `
        <table>
            <tr>
                <td><strong>Name:</strong></td>
                <td>${student.name}</td>
            </tr>
            <tr>
                <td><strong>DOB:</strong></td>
                <td>${student.dob}</td>
            </tr>
            <tr>
                <td><strong>Address:</strong></td>
                <td>${student.address}</td>
            </tr>
            <tr>
                <td><strong>Blood Group:</strong></td>
                <td>${student.bloodGroup}</td>
            </tr>
            <tr>
                <td><strong>Mobile Number:</strong></td>
                <td>${student.mobileNumber}</td>
            </tr>
            <tr>
                <td colspan="2">
                    <button id="editBtn" onclick="editStudent(${index})">Edit</button>
                    <button id="deleteBtn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        </table>
        `;
        studentList.appendChild(studentDiv);
    });
}

function editStudent(index) {
    
    var studentRecords = JSON.parse(localStorage.getItem("studentRecords")) || [];
    var student = studentRecords[index];

    document.getElementById("name").value = student.name;
    document.getElementById("dob").value = student.dob;
    document.getElementById("address").value = student.address;
    document.getElementById("bloodGroup").value = student.bloodGroup;
    document.getElementById("mobileNumber").value = student.mobileNumber;

    studentRecords.splice(index, 1);

    localStorage.setItem("studentRecords", JSON.stringify(studentRecords));

    displayStudentList();
}

function deleteStudent(index) {
    
    var studentRecords = JSON.parse(localStorage.getItem("studentRecords")) || [];

    studentRecords.splice(index, 1);

    localStorage.setItem("studentRecords", JSON.stringify(studentRecords));

    displayStudentList();
    alert("Deleting the student information");
}

function cancelForm() {
    document.getElementById("studentForm").reset();
}

displayStudentList();

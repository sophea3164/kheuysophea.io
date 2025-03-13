// Helper function to get cookies by name  
function getCookie(name) {  
    const cookies = document.cookie.split('; ');  
    for (const cookie of cookies) {  
        const [cookieName, cookieValue] = cookie.split('=');  
        if (cookieName === name) {  
            return decodeURIComponent(cookieValue);  
        }  
    }  
    return null;  
}  

// Helper function to set cookies with an expiration date  
function setCookie(name, value, days) {  
    const date = new Date();  
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);  
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/;`;  
}  

// Load employee form cookies  
function loadEmp() {  
    const empCookie = getCookie('employee');  
    return empCookie ? JSON.parse(empCookie) : [];  
}  

// Save employee to cookie  
function saveEmp() {  
    setCookie('employee', JSON.stringify(employee), 30); // store for 30 days  
}  

// Initialize variable  
const form = document.getElementById('employee-form');  
const nameInput = document.getElementById('employee-name');  
const positionInput = document.getElementById('employee-position');  
const hiredateInput = document.getElementById('employee-hiredate');  
const employeeList = document.getElementById('employee-list');  
const editingIndexInput = document.getElementById('editingIndex');  
const submitBtn = document.getElementById('submit-btn');  

let employee = loadEmp();  

// Function to render employees  
function renderEmp() {  
    employeeList.innerHTML = '';  
    employee.forEach((emp, index) => {  
        employeeList.innerHTML += `  
        <tr>  
            <td>${(index + 1).toString().padStart(3, '0')}</td>  
            <td>${emp.name}</td>  
            <td>${emp.position}</td>  
            <td>${emp.hiredate}</td>  
            <td>  
                <button class="btn btn-warning btn-sm" onclick="editEmp(${index})">Edit</button>  
                <button class="btn btn-danger btn-sm" onclick="deleteEmp(${index})">Delete</button>  
            </td>  
        </tr>`;  
    });  
}  

// Add or update an employee  
form.addEventListener('submit', (e) => {  
    e.preventDefault();  
    const name = nameInput.value.trim();  
    const position = positionInput.value.trim();  
    const hiredate = hiredateInput.value.trim();  
    const editingIndex = editingIndexInput.value;  

    if (name && position && hiredate) {  
        const newEmp = { name, position, hiredate };  

        if (editingIndex) {  
            // Update employee  
            employee[editingIndex] = newEmp;  
            submitBtn.textContent = 'ADD EMP';  
            editingIndexInput.value = '';
            alert('Ok Update hx hx bro');  
        } else {  
            // Add new employee  
            employee.push(newEmp);
            alert('Ok add hx hx bro'); 
            
        }  
        // Clear form  
        nameInput.value = '';  
        positionInput.value = '';  
        hiredateInput.value = '';  

        saveEmp();  
        renderEmp();
          
    }  
});  

// Delete employee  
window.deleteEmp = (index) => {  
    if (confirm('Juii delete men ey?')) {  
        employee.splice(index, 1);  
        saveEmp();  
        renderEmp();  
        alert('ok delete hx');
    }  
};  

// Edit employee  
window.editEmp = (index) => {  
    const emp = employee[index];  
    nameInput.value = emp.name;  
    positionInput.value = emp.position;  
    hiredateInput.value = emp.hiredate;  
    editingIndexInput.value = index;  
    submitBtn.textContent = 'Update EMP';  
};  

// Initial render  
renderEmp();  

// Show/Hide form  
function showpopup() {  
    const overlay = document.getElementById('container');  
    button = document.getElementById('show-btn');  
    if (overlay.classList.toggle('show')) {  
        button.textContent = "Close";  
        button.classList.add('btn-danger');  
        button.classList.remove('btn-primary');  
    } else {  
        button.textContent = "Show";  
        button.classList.add('btn-primary');  
        button.classList.remove('btn-danger');  
    }  
}  
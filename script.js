let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

displayStudents();

// Add Student
function addStudent() {
  let name = document.getElementById("name").value;
  let course = document.getElementById("course").value;

  if (!name || !course) {
    alert("Please fill all fields");
    return;
  }

  students.push({ name, course });
  saveData();
  displayStudents();

  document.getElementById("name").value = "";
  document.getElementById("course").value = "";
}

// Display Students
function displayStudents(data = students) {
  let container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach((student, index) => {
    container.innerHTML += `
      <div class="card">
        <h3>${student.name}</h3>
        <p>${student.course}</p>
        <button onclick="openEdit(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </div>
    `;
  });
}

// Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure to delete?")) {
    students.splice(index, 1);
    saveData();
    displayStudents();
  }
}

// Open Edit Modal
function openEdit(index) {
  editIndex = index;
  let student = students[index];

  document.getElementById("editName").value = student.name;
  document.getElementById("editCourse").value = student.course;

  document.getElementById("editModal").style.display = "flex";
}

// Update Student
function updateStudent() {
  let name = document.getElementById("editName").value;
  let course = document.getElementById("editCourse").value;

  students[editIndex] = { name, course };

  saveData();
  displayStudents();
  closeModal();
}

// Close Modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// Click outside close
window.onclick = function(e) {
  let modal = document.getElementById("editModal");
  if (e.target === modal) {
    closeModal();
  }
};

// Save to LocalStorage
function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Search
function searchStudent() {
  let search = document.getElementById("search").value.toLowerCase();

  let filtered = students.filter(student =>
    student.name.toLowerCase().includes(search) ||
    student.course.toLowerCase().includes(search)
  );

  displayStudents(filtered);
}
const petForm = document.getElementById('pet-form'); // Formulario 
const petListTable = document.getElementById('pet-list-table'); // Tabla
const searchBar = document.getElementById('search-bar'); // Barra de búsqueda
const cancelEditBtn = document.getElementById('cancel-edit'); // Cancelar edición

let pets = []; // Lista en memoria
let editIndex = null; // Índice de edición actual

// Crear o Actualizar
petForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const owner = document.getElementById('owner').value;
  const species = document.getElementById('species').value;
  const age = document.getElementById('age').value;

  const pet = { name, owner, species, age };

  if (editIndex !== null) {
    pets[editIndex] = pet; // Actualizar
    editIndex = null;
    cancelEditBtn.style.display = 'none';
  } else {
    pets.push(pet); // Crear
  }

  petForm.reset();
  renderTable();
});

// Cancelar edición
cancelEditBtn.addEventListener('click', () => {
  editIndex = null;
  petForm.reset();
  cancelEditBtn.style.display = 'none';
});

// Mostrar la tabla
function renderTable() {
  petListTable.innerHTML = '';
  pets.forEach((pet, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pet.name}</td>
      <td>${pet.owner}</td>
      <td>${pet.species}</td>
      <td>${pet.age}</td>
      <td>
        <button class="edit" onclick="editPet(${index})">Editar</button>
        <button class="delete" onclick="deletePet(${index})">Eliminar</button>
      </td>
    `;
    petListTable.appendChild(row);
  });

  // Mostrar la tabla una vez haya datos
  document.getElementById('pet-table').style.display = 'table';
  $('#pet-table').DataTable().destroy(); // Destruir cualquier instancia previa de DataTable
  $('#pet-table').DataTable({
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    }
  });
}

// Editar
function editPet(index) {
  const pet = pets[index];
  document.getElementById('name').value = pet.name;
  document.getElementById('owner').value = pet.owner;
  document.getElementById('species').value = pet.species;
  document.getElementById('age').value = pet.age;

  editIndex = index;
  cancelEditBtn.style.display = 'inline-block';
}

// Eliminar
function deletePet(index) {
  pets.splice(index, 1);
  renderTable();
}

// Buscar
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(query)
  );

  petListTable.innerHTML = '';
  filteredPets.forEach((pet, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pet.name}</td>
      <td>${pet.owner}</td>
      <td>${pet.species}</td>
      <td>${pet.age}</td>
      <td>
        <button class="edit" onclick="editPet(${index})">Editar</button>
        <button class="delete" onclick="deletePet(${index})">Eliminar</button>
      </td>
    `;
    petListTable.appendChild(row);
  });
});

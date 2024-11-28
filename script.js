const petForm = document.getElementById('pet-form'); // Formulario 
const petList = document.getElementById('pet-list');// Lista
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
  renderList();
});

// Cancelar edición
cancelEditBtn.addEventListener('click', () => {
  editIndex = null;
  petForm.reset();
  cancelEditBtn.style.display = 'none';
});

// Leer
function renderList() {
  petList.innerHTML = '';
  pets.forEach((pet, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${pet.name} - ${pet.owner} - ${pet.species} - ${pet.age} años</span>
      <div class="actions">
        <button class="edit" onclick="editPet(${index})">Editar</button>
        <button onclick="deletePet(${index})">Eliminar</button>
      </div>
    `;
    petList.appendChild(listItem);
  });
}

// Actualizar
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
  renderList();
}

// Buscar
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(query)
  );

  petList.innerHTML = '';
  filteredPets.forEach((pet, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${pet.name} - ${pet.owner} - ${pet.species} - ${pet.age} años</span>
      <div class="actions">
        <button class="edit" onclick="editPet(${index})">Editar</button>
        <button onclick="deletePet(${index})">Eliminar</button>
      </div>
    `;
    petList.appendChild(listItem);
  });
});

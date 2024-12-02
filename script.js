$(document).ready(function () {
  const petForm = document.getElementById('pet-form');
  const viewPetsSection = $('#view-pets-section');
  const formSection = $('#form-section');
  const petTable = $('#pet-table').DataTable({
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
    },
    searching: true, // Habilitar búsqueda interna de DataTable
    paging: true, // Habilitar paginación
    info: true, // Información de la tabla
    pageLength: 10, // Mostrar 10 registros por página
  });

  // Generar 100 mascotas con nombres reales
  const pets = generateTestData();

  // Mostrar listado de mascotas
  $('#view-pets-btn').on('click', function () {
    formSection.hide();
    viewPetsSection.show();
    renderPetsTable(); // Renderizar la tabla de mascotas
  });

  // Volver al formulario
  $('#back-btn').on('click', function () {
    viewPetsSection.hide();
    formSection.show();
  });

  // Función para renderizar la tabla de mascotas
  function renderPetsTable() {
    petTable.clear().draw(); // Limpiar tabla antes de agregar los datos

    pets.forEach((pet,index) => {
      petTable.row.add([
        pet.name, 
        pet.owner,
         pet.species,
          pet.age,
           `<button class="edit-btn" data-index="${index}">Editar</button>
            <button class="delete-btn" data-index="${index}">Eliminar</button>`
           ]).draw();
    });
  }

  // Función para generar 100 registros de prueba con nombres reales
  function generateTestData() {
    const names = [
      "Max", "Bella", "Lucy", "Charlie", "Daisy", "Luna", "Rocky", "Oliver", "Milo", "Buddy",
      "Bailey", "Sadie", "Maggie", "Chloe", "Toby", "Zoe", "Leo", "Cooper", "Riley", "Jack",
      "Sophie", "Lily", "Sam", "Finn", "Benji", "Gizmo", "Bear", "Oscar", "Rusty", "Buddy",
      "Harley", "Rosie", "Ruby", "Jasper", "Toby", "Angel", "Scout", "Maddie", "Winston",
      "Lola", "Penny", "Gracie", "Jake", "Henry", "Coco", "Sadie", "Abby", "Milo", "Frankie",
      "Buster", "Murphy", "Dexter", "Oliver", "Bella", "Sasha", "Maximus", "Benny", "Theo",
      "Maggie", "Roxy", "King", "Princess", "Koda", "Luna", "Maxwell", "Dusty", "Rocky",
      "Misty", "Ziggy", "Cleo", "Maggie", "Finnley", "Fluffy", "Ella", "Breezy", "Lilly",
      "Charlie", "Daisy", "Simba", "Shadow", "Teddy", "Sandy", "Sasha", "Ellie", "Toby",
      "Hazel", "Maya", "Milo", "Ace", "Thor", "Bella", "Zara", "Spike", "Juno", "Maggie",
      "Riley", "Trixie", "Cali", "Chester", "Storm", "Ginger", "Pepper", "Baxter", "Sophie",
      "Taz", "Rex", "Kiki", "Penny", "Dolly", "Harley", "Sadie", "Zoe", "Olive", "Jake",
      "Gizmo", "Copper", "Sasha", "Rosie", "Holly", "Pippa", "Lily", "Willy", "Cody", "Ace"
    ];
    
    const owners = [
      "Juan", "Ana", "Carlos", "Laura", "Pedro", "Martina", "Luis", "Patricia", "Sergio", "Elena",
      "José", "Isabel", "Raúl", "María", "Antonio", "Pablo", "Sandra", "Miguel", "Eva", "David",
      "Clara", "Fernando", "Cristina", "Santiago", "Sara", "Julio", "Marta", "Francisco", "Paula",
      "Andrés", "Carmen", "Antonio", "Raquel", "Javier", "Verónica", "Luis", "Alicia", "Alberto", 
      "Lucía", "Diego", "Verónica", "Gonzalo", "Andrea", "Esteban", "Silvia", "Óscar", "Beatriz",
      "Martín", "Fátima", "Teresa", "José Luis", "Carmen", "Emilio", "Marina", "Alejandra", "Ricardo",
      "Susana", "Iván", "Inés", "Tomás", "Patricia", "Celia", "Víctor", "María José", "Ricardo", "Amparo"
    ];

    const species = ['Perro', 'Gato'];
    
    const testPets = [];

    for (let i = 0; i < 100; i++) {
      const name = names[i % names.length];
      const owner = owners[i % owners.length];
      const speciesType = species[i % species.length];
      const age = Math.floor(Math.random() * 10) + 1; // Edad aleatoria entre 1 y 10
      testPets.push({ name, owner, species: speciesType, age });
    }
    
    return testPets;
  }

  // Agregar la funcionalidad de búsqueda con el campo de búsqueda en el formulario
  $('#search-bar').on('input', function () {
    const query = $(this).val().toLowerCase();
    petTable.rows().every(function () {
      const data = this.data();
      const isMatch = data.some(cell => cell.toLowerCase().includes(query));
      if (isMatch) {
        this.node().style.display = '';
      } else {
        this.node().style.display = 'none';
      }
    });
  });

  // Cargar las mascotas de prueba en la tabla
  renderPetsTable();


// Evento para capturar datos del formulario y agregarlos a la tabla
$('#pet-form').on('submit', function (e) {
  e.preventDefault(); // Evitar recargar la página

  // Capturar datos del formulario
  const name = $('#name').val();
  const owner = $('#owner').val();
  const species = $('#species').val();
  const age = $('#age').val();

  // Agregar los datos al array de mascotas
  pets.push({ name, owner, species, age });

  // Renderizar la tabla
  renderPetsTable();

  // Limpiar el formulario
  $('#pet-form')[0].reset();
});

// Evento para editar un registro
$('#pet-table').on('click', '.edit-btn', function () {
  const index = $(this).data('index'); // Obtener índice del registro

  // Cargar datos en el formulario
  const pet = pets[index];
  $('#name').val(pet.name);
  $('#owner').val(pet.owner);
  $('#species').val(pet.species);
  $('#age').val(pet.age);

  // Actualizar el evento submit para guardar cambios
  $('#pet-form').off('submit').on('submit', function (e) {
    e.preventDefault();

    // Actualizar los datos en el array
    pets[index] = {
      name: $('#name').val(),
      owner: $('#owner').val(),
      species: $('#species').val(),
      age: $('#age').val()
    };

    // Renderizar la tabla y limpiar el formulario
    renderPetsTable();
    $('#pet-form')[0].reset();

    // Restaurar el evento original del formulario
    $('#pet-form').off('submit').on('submit', addNewPet);
  });

  // Cambiar la vista al formulario
  formSection.show();
  viewPetsSection.hide();
});
// Evento para eliminar un registro
$('#pet-table').on('click', '.delete-btn', function () {
  const index = $(this).data('index'); // Obtener índice del registro

  // Eliminar el registro del array
  pets.splice(index, 1);

  // Actualizar la tabla
  renderPetsTable();
});
// ---------------------------------------------
// Guardar datos del formulario en la tabla
function addNewPet(e) {
  e.preventDefault();
  const name = $('#name').val();
  const owner = $('#owner').val();
  const species = $('#species').val();
  const age = $('#age').val();
  pets.push({ name, owner, species, age });
  renderPetsTable();
  $('#pet-form')[0].reset();
}

// Inicialización
$('#pet-form').on('submit', addNewPet);
$('#pet-table').on('click', '.edit-btn', handleEdit);
$('#pet-table').on('click', '.delete-btn', handleDelete);

// Renderizar mascotas al inicio
renderPetsTable();

$('#pet-table').DataTable({
  autoWidth: false, // Desactiva el ajuste automático de ancho
  columnDefs: [
    { width: '20%', targets: 4 }, // Define un ancho fijo para la columna de acciones
    { orderable: false, targets: 4 } // Desactiva la ordenación en la columna de acciones
  ]
});


}); 

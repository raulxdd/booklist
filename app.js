const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author')
const descInput = document.querySelector('#description');
const statusInput = document.querySelector('#status');
const bookList = document.querySelector('#book-list');

let myLibrary = [];

function Book(title, author, description, status, tearRating, spiceRating, excitementRating, overallRating) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.status = status;
  this.tearRating = tearRating;
  this.spiceRating = spiceRating;
  this.excitementRating = excitementRating;
  this.overallRating = overallRating;
}


function addBookToLibrary() {

  const selectedTearRating = document.querySelector('input[name="tear-rating"]:checked');
  const selectedSpiceRating = document.querySelector('input[name="spice-rating"]:checked');
  const selectedExcitementRating = document.querySelector('input[name="excitement-rating"]:checked');
  const selectedOverallRating = document.querySelector('input[name="overall-rating"]:checked');

  const tearRating = selectedTearRating ? parseInt(selectedTearRating.value) : 0;
  const spiceRating = selectedSpiceRating ? parseInt(selectedSpiceRating.value) : 0;
  const excitementRating = selectedExcitementRating ? parseInt(selectedExcitementRating.value) : 0;
  const overallRating = selectedOverallRating ? parseInt(selectedOverallRating.value) : 0;


  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    descInput.value,
    statusInput.value,
    tearRating,
    spiceRating,
    excitementRating,
    overallRating,
  );
  myLibrary.push(newBook);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function displayBooks() {
  bookList.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `By ${book.author}`;

    const description = document.createElement('p');
    description.textContent = book.description;
    description.classList.add('description');

    const status = document.createElement('p');
    status.classList.add('status');
    status.textContent = `Status: ${book.status}`;

    const tearRatingElement = document.createElement('p');
    tearRatingElement.textContent = `Tear Rating: ${book.tearRating}`;

    const spiceRatingElement = document.createElement('p');
    spiceRatingElement.textContent = `Spice Rating: ${book.spiceRating}`;

    const excitementRatingElement = document.createElement('p');
    excitementRatingElement.textContent = `Excitement Rating: ${book.excitementRating}`;

    const overallRatingElement = document.createElement('p');
    overallRatingElement.textContent = `Overall Rating: ${book.overallRating}`;

    switch (book.status) {
      case 'read':
        status.textContent = 'Loetud';
        status.style.color = 'green';
        break;
      case 'to-read':
        status.textContent = 'Plaanis lugeda';
        status.style.color = 'red';
        break;
      case 'reading':
        status.textContent = 'Loen';
        status.style.color = 'orange';
        break;
      default:
        break;
    }


    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      displayBooks();
    });

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      titleInput.value = book.title;
      authorInput.value = book.author;
      descInput.value = book.description;
      statusInput.value = book.status;

      // Remove the current book from the library
      myLibrary.splice(index, 1);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      displayBooks();
    });

    bookDiv.append(title, author, description, status, tearRatingElement, spiceRatingElement, excitementRatingElement, overallRatingElement, editBtn, deleteBtn);
    bookList.appendChild(bookDiv);
  });
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  displayBooks();
});

if (localStorage.getItem('myLibrary')) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  displayBooks();
}
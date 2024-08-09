const library = [];

// Book Functions
function Book(title, author, genre, pages) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
}

function addBook(title, author, genre, pages) {
    deleteBookList();

    const newBook = new Book(title, author, genre, pages);
    library.push(newBook);
    displayBooks(library);
}

function displayBooks(array) {
    const bookList = document.getElementById('bookList');
    library.forEach((book) => {
        let li = document.createElement('li');
        li.innerHTML = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Pages: ${book.pages}`;
        bookList.appendChild(li);
    })
}

function deleteBookList() {
    const bookList = document.getElementById('bookList');
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
}


// Modal Functions
const newBookButton = document.getElementById('bookButton');
const modal = document.getElementById('bookModal');
const closeButton = document.getElementsByClassName('closeModal')[0];

newBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
})
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
})
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
})

// Form functions
const bookForm = document.getElementById('bookForm');
const bookSubmitButton = document.getElementById('addBookSubmit');
const nTitle = document.getElementById('bookTitle');
const nAuthor = document.getElementById('bookAuthor');
const nGenre = document.getElementById('bookGenre');
const nPages = document.getElementById('bookPages');
bookSubmitButton.addEventListener('click', () => {
    addBook(nTitle.value, nAuthor.value, nGenre.value, nPages.value);
    modal.style.display = 'none';
    bookForm.reset();

})
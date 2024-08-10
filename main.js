const library = [];

// Book Functions
function Book(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, genre, pages, read) {
    deleteBookList();

    const newBook = new Book(title, author, genre, pages, read);
    library.push(newBook);
    displayBooks(library);
}

function displayBooks(array) {
    const bookList = document.getElementById('bookList');
    library.forEach((book) => {
        let li = document.createElement('li');
        li.innerHTML = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Pages: ${book.pages}, Read: ${book.read}`;

        if (book.read === true) {
            li.innerHTML = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Pages: ${book.pages}, Read: &check;`;
        }
        else {
            li.innerHTML = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Pages: ${book.pages}, Read: &times;`;
        }

        let toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle';
        toggleReadButton.addEventListener('click', () => {
            book.read = !book.read;
            if (book.read === true) {
                li.innerHTML = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Pages: ${book.pages}, Read: &check;`;
                li.appendChild(toggleReadButton);
                li.appendChild(deleteButton);
            }
            else {
                li.innerHTML = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Pages: ${book.pages}, Read: &times;`;
                li.appendChild(toggleReadButton);
                li.appendChild(deleteButton);
            }
        });
        li.appendChild(toggleReadButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.dataset.title = book.title;

        deleteButton.addEventListener('click', (e) => {
            const title = e.target.dataset.title;
            const index = library.findIndex((book) => book.title === title);
            if (index !== -1) {
                library.splice(index, 1);
                e.target.parentElement.remove();
            }
        });

        li.appendChild(deleteButton);
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
const nRead = document.getElementById('bookRead');
bookSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addBook(nTitle.value, nAuthor.value, nGenre.value, nPages.value, nRead.checked);
    modal.style.display = 'none';
    bookForm.reset();
})

addBook('Test Book', 'Test Author', 'Test Genre', 100, true);
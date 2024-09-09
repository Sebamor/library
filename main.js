class Book {
    constructor(title, author, genre, pages, read) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }

    getReadStatus() {
        return this.read ? '&check;' : '&times;';
    }

    toListItem() {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Title:</strong> ${this.title}, <strong>Author:</strong> ${this.author}, <strong>Genre:</strong> ${this.genre}, <strong>Pages:</strong> ${this.pages}, <strong>Read:</strong> ${this.getReadStatus()}`;
        
        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle';
        toggleReadButton.addEventListener('click', () => {
            this.toggleRead();
            li.innerHTML = `<strong>Title:</strong> ${this.title}, <strong>Author:</strong> ${this.author}, <strong>Genre:</strong> ${this.genre}, <strong>Pages:</strong> ${this.pages}, <strong>Read:</strong> ${this.getReadStatus()}`;
            li.appendChild(toggleReadButton);
            li.appendChild(deleteButton);
        });
        li.appendChild(toggleReadButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.dataset.title = this.title;
        deleteButton.addEventListener('click', () => {
            this.handleDelete();
        });
        li.appendChild(deleteButton);

        return li;
    }

    handleDelete() {
        library.removeBook(this.title);
        const bookList = document.getElementById('bookList');
        const listItem = Array.from(bookList.children).find(li => li.querySelector('.deleteButton').dataset.title === this.title);
        if (listItem) {
            bookList.removeChild(listItem);
        }
    }
}






class Library {
    constructor() {
        this.books = [];
        this.bookList = document.getElementById('bookList');
        this.modal = document.getElementById('bookModal');
        this.bookForm = document.getElementById('bookForm');
        this.newBookButton = document.getElementById('bookButton');
        this.closeButton = document.getElementsByClassName('closeModal')[0];
        this.bookSubmitButton = document.getElementById('addBookSubmit');
        this.initEventListeners();
    }

    initEventListeners() {
        this.newBookButton.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });

        this.closeButton.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });

        this.bookSubmitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.addBook(
                document.getElementById('bookTitle').value,
                document.getElementById('bookAuthor').value,
                document.getElementById('bookGenre').value,
                document.getElementById('bookPages').value,
                document.getElementById('bookRead').checked
            );
            this.modal.style.display = 'none';
            this.bookForm.reset();
        });
    }

    addBook(title, author, genre, pages, read) {
        const newBook = new Book(title, author, genre, pages, read);
        this.books.push(newBook);
        this.displayBooks();
    }

    removeBook(title) {
        this.books = this.books.filter(book => book.title !== title);
    }

    displayBooks() {
        this.deleteBookList();
        this.books.forEach(book => {
            const listItem = book.toListItem();
            this.bookList.appendChild(listItem);
        });
    }

    deleteBookList() {
        while (this.bookList.firstChild) {
            this.bookList.removeChild(this.bookList.firstChild);
        }
    }
}

const library = new Library();
library.addBook('Sample Book', 'Sample Author', 'Sample Genre', 100, true);
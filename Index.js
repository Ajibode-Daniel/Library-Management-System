// Book Class
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.borrowed = false;
    }

    isBorrowed() {
        return this.borrowed;
    }

    borrow() {
        if (!this.borrowed) {
            this.borrowed = true;
            return true;
        }
        return false;
    }

    returnBook() {
        this.borrowed = false;
    }
}

// User Class
class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.borrowedBooks = [];
    }

    borrowBook(book) {
        if (this.borrowedBooks.length < 3 && !book.isBorrowed()) {
            book.borrow();
            this.borrowedBooks.push(book);
            return true;
        }
        return false;
    }

    returnBook(ISBN) {
        const index = this.borrowedBooks.findIndex(book => book.ISBN === ISBN);
        if (index !== -1) {
            this.borrowedBooks[index].returnBook();
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        return false;
    }

    peakBook(ISBN) {
        return this.borrowedBooks.find(book => book.ISBN === ISBN);
    }
}

// Library Class
class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }

    registerMember(user) {
        this.members.push(user);
    }

    addNewBook(book) {
        this.books.push(book);
    }

    borrowBook(user, ISBN) {
        const book = this.books.find(book => book.ISBN === ISBN);
        if (book && !book.isBorrowed()) {
            return user.borrowBook(book);
        }
        return false;
    }

    returnBook(user, ISBN) {
        return user.returnBook(ISBN);
    }
}

// Example Usage
const library = new Library();

const book1 = new Book("Book One", "Author One", "1111");
const book2 = new Book("Book Two", "Author Two", "2222");
const book3 = new Book("Book Three", "Author Three", "3333");

library.addNewBook(book1);
library.addNewBook(book2);
library.addNewBook(book3);

const user1 = new User("John Doe", "U001");
library.registerMember(user1);

// User borrows a book
library.borrowBook(user1, "1111");
library.borrowBook(user1, "2222");
library.borrowBook(user1, "3333"); // This will fail because max 3 books

// User returns a book
library.returnBook(user1, "1111");

// Check borrowed books
console.log(user1.borrowedBooks);

// Try borrowing another book after returning one
library.borrowBook(user1, "3333");

console.log(user1.borrowedBooks);

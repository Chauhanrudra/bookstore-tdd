let books = [];

function addBook(book) {
  if (!book.title || !book.author) {
    throw new Error('Title and Author are required');
  }
  if (book.price <= 0) {
    throw new Error('Price must be a positive number');
  }
  if (book.stock < 0) {
    throw new Error('Stock cannot be negative');
  }
  if (books.find(b => b.id === book.id)) {
    throw new Error('Book with this ID already exists');
  }
  books.push(book);
}

function getBooks() {
  return books;
}

function _reset() {
  books = [];
}

module.exports = { addBook, getBooks, _reset };

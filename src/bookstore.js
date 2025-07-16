let books = [];

function addBook(book) {
  if (!book.title || !book.author) {
    throw new Error("Title and Author are required");
  }
  if (book.price <= 0) {
    throw new Error("Price must be a positive number");
  }
  if (book.stock < 0) {
    throw new Error("Stock cannot be negative");
  }
  if (books.find((b) => b.id === book.id)) {
    throw new Error("Book with this ID already exists");
  }
  books.push(book);
}

function getBooks() {
  return books;
}

function deleteBook(id) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    throw new Error("Book with this ID does not exist");
  }
  books.splice(index, 1);
}
function searchBooks(query) {
  return books.filter((book) => {
    const matchesTitle =
      !query.title || book.title.toLowerCase().includes(query.title.toLowerCase());

    const matchesAuthor =
      !query.author || book.author.toLowerCase().includes(query.author.toLowerCase());

    const matchesPriceMin = query.priceMin === undefined || book.price >= query.priceMin;
    const matchesPriceMax = query.priceMax === undefined || book.price <= query.priceMax;

    return matchesTitle && matchesAuthor && matchesPriceMin && matchesPriceMax;
  });
}

function _reset() {
  books = [];
}

module.exports = {
  addBook,
  getBooks,
  deleteBook,
  _reset,
  searchBooks
};

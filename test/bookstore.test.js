const bookstore = require("../src/bookstore");

describe("Bookstore Inventory - Add Book", () => {
  beforeEach(() => {
    bookstore._reset();
  });

  test("should add a valid book to the inventory", () => {
    const book = {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      price: 500,
      stock: 10,
    };
    bookstore.addBook(book);
    expect(bookstore.getBooks()).toContainEqual(book);
  });

  test("should not allow duplicate book IDs", () => {
    const book1 = {
      id: 1,
      title: "Book A",
      author: "Author A",
      price: 100,
      stock: 10,
    };
    const book2 = {
      id: 1,
      title: "Book B",
      author: "Author B",
      price: 150,
      stock: 5,
    };

    bookstore.addBook(book1);
    expect(() => bookstore.addBook(book2)).toThrow("Book with this ID already exists");
  });

  test("should not allow book with negative price", () => {
    const book = {
      id: 2,
      title: "Invalid Book",
      author: "X",
      price: -50,
      stock: 5,
    };
    expect(() => bookstore.addBook(book)).toThrow("Price must be a positive number");
  });

  test("should not allow book with empty title", () => {
    const book = { id: 3, title: "", author: "Y", price: 100, stock: 5 };
    expect(() => bookstore.addBook(book)).toThrow("Title and Author are required");
  });

  test("should not allow book with negative stock", () => {
    const book = { id: 4, title: "Book D", author: "Z", price: 100, stock: -1 };
    expect(() => bookstore.addBook(book)).toThrow("Stock cannot be negative");
  });
});

describe("Bookstore Inventory - Delete Book", () => {
  beforeEach(() => {
    bookstore._reset();
  });

  test("should delete book with given ID", () => {
    const book = { id: 10, title: "Delete Me", author: "X", price: 100, stock: 1 };
    bookstore.addBook(book);

    bookstore.deleteBook(10);

    expect(bookstore.getBooks()).not.toContainEqual(book);
  });

  test("should throw error if book ID does not exist", () => {
    expect(() => bookstore.deleteBook(999)).toThrow("Book with this ID does not exist");
  });
});

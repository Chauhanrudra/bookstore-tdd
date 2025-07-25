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
describe("Bookstore Inventory - Search Books", () => {
  beforeEach(() => {
    bookstore._reset();

    bookstore.addBook({ id: 1, title: "Clean Code", author: "Robert Martin", price: 500, stock: 5 });
    bookstore.addBook({ id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 400, stock: 3 });
    bookstore.addBook({ id: 3, title: "Refactoring", author: "Martin Fowler", price: 300, stock: 2 });
  });

  test("should search books by partial title", () => {
    const result = bookstore.searchBooks({ title: "code" });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Clean Code");
  });

  test("should search books by partial author", () => {
    const result = bookstore.searchBooks({ author: "martin" });
    expect(result.length).toBe(2); // Robert Martin & Martin Fowler
  });

  test("should search books by price range", () => {
    const result = bookstore.searchBooks({ priceMin: 350, priceMax: 500 });
    expect(result.map(b => b.id)).toEqual([1, 2]);
  });

  test("should return empty array if no match", () => {
    const result = bookstore.searchBooks({ title: "nonexistent" });
    expect(result).toEqual([]);
  });

  test("should combine multiple filters", () => {
    const result = bookstore.searchBooks({ title: "refactor", author: "martin", priceMin: 200 });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Refactoring");
  });
});
describe("Bookstore Inventory - Purchase Book", () => {
  beforeEach(() => {
    bookstore._reset();
    bookstore.addBook({ id: 1, title: "Dune", author: "Frank Herbert", price: 350, stock: 5 });
  });

  test("should reduce stock after purchase", () => {
    bookstore.purchaseBook(1, 3);
    const updatedBook = bookstore.getBooks().find(b => b.id === 1);
    expect(updatedBook.stock).toBe(2);
  });

  test("should throw error if book ID does not exist", () => {
    expect(() => bookstore.purchaseBook(999, 1)).toThrow("Book not found");
  });

  test("should throw error if stock is insufficient", () => {
    expect(() => bookstore.purchaseBook(1, 10)).toThrow("Not enough stock available");
  });
});

describe("Bookstore Inventory - Restock Book", () => {
  beforeEach(() => {
    bookstore._reset();
    bookstore.addBook({ id: 1, title: "Atomic Habits", author: "James Clear", price: 250, stock: 2 });
  });

  test("should increase stock after restocking", () => {
    bookstore.restockBook(1, 5);
    const book = bookstore.getBooks().find(b => b.id === 1);
    expect(book.stock).toBe(7);
  });

  test("should throw error if book ID does not exist", () => {
    expect(() => bookstore.restockBook(999, 3)).toThrow("Book not found");
  });

  test("should throw error if quantity is not positive", () => {
    expect(() => bookstore.restockBook(1, 0)).toThrow("Quantity must be greater than zero");
    expect(() => bookstore.restockBook(1, -2)).toThrow("Quantity must be greater than zero");
  });
});

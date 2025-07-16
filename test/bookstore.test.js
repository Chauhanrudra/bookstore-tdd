const { addBook, getBooks } = require('../src/bookstore');

describe('Bookstore Inventory - Add Book', () => {
  beforeEach(() => {
    // Reset books before each test
    require('../src/bookstore')._reset();
  });

  test('should add a valid book to the inventory', () => {
    const book = { id: 1, title: 'Clean Code', author: 'Robert C. Martin', price: 500, stock: 10 };
    addBook(book);
    expect(getBooks()).toContainEqual(book);
  });
});

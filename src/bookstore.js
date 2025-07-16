let books = [];
function addBook(book){
    books.push(book);
}
function getBooks(){
    return books;
}
function _reset(){
    books=[];
}
module.exports = {addBook, getBooks, _reset}
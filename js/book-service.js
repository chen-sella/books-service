'user strict';
const KEY = 'booksDB';
var gBooks;
var gBooksNames = [
  'Don Quixote',
  'Moby Dick',
  'War and Peace',
  'Pride and Prejudice',
  'The Great Gatsby',
  'Ulysses',
  'Hamlet',
  'The Odyssey',
  'The Divine Comedy',
  'Lolita',
  'Anna Karenina',
];
var isSortTitle = false;
var isSortPrice = false;
var gPageIdx = 0;
const PAGE_SIZE = 4;

_createBooks();

function getImgUrl(bookName) {
  var str = bookName.replace(/\s/g, '');
  var url = `./Img/${str.toLowerCase()}.jpg`;
  return url;
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function findBook(bookId) {
  return gBooks.find(function (book) {
    return book.id === bookId;
  });
}

function addBook(name, price) {
  var newBook = _createBook(name, price);
  gBooks.push(newBook);
  _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
  var book = findBook(bookId);
  book.price = newPrice;
  _saveBooksToStorage();
}

function updateRate(bookId, newRate) {
  var book = findBook(bookId);
  book.rate = newRate;
  _saveBooksToStorage();
}

function sortBooks(sortBy) {
  if (sortBy === 'price') {
    if (isSortPrice) {
      gBooks.sort(function (book1, book2) {
        isSortPrice = false;
        return book2.price - book1.price;
      });
    } else {
      gBooks.sort(function (book1, book2) {
        isSortPrice = true;
        return book1.price - book2.price;
      });
    }
  }
  if (sortBy === 'title') {
    if (isSortTitle) {
      gBooks.sort(function (book1, book2) {
        var bookName1 = book1.name.toUpperCase();
        var bookName2 = book2.name.toUpperCase();
        isSortTitle = false;
        if (bookName1 < bookName2) {
          return -1;
        }
        return 1;
      });
    } else {
      gBooks.sort(function (book1, book2) {
        var bookName1 = book1.name.toUpperCase();
        var bookName2 = book2.name.toUpperCase();
        isSortTitle = true;
        if (bookName1 > bookName2) {
          return -1;
        }
        return 1;
      });
    }
  }
}

function getBooksToDisplay() {
  var startIdx = gPageIdx*PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx+PAGE_SIZE);
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length ) {
      gPageIdx = Math.floor(gBooks.length/PAGE_SIZE)-1;
  }
}

function prevPage() {
  gPageIdx--;
  if (gPageIdx * PAGE_SIZE < 0 ) {
      gPageIdx = 0;
  }
}

function moveToPage(pageIdx){
  gPageIdx = pageIdx;
}


//private functions
function _createBook(bookName, bookPrice = getRandomIntInclusive(10, 100)) {
  var book = {
    id: makeId(),
    name: bookName,
    price: bookPrice,
    imgUrl: getImgUrl(bookName),
    rate: 0,
  };

  return book;
}

function _createBooks(){
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    books = gBooksNames.map(function (bookName) {
      return _createBook(bookName);
    });
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

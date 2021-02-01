'user strict';

function onInit() {
    renderBooks();
    renderPaging();
}

function renderBooks() {
  var books = getBooksToDisplay();
    var strHTML = books
        .map(function(book) {
            return `<tr>
      <td>#${book.id}</td>
      <td>${book.name}</td>
      <td>$${book.price}</td>
      <td>
        <button onclick="onReadBook('${book.id}')">Read</button>
        <button onclick="onUpdateBook('${book.id}')">Update</button>
        <button onclick="onRemoveBook('${book.id}')">Delete</button>
      </td>
      </tr>`;
        })
        .join('');
    document.querySelector('.books-container').innerHTML = strHTML;
}

function renderPaging(){
  var strHTML = `<button class="paging" onclick="onPrevPage()"><<</button>`
  for (var i=0; i<gBooks.length/PAGE_SIZE; i++){
    strHTML += `<button data-idx="${i}" "class="paging" onclick="onMoveToPage(${i})">${i+1}</button>`
  }
  strHTML += `<button class="paging" onclick="onNextPage()">>></button>`
  document.querySelector('.paging-container').innerHTML = strHTML;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderPaging();
    renderBooks();
}

function onShowForm(){
  var elDiv = document.querySelector('.new-book-container');
  elDiv.classList.toggle('show-form');
}

function onAddBook(ev){
  ev.preventDefault();
  var elBookName = document.querySelector('input[name=bookName]');
  var elBookPrice = document.querySelector('input[name=bookPrice]');
  var name = elBookName.value;
  var price = +elBookPrice.value;
  addBook(name, price);
  renderBooks();
  renderPaging();
  elBookName.value ='';
  elBookPrice.value ='';
  var elDiv = document.querySelector('.new-book-container');
  elDiv.classList.remove('show-form');

}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Please enter book new price');
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var elModal = document.querySelector('.book-modal');
    elModal.classList.add('show-modal');
    var book = findBook(bookId);
    var modalContent = renderModal(book);
    elModal.innerHTML = modalContent;
}

function onSortBooks(sortBy){
  sortBooks(sortBy);
  renderBooks();
}

function onPrevPage(){
  prevPage();
  renderBooks();
}

function onNextPage(){
  nextPage();
  renderBooks();
}

function onMoveToPage(pageIdx){
  moveToPage(pageIdx);
  renderBooks();
}


function renderModal(book) {
    var strHTML = `<button class="close-modal" onclick="onCloseModal()">x</button>
    <h2>Book Detailes</h2>
    <img src="${book.imgUrl}" onerror="this.onerror=null;this.src='./Img/default.jpg'">
    <p>${makeLorem()}</p>
    <p>rate:</p>
    <input type="number" class="rate" value="${book.rate}" min="0" max="10">
    <button class="rate-btn" onclick="onUpdateRate('${book.id}')">Submit Rate</button> `;
    return strHTML;
}

function onCloseModal() {
    var elModal = document.querySelector('.book-modal');
    elModal.classList.remove('show-modal');
}

function onUpdateRate(bookId) {
    var rate = document.querySelector('.rate').value;
    updateRate(bookId, rate);
    renderBooks();
}


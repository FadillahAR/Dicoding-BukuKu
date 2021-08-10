const uncompleted_read_id = "uncompleteBookshelfList"
const completed_read_id = "completeBookshelfList"
const book_itemId = "itemId";

function saveBook (title, author, year, hasRead  ) {

  
  const textTitle = document.createElement("h3")
  textTitle.innerText = title

  const textAuthor = document.createElement("p")
  textAuthor.innerText = author

  const textYear = document.createElement("p")
  textYear.innerText =  year

  // const finishButton = document.createElement("button")
  // finishButton.classList.add("finish")
  // finishButton.innerText = "Selesai dibaca"
  
  // const deleteButton = document.createElement("button")
  // deleteButton.classList.add("delete")
  // deleteButton.innerText = "Hapus"

  const textContainer = document.createElement("div")
  textContainer.classList.add("inner")
  textContainer.append(textTitle, textAuthor, textYear)

  const container = document.createElement("div");
  container.classList.add("container")
  container.append(textContainer);
  
  if (hasRead) {
    container.append(deleteButton());
    container.append(UndoButton());
  } else {
    container.append(finishButton());
    container.append(deleteButton());
  }
  

  return container
}

function addBook () {
  const uncompletedRead = document.getElementById(uncompleted_read_id);
  // const completedRead = document.getElementById(completed_read_id)
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;

  const book = saveBook(title, author, year, false);
  const bookObject = composeBookObject(title, author, year, false);

  book[book_itemId] = bookObject.id;
  books.push(bookObject);

  uncompletedRead.append(book);
  updateDataToStorage();
}

function createButton(buttonTypeClass , eventListener) {
  const button = document.createElement("button");
  button.innerText = "Selesai dibaca";
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
      eventListener(event);
  });
  return button;
}

function createDeleteButton(buttonTypeClass , eventListener) {
  const button = document.createElement("button");
  button.innerText = "Hapus";
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
      eventListener(event);
  });
  return button;
}

function createUndoButton(buttonTypeClass , eventListener) {
  const button = document.createElement("button");
  button.innerText = "Belum selesai";
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
      eventListener(event);
  });
  return button;
}

function addBookToBookshelf(book) {
    const bookfinished = document.getElementById(completed_read_id);
    const bookTitle = book.querySelector(".inner > h3").innerText;
    const bookAuthor = book.querySelector(".inner > p").innerText;
    const bookYear = book.querySelector(" p + p").innerText;
 
    const newBook = saveBook(bookTitle, bookAuthor, bookYear, true);
    const Book = findBook(book[book_itemId]);
    Book.hasRead = true;
    newBook[book_itemId] = Book.id;

    bookfinished.append(newBook)
    book.remove();

    updateDataToStorage();
}

function finishButton() {
  return createButton("finish-button", function(event){
       addBookToBookshelf(event.target.parentElement);
  });
}

function removeBookFromBookshelf(book) {
  const bookPosition = findBookIndex(book[book_itemId]);
  books.splice(bookPosition, 1);

  book.remove();
  updateDataToStorage();
}

function deleteButton() {
  return createDeleteButton("delete-button", function(event){
      removeBookFromBookshelf(event.target.parentElement);
  });
}

function undoBookFromBookshelf(book){
  const bookUnfinished = document.getElementById(uncompleted_read_id);
  const bookTitle = book.querySelector(".inner > h3").innerText;
  const bookAuthor = book.querySelector(".inner > p").innerText;
  const bookYear = book.querySelector(" p + p").innerText;

  const newBook = saveBook(bookTitle, bookAuthor, bookYear, false);
  const Book = findBook(book[book_itemId]);
  Book.hasRead = false;
  newBook[book_itemId] = Book.id;

  bookUnfinished.append(newBook)
  book.remove();

  updateDataToStorage();
}

function UndoButton() {
  return createUndoButton("undo-button", function(event){
      undoBookFromBookshelf(event.target.parentElement);
  });
}

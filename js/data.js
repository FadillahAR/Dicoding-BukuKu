const localKey = "new_book";

let books = [];
function isStorageExist() {
  if (typeof(Storage) === undefined){
    alert("Browser kamu tidak mendukung local storage");
      return false;
  }
  return true;
} 

function saveData () {
    const parsed = JSON.stringify(books);
    localStorage.setItem(localKey, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
  }

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(localKey);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
}
  
function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}
  
function composeBookObject(title, author, year, hasRead) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        hasRead
    };
}
  
function findBook(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
}
  
function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(uncompleted_read_id);
    let listCompleted = document.getElementById(completed_read_id);
  
  
    for(book of books){
        const newBook = saveBook(book.title, book.author, book.year, book.hasRead);
        newBook[book_itemId] = book.id;
  
  
        if(book.hasRead){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }
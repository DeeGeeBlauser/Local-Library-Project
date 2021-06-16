function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowStatus = books.reduce(
    (acc, book) => {
      if (!book.borrows[0].returned) {
        acc[0].push(book);
      } else {
        acc[1].push(book);
      }
      return acc;
    },
    [[], []]
  );
  return borrowStatus;
}

function getBorrowersForBook(book, accounts) {
  //creating new variable "book1" w the spread operator so original book variable is not disturbed.
  let book1 = { ...book };
  book1.borrows = book1.borrows.slice(0, 10);
  return book1.borrows.reduce((acc, borrow) => {
    let borrowedStatus = borrow.returned;
    borrow = accounts.find((account) => account.id === borrow.id);
    borrow.returned = borrowedStatus;
    acc.push(borrow);
    return acc;
  }, []);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

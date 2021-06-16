function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((authorA, authorB) =>
    authorA.name.last.toLowerCase() > authorB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (book of books) {
    let borrowCount = book.borrows.reduce((acc, borrow) => {
      if (borrow.id === account.id) {
        acc++;
      }
      return acc;
    }, 0);
    totalBorrows += borrowCount;
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((acc, book) => {
    if (
      book.borrows[0].id === account.id &&
      book.borrows[0].returned === false
    ) {
      book.author = authors.find((author) => author.id === book.authorId);
      acc.push(book);
    }
    return acc;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

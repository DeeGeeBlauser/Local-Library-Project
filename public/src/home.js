const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      acc += 1;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  let usedGenres = [];
  const genreCounts = books
    .reduce((acc, book) => {
      if (!usedGenres.includes(book.genre)) {
        usedGenres.push(book.genre);
        acc.push({
          name: book.genre,
          count: books.filter((novel) => novel.genre === book.genre).length,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);
  return genreCounts;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  });
  popularBooks.sort((a, b) => b.count - a.count);
  return popularBooks.slice(0, 5);
}

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((acc, b) => acc + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);

  let arr = sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find((author) => author.id === Number(authorId));
      let name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
  return arr;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

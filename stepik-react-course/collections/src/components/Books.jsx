import Book from "./Book";

const Books = ({ books, removeBooks}) => {
  return (
    <div>
      {books.map((book) => (
        <Book 
        key={book.id} 
        name={book.name} 
        removeBooks={removeBooks}
        id={book.id} />
      ))}
    </div>
  );
};

export default Books;

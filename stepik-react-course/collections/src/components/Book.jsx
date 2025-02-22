const Book = ({ removeBooks, id, name ,...props}) => {
  return(
  <h2>
    {name}
    <button onClick={() => removeBooks(id)}>delete</button>
  </h2>
  )
};

export default Book;

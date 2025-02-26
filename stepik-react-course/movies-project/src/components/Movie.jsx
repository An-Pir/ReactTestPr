import React from "react";

const Movie = (props) => {
  const {
    Title: title,
    Year: year,
    imdbID: id,
    Type: type,
    Poster: poster,
  } = props;

  return (
    <div id={id} className="card movie">
      <div className="card-image waves-effect waves-block waves-light">
        {poster === "N/A" ? (
          <img
            className="activator"
            alt="activator"
            src={"https://placehold.jp/f0fff6/ffffff/150x300.png?text={title}"}
          />
        ) : (
          <img className="activator" alt={poster}
          src={poster} />
        )}
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {title}
        </span>
        {/* <p>
          <a href="#">This is a link</a>
        </p> */}
        <p>
          {year} <span>{type}</span>
        </p>
      </div>
    </div>
  );
};

export default Movie;

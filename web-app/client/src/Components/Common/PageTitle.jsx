const PageTitle = ({className='', name }) => {
  return (
    <h1 className= {` ${className} text-[24px] sm:text-4xl lg:text-5xl text-center font-bold mb-15 text-dark-blue`}>
      {name}
    </h1>
  );
};

export default PageTitle;

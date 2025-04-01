
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
  const navigate = useNavigate();
 const handleClick = () => {
  navigate('./login');
 }


  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl text-center font-bold mb-15 text-dark-blue'>
        Кредитный калькулятор
      </h1>
      <p onClick={handleClick} className=' text-center text-lg font-bold   text-orange-400 underline cursor-pointer hover:text-orange-600 hover:text-xl  transition-all duration-500'> Для того чтобы воспользоваться кредитным калькулятором вам необходимо авторизоваться!</p>
      
    </div>
  );
};

export default MainPage;
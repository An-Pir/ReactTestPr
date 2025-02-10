import React, {useState} from "react";
import PageWrap from "./authComponents/PageWrap";
import Form from "./authComponents/Form";
import InputWrap from "./authComponents/InputWrap";
import TitleForm from "./authComponents/TitleForm";
import Label from "./authComponents/Label";
import Input from "./authComponents/Input";
import Button from "../../UIcomponents/Button";
import './RegistrationPage.css';

const RegistrationPage = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[repeatPassword, setRepeatPassword] = useState('');
  const[isAgreed, setIsAgreed] = useState(false);
  const[errorMessage, setErrorMessage] = useState('');
  const[passwordMessage, setPasswordMessage] = useState('');
  

  const  emailHandler = (event) => {
    setEmail(event.target.value);
  }
  const  passwordHandler = (event) => {
    setPassword(event.target.value);
  }
  const  repeatPasswordHandler = (event) => {
    setRepeatPassword(event.target.value);
  }
  const  isAgreedHandler = (event) => {
    setIsAgreed(event.target.checked);
  }
const handleSubmit = (event) => {
  event.preventDefault();

  setErrorMessage('');
  setPasswordMessage('');
  
  if(password.length < 8){
    setErrorMessage('Пароль должен содержать минимум 8 символов');
    return;
  }
  if(repeatPassword !== password){
    setPasswordMessage('Пароли не совпадают');
    return
  }

  console.log("Email:", email);
  console.log("Password:", password);
  console.log("RepeatPassword:", repeatPassword);
  console.log("IsAgreed:", isAgreed);
}

  return (
    <PageWrap>
      <Form onSubmit={handleSubmit}>

        <TitleForm className="title-form" title="Регистрация"/>

        {errorMessage && (
          <p className="error-text">{errorMessage}</p>
        )}
        {passwordMessage && (
          <p className="error-text">{passwordMessage}</p>
        )}

        <InputWrap className="input-wrap">
          <Label htmlFor="email" labelTitle='Эл. адрес'/>
          <Input 
          onChange={emailHandler} 
          type="email" 
          id="email" 
          placeholder="email" 
          required/>
        </InputWrap>

        <InputWrap className="input-wrap">
          <Label htmlFor="password" labelTitle='Пароль'/>
          <Input 
          onChange={passwordHandler} 
          type="password" 
          id="password" 
          placeholder="password" 
          minLength="8"
          required/>
        </InputWrap>

        <InputWrap className="input-wrap">
          <Label htmlFor="rew-password" labelTitle='Повторить пароль'/>
          <Input 
          onChange={repeatPasswordHandler} 
          type="password" 
          id="rew-password" 
          placeholder="password" 
          minLength="8"
          required/>
        </InputWrap>

        <InputWrap className="input-wrap checkbox">
          <Label htmlFor="checkbox" labelTitle='согласен на обработку персональных данных'/>
          <Input 
          onChange={isAgreedHandler} 
          type="checkbox" 
          id="checkbox" 
          required/>
        </InputWrap>

        <Button type="submit" name="Зарегистрироваться"/>
      </Form>
    </PageWrap>
  );
};

export default RegistrationPage;

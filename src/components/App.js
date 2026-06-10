import React, {Component, useState} from "react";
import '../styles/App.css';

const App = () => {
  const [errorMess, setErrorMess] = useState('')
  const [userData, setUserData] = useState({name:'',email:'',gender:'male',phoneNumber:'',password:''})
  const [welcome, setWelcome] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    setWelcome('')
    let {name, email,gender,phoneNumber,password} = userData
    if(name ==='' || email === '' || phoneNumber ==='' || password === ''){
      setErrorMess('All fields are mandatory')
    }else if(!/^[a-zA-Z0-9 ]+$/.test(name)){
      setErrorMess('Name is not alphanumeric')
    }else if(!email.includes('@')){
      setErrorMess('Email must contain @')
    }else if(!new Set(['male','female','other']).has(gender)){
      setErrorMess('Please identify as male, female or others')
    }else if(!/^\d+$/.test(phoneNumber)){
      setErrorMess('Phone Number must contain only numbers')
    }else if(password.length < 6){
      setErrorMess('Password must contain at least 6 letters')
    }else{
      let idx = email.indexOf('@')
      setWelcome(email.slice(0,idx))
      setErrorMess('')
      setUserData({name:'',email:'',gender:'male',phoneNumber:'',password:''})
    }
  }
  function handleChange(e){
    let k = e.target.dataset.testid
    let val = e.target.value
    setErrorMess('')
    setUserData(prev => (
      {...prev,
        [k]:val
      }
    ))
  }

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        <input data-testid='name' value={userData.name} onChange={handleChange} />
        <input data-testid='email' value={userData.email} onChange={handleChange} />
        <select data-testid='gender' value={userData.gender} onChange={handleChange}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
        <input data-testid='phoneNumber' value={userData.phoneNumber} onChange={handleChange} />
        <input data-testid='password' type="password" value={userData.password} onChange={handleChange} />
        <button type="submit" data-testid='submit'>Submit</button>
      </form>
      <span style={{color:'red'}}>{errorMess}</span>
      {welcome && <h2>Hello {welcome}</h2>}
    </div>
  )
}


export default App;

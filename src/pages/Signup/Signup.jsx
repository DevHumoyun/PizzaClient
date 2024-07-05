import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Signup.scss"
import { CloseOutlined } from '@ant-design/icons'
import { register } from '../../server/authServer'
import { setUser } from '../../redux/reduxStore/authSlice'

const Signup = () => {
    const [errorText , setErrorText ] = useState("");
    
    const [formValues , setFormValues ] = useState({
        telephone: null,
        email : null,
        name: null, 
        password: null
    })
    

    const handleSubmit = async (e ) => {
        e.preventDefault();
        try {
            let {telephone , email , name , password } = formValues;
            if(!telephone || !email || !name  || !password) {
                return setErrorText("Pleas fill all values")
            }


            telephone = telephone.trim()
            email = email.trim()
            name = name.trim()
            password = password.trim()
            const formData = new FormData()
            
            for (const key in formValues) {
                formData.append(key, formValues[key]);
              }

            if(telephone == "" || email == "" || name == "" |password == ""){
                return setErrorText("Pleas fill all values")
            }

            console.log({telephone , email , name , password});
            const {token , user} = await register(formData);
            localStorage.setItem("token" , token);
            localStorage.setItem("myId" , user._id);
            setUser(user)
            setErrorText("")
        } catch (error) {
            console.log(error);
            setErrorText(error.response.data.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value
        });
      };
    
  return (
    <div className='sign-up'>
        <div className="sign-parent">

            
            <div className="sign-up-box">
                <h2 className='sign-up-title'>Sign up</h2>
                <p className='sign-up-text'>Сможете быстро оформлять заказы,
                использовать бонусы</p>
                <form onSubmit={handleSubmit} action="">
                    <label htmlFor="telephone ">
                        <p className='telephone-sign sign-label'>Telephone</p>
                        <input onChange={handleChange} name='telephone' type="tel" id='telephone' className='sign-input' />
                    </label>
                    <label htmlFor="name-input ">
                        <p className='name-sign sign-label'>Name</p>
                        <input onChange={handleChange} name='name' type="text" className='sign-input' id='name-input' />
                    </label>
                    <label htmlFor="email-input">
                        <p className='sign-label'>Email</p>
                        <input onChange={handleChange} name='email' className='sign-input' type="email" id='email-input'/>
                    </label>

                    <label htmlFor="password-input">
                        <p className='sign-label'>Password</p>
                        <input  onChange={handleChange} name='password' className='sign-input' type="text" id='password-input'/>
                    </label>
                    <span className='error-span'>{errorText}</span>
                    <button className="sign-btn">
                        Sign Up
                    </button>
                </form>
            </div>
            <Link className='to-home' to={'/'} > <CloseOutlined /></Link >
        </div>
    </div>
  )
}

export default Signup

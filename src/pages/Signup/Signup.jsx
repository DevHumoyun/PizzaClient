import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.scss"
import { CloseOutlined } from '@ant-design/icons'
import { register } from '../../server/authServer'
import { setUser } from '../../redux/reduxStore/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { failureLoader, startLoader, successLoader } from '../../redux/reduxStore/loaderSLice'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
    const [errorText , setErrorText ] = useState("");
    const [phone, setPhone] = useState('');
    const {isLoading } = useSelector(state => state.loaderSlice)
    
    const [formValues , setFormValues ] = useState({
        email : null,
        name: null, 
        password: null
    })

    const dispatch = useDispatch();
    const navigate = useNavigate()
    

    const handlePhoneChange = (value) => {
        setPhone(value);
    };

    const handleSubmit = async (e ) => {
        e.preventDefault();
        dispatch(startLoader())
        try {
            if(!phone || phone.length !== 12){
                dispatch(failureLoader())
                return setErrorText("Please fill your telephone number")
            }
            let {  email , name , password } = formValues;
            if( !email || !name  || !password) {
                dispatch(failureLoader())
                return setErrorText("Pleas fill all values")
            }


            email = email.trim()
            name = name.trim()
            password = password.trim()
            const formData = new FormData()
            
            for (const key in formValues) {
                formData.append(key, formValues[key]);
            }
            formData.append('telephone' , phone)

            if( email == "" || name == "" |password == ""){
                dispatch(failureLoader())
                return setErrorText("Pleas fill all values")
            }
            const {token , user} = await register(formData);
            localStorage.setItem("token" , token);
            localStorage.setItem("myId" , user._id);
            dispatch(setUser(user))
            setErrorText("");
            dispatch(successLoader())
            navigate('/signup2')
        } catch (error) {
            console.log(error);
            setErrorText(error.response.data.message)
            dispatch(failureLoader())
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
                    <label htmlFor="">
                    <p className='name-sign sign-label'>Telephone</p>
                    <PhoneInput
                            className={'phone-input'}
                            country={'uz'}
                            value={phone}
                            onChange={handlePhoneChange}
                            inputStyle={{
                                display: "block",
                                margin: "auto",
                                color:" #A5A5A5",
                                background: "#FFFFFF",
                                paddingLeft: "5px",
                                border: '1px solid #F0F0F0',
                                width: '320px',
                                height: '48px',
                                top:' 26px',
                                gap: '0px',
                                borderRadius: '6px' ,
                                border: '1px',
                                opacity:' 0px',
                                paddingLeft: '45px',
                                position:"sticky"

                            }}
                            buttonStyle={{
                                borderRadius: '4px 0 0 4px',
                                border: '1px solid #ccc',
                            }}
                            containerStyle={{
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: "center",
                                maxWidth: "320px",
                                marginLeft: "25px"
                            }}
                        />
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
                    <Link className='login-link' to={'/login'}>Login</Link>
                    <button className="sign-btn">
                        {
                            isLoading ? "Loading..." : "Sign Up"
                        }
                    </button>
                </form>
            </div>
            <Link className='to-home' to={'/'} > <CloseOutlined /></Link >
        </div>
    </div>
  )
}

export default Signup

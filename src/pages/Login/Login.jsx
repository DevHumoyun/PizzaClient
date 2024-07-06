import React, { useRef, useState } from 'react'
import "./Login.scss"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { login } from '../../server/authServer';
import { useDispatch, useSelector } from 'react-redux';
import { failureLoader, startLoader, successLoader } from '../../redux/reduxStore/loaderSLice';

const Login = () => {

    const [phone, setPhone] = useState('');
    const [wareError , setWareError ] = useState('')
    const {isLoading} = useSelector(state => state.loaderSlice)
    const pass_ref = useRef();
    const dispatch = useDispatch()

    const handlePhoneChange = (value) => {
        setPhone(value);
    };

    const handleLogin = async ( ) => {
        dispatch(startLoader())
        try {
            
            if(phone.length !== 12){
                dispatch(failureLoader())
                return setWareError("Your number is incorrect or not filled")
            }
            if(!pass_ref.current.value  ){
                dispatch(failureLoader())
                return setWareError('Please fill all fields')
            }

            const {token , user} = await login({telephone: phone , password: pass_ref.current.value});
            
            setWareError("")
            localStorage.setItem("token" , token);
            localStorage.setItem("myId" , user._id);

            dispatch(successLoader())
        } catch (error) {
            dispatch(failureLoader())
            setWareError(error.response?.data?.message);
        }
    }
  return (
    <div className='login'>
        <div className="login-parent">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <p className="login-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, voluptatem!</p>

                <div >
                    <label htmlFor="login-tel">
                        <p className="login-inp-text">Telephone</p>
                        {/* <input type="tel" id='login-tel' className='login-inp' /> */}
                        <PhoneInput
                            
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
                    <label htmlFor="login-pass">
                        <p className="login-inp-text">Password</p>
                        <input ref={pass_ref} type="tel" id='login-pass' className='login-inp' />
                    </label>

                    <span className='error-span'>{wareError}</span>
                    <button  onClick={handleLogin} className="sign-btn">{isLoading ? "Loading..." : "Login"}</button>
                </div>

                <p className="footer-login-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate est quos soluta quis qui nostrum, quaerat maiores magni eius eveniet.</p>
            </div>
        </div>
      
    </div>
  )
}

export default Login
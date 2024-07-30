import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import "./ProfileUptade.scss"
import { toast } from 'react-toastify'
import { updateUser } from '../../server/usersServer'
import { setUser } from '../../redux/reduxStore/authSlice'
import { failureLoader, startLoader, successLoader } from '../../redux/reduxStore/loaderSLice'
import { login } from '../../server/authServer'

const ProfileUpdate = () => {
    const {user} = useSelector(state => state.authSlice);
    const {isLoading} = useSelector(state => state.loaderSlice);
    const [isPassword , setIsPassword ] = useState(false)
    const [isUpdate , setIsUpdate ] = useState(false);
    const name_rf = useRef()
    const  phone_rf= useRef()
    const  email_rf= useRef()
    const  date_rf = useRef();
    const  oldPass_rf= useRef()
    const  confPass1_rf= useRef()
    const  confPass2_rf = useRef();

    const dispatch = useDispatch()

    const handleUpdateUser = async () => {
        dispatch(startLoader())
        try {
            console.log(date_rf.current.value);
            const name = name_rf.current.value
            const telephone = phone_rf.current.value
            const email = email_rf.current.value
            const date = date_rf.current.value

            if(name == '' || telephone == '' || email == '' || date == ''){
                return toast.error('please fill fields')
            }
            const id = localStorage.getItem('myId')
            const data = await updateUser({name , telephone , email , birthDate: date} ,id );
            dispatch(setUser(data.user))
            console.log(data);
            toast.success(data.message);
            dispatch(successLoader())
            setIsUpdate(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            dispatch(failureLoader())
        }
    }

    const handleChangePassword = async () =>{
        try {
            const oldPassword = oldPass_rf.current.value
            const data = await login({telephone: user.telephone , password :oldPassword})
            if(data.user){
                const confPassword1 = confPass1_rf.current.value
                const confPassword2 = confPass2_rf.current.value
                if(confPassword1 !== confPassword2){
                    return toast.error("Пароли не совпадают")
                }
                const newData = await updateUser({password: confPassword1} ,user._id);
                toast.success(newData.message)
                setIsPassword(false)
            }
            console.log(data);
        } catch (error) {
            return toast.error(error.response.data.message)
        }
    }
    
    useEffect(() => {
        
    } ,[])
  return (
    <div className='Profile-uptade'>
        <div className="personal-information">
            <div className="pers-info-top">
                <h3 className="pers-info-title"> {isUpdate ? 'Изменение личных данных' : 'Личные данные' }</h3>
                {
                    !isUpdate && <button onClick={() => setIsUpdate(true)} className="change-info"><i class="fa-solid fa-pen"></i> Изменить</button>
                }
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Имя*</th>
                            <th>Номер телефона*</th>
                            <th>Почта</th>
                            { !isUpdate && <th>Дата рождения</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                isUpdate ?
                                <>
                                    <td><input ref={name_rf} type="text" defaultValue={user?.name} /></td>
                                    <td><input ref={phone_rf} type="text" defaultValue={user?.telephone} /></td>
                                    <td><input ref={email_rf} type="text" defaultValue={user?.email}  /></td>
                                    
                                </>
                                :
                                <>
                                    <td>{user?.name}</td>
                                    <td>{user?.telephone}</td>
                                    <td>{user?.email}</td>
                                    <td>{ moment(user?.birthDate).format('DD-MM-YYYY')}</td>
                                </>
                            }
                        </tr>
                    </tbody>
                </table>

               {
                isUpdate &&
                <table>
                    <thead>
                        <tr>
                            <th>Дата рождения</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="date" ref={date_rf} defaultValue={moment(user?.birthDate).format('YYYY-MM-DD')}  /></td>
                    </tr>
                    </tbody>
                </table>

               }
                {
                    isUpdate && <button onClick={handleUpdateUser} className="saveChanges">{
                        isLoading ? "Loading..." : 'Сохранить изменения'
                    }</button>
                }
            </div>
        </div>
        <div className="profile-password">
            <div className="profile-password-box">
                <h3 className='acc-pass-title'>{isPassword ? 'Изменить пароль' : 'Пароль'}</h3>
                {
                    !isPassword &&
                    <button onClick={() => setIsPassword(true)} className="change-info"><i class="fa-solid fa-pen"></i> Изменить</button>
                }
            </div>
            {
                isPassword &&
                <table>
                    <thead>
                        <tr>
                            <th>Старый пароль*</th>
                            <th>Новый пароль*</th>
                            <th>Подтвердите пароль*</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input ref={oldPass_rf} type="password"  /></td>
                        <td><input ref={confPass1_rf} type="password"  /></td>
                        <td><input ref={confPass2_rf} type="password"  /></td>
                    </tr>
                    </tbody>
                </table>
            }
                {
                    isPassword && <button onClick={handleChangePassword}  className="saveChanges">{
                        isLoading ? "Loading..." : 'Сохранить изменения'
                    }</button>
                }
            

        </div>
        <div className="profile-follows">
            <h3 className='acc-pass-title'>Подписки</h3>
            <p><input type="checkbox" />Получать предложения и акции </p>
        </div>
    </div>
  )
}

export default ProfileUpdate

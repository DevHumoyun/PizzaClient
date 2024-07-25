import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import "./ProfileUptade.scss"

const ProfileUpdate = () => {
    const {user} = useSelector(state => state.authSlice);
    const [normalTime , setNormaltime ] = useState()
    
    useEffect(() => {
        
    } ,[])
  return (
    <div>
        <div className="personal-information">
            <div className="pers-info-top">
                <h3 className="pers-info-title">Личные данные</h3>
                <button className="change-info">Изменить</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Имя*</th>
                            <th>Номер телефона*</th>
                            <th>Почта</th>
                            <th>Дата рождения</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user?.name}</td>
                            <td>{user?.telephone}</td>
                            <td>{user?.email}</td>
                            <td>{ moment(user?.birthDate).format('DD-MM-YYYY')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="profile-password">
            <h3 className='acc-pass-title'>Пароль</h3>
            <button className="change-info"><i class="fa-solid fa-pen"></i> Изменить</button>
        </div>
        <div className="profile-follows">
            <h3 className='acc-pass-title'>Подписки</h3>
            <p><input type="checkbox" />Получать предложения и акции </p>
        </div>
    </div>
  )
}

export default ProfileUpdate

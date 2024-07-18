import React from 'react'
import pizza from "../../img/Rectangle 4.png"
import fire from "../../img/Group 81.png"
import cheese from "../../img/Group 83.png"
import product from "../../img/Group 89.png"
import peperoni from "../../img/Group 90.png"
import sauce from "../../img/Group 91.png"
import mushroom from "../../img/Group 727.png"
import onions from "../../img/Group 728.png"
import maybe from "../../img/Group 729.png"
import "./WatchProduct.css"

const WatchProduct = () => {
  return (
    <div className='Products'>
      <div className="products-content">
        <div className="products-content-right">
          <button className='new'>NEW</button>
          <img src={pizza} alt=""  className='pizza'/>
        </div>
        <div className="products-content-left">
          <p><img src={fire} alt="fire" /> Пепперони по-деревенски</p>
          <div className="left-item">
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={cheese} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Моцарелла</h5>
              </div>
            </div>
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={product} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Огурцы маринованные</h5>
              </div>
            </div>
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={peperoni} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Пепперони</h5>
              </div>
            </div>
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={sauce} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Томатный соус</h5>
              </div>
            </div>
          </div>
          <div className="dimensions">
            <div className="top">
              <div className="left">Традиционное</div>
              <div className="left">Тонкое</div>
            </div>
            <div className="bottom">
              <div className="left">20 см</div>
              <div className="left">28 см</div>
              <div className="left">33 см</div>
            </div>
          </div>
          <div className="supplement">
            <h3>Добавьте в пиццу</h3>
            <div className="left-item">
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={cheese} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Моцарелла</h5>
                <p className='price'>59 ₽</p>
              </div>
            </div>
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={mushroom} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Шампиньоны</h5>
                <p className='price'>59 ₽</p>
              </div>
            </div>
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={onions} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Красный лук</h5>
                <p className='price'>59 ₽</p>
              </div>
            </div>
            <div className="additional-products">
              <div className="additional-products-item">
                <img src={maybe} alt="" />
              </div>
              <div className="additional-products-title">
                <h5>Сладкий перец</h5>
                <p className='price'>59 ₽</p>
              </div>
            </div>
          </div>
          </div>
          <div className="common-money">
            <h3>Итого: 379 ₽</h3>
            <button>Добавить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchProduct;
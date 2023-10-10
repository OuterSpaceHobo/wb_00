import { products, user } from './data.js'
import { WordEnding } from './service.js'

export function renderCart(cart) {
    // console.log('init cart', cart )
    const prods = document.getElementById("items__list");
  
    let rez = products.map(product => `
    <li class="item__container">
  
    <div class="item__block">
  
      <div class="check__itemImg">
        <input id="item__checkbox__${product.id}" onclick="singleInputToggle(event, '${product.id}', name)" name="${genCheckboxName()}" class="checkbox" type="checkbox" name="peas" checked />
        <img name="desc__img" class="item__image" src="${product.img}" alt="" width="72" height="96">
      </div>
  
      <div class="check__itemImg__mobile">
      <input id="item__checkbox__${product.id}" onclick="singleInputToggle(event, '${product.id}', name)" name="${genCheckboxName()}" class="checkbox__mobile" type="checkbox" name="peas" checked />
      ${product.size ? `<div class="item__size__mobile"><p class="item__size__p">${product.size}</p></div>` : ``}
      <img name="mobile__img" class="item__image" src="${product.img__mobile}" alt="" width="80" height="106">
      </div>
  
      <div class="item__description">
  
        <div class="item__price__container__mobile">
          <div>
            <span 
            class="currency__string" 
            name="item__qty__sale__total__${product.id}"
            id="item__qty__sale__total__${product.id}">0</span>
            <span class="currency__string">сом</span>
          </div>
          <div>&nbsp;</div>
          <div class="tooltip">
            <div 
            class="lined__price" 
            name="item__qty__total__${product.id}"
            id="item__qty__total__${product.id}">
              ${cart[product.id]} сом
            </div>
            <div class="tooltiptext end__tip flex__col">
              <div class="tip__container tip__text" style="margin-bottom: 8px;">
                <span class="gray">Скидка ${(product.general_discount).toLocaleString('en-GB', { style: 'percent' })}</span> 
                <span class="tip__flex">−</span>
                <span 
                name="item__general__discount__summ__${product.id}"
                id="item__general__discount__summ__${product.id}">0</span> 
                <span>&nbsp;сом</span>
              </div>
              <div class="tip__container tip__text">
                <span class="gray">Скидка покупателя ${(product.personal_discount).toLocaleString('en-GB', { style: 'percent' })}</span> 
                <span class="tip__flex">−</span>
                <span 
                name="item__personal__discount__summ__${product.id}"
                id="item__personal__discount__summ__${product.id}">0</span> 
                <span>&nbsp;сом</span>
              </div>
            </div>
          </div>
        </div>
  
        <p class="item__name">${product.name}</p>
  
        <div class="item__col__size">
          ${product.color ? `<span style="margin: 4px 0px 5px 0px" class="item__additional">Цвет: ${product.color}</span>` : ``}
          ${product.size ? `<span style="margin: 4px 0px 5px 0px" class="item__additional size__desctop">Размер: ${product.size}</span>` : ``}
        </div>
  
        <span class="item__additional gray">${product.warehouse}</span>
  
        <div class="item__seller__info">
          <span class="item__additional gray">${product.seller_name}</span>
  
          <div class="tooltip">
            <img style="cursor: pointer;" src="assets/cart_view/icon-20.svg" alt="">
            <span class="tooltiptext info__tip flex__col">
              <span class="tip__text" style="font-weight: bold;">${product.seller_form} «${(product.seller_name).toLocaleUpperCase()}»</span>            <span class="tip__text">${product.seller_ogrn}</span>
              <span class="tip__text">${product.seller_adress}</span>
            </span> 
          </div>
  
        </div>
  
      </div>
  
    </div>
  
    <div class="item__qty__container">
      <div class="item__counter__container">
        <button class="decrement__btn" id="decrement__btn__${product.id}" onClick="decrement('${product.id}')">−</button>
        <span class="item__qty__number" id="item__qty__${product.id}">${cart[product.id]}</span>
        <button class="increment__btn" id="increment__btn__${product.id}" onClick="increment('${product.id}')">+</button>
      </div>
      ${+product.in_stock <= 5 ? `<span class="item__remained">Осталось ${product.in_stock} шт.</span>` : ``}
      <div class="icons__hover__container">
        <div class="qty__item__icons">
          <button onClick="toggleFavorites('${product.id}', event)" class="cart__heart__button" id="cart__heart__${product.id}" type="button"></button>
          <button class="cart__bucket__button" type="button"></button>
        </div>
      </div>
    </div>
  
    <div class="item__price__container">
      <div style="margin-bottom: 6px;">
        <span 
        name="item__qty__sale__total__${product.id}"
        class="value__string" id="item__qty__sale__total__${product.id}">0</span>
        <span class="currency__string">сом</span>
      </div>
  
      <div class="tooltip">
        <div class="lined__price" name="item__qty__total__${product.id}" id="item__qty__total__${product.id}">${cart[product.id]} сом</div>
        <div class="tooltiptext end__tip flex__col">
          <div class="tip__container tip__text">
            <span class="gray">Скидка ${(product.general_discount).toLocaleString('en-GB', { style: 'percent' })}</span> 
            <span class="tip__flex">−</span>
            <span 
            name="item__general__discount__summ__${product.id}"
            id="item__general__discount__summ__${product.id}">0</span> 
            <span>&nbsp;сом</span>
          </div>
          <div class="tip__container tip__text">
            <span class="gray">Скидка покупателя ${(product.personal_discount).toLocaleString('en-GB', { style: 'percent' })}</span> 
            <span class="tip__flex">−</span>
            <span 
            name="item__personal__discount__summ__${product.id}"
            id="item__personal__discount__summ__${product.id}">0</span> 
            <span>&nbsp;сом</span>
          </div>
        </div>
      </div>
    </div>
  
    </li>
    
    `)
    prods.innerHTML = rez.join('');
  }
  
  
export function renderUnavaliable() {
    const nostock = document.getElementById("unavaliable__list");
    let rez = products.map(product => `
    <li class="unavaliable__item__container">
  
    <div class="unavaliable__img__desc">
  
      <div class="check__itemImg">
        <img name="desc__img" class="item__image grayscaled" src="${product.img}" alt="" width="72" height="96">
      </div>
  
      <div class="check__itemImg__mobile">
        <img name="mobile__img" class="item__image grayscaled" src="${product.img__mobile}" alt="" width="80" height="106">
        ${product.size ? `<div class="item__size__mobile"><p class="item__size__p">${product.size}</p></div>` : ``}
      </div>
  
      <div class="item__description wider">
        <p class="item__name gray">${product.name}</p>
        <div class="item__col__size">
          ${product.color ? `<span class="item__additional gray">Цвет: ${product.color}</span>` : ``}
          ${product.size ? `<span style="margin: 0px 0px 8px 0px" class="item__additional gray size__desctop">Размер: ${product.size}</span>` : ``}
        </div>
      </div>
    </div>
  
    <div class="unaval__item__icons">
      <div class="icons__hover__container">
        <div class="qty__item__icons">
          <button onClick="toggleFavorites('${product.id}', event)" class="cart__heart__button" id="cart__heart__${product.id}" type="button"></button>
          <button class="cart__bucket__button" type="button"></button>
        </div>
      </div>
    </div>
  
    </li>`)
    nostock.innerHTML = rez.join('');
}
  
export function renderDelivery() {
    const deliveryList = document.getElementById("delivery__list");
    const additionalList = document.getElementById("delivery__list__additional");
    let rez = products.map(product => `
    <div class="delivery__itemImg">
    <div id="delivery__count__container__${product.id}" class="delivery__count__box"></div>
      <img class="item__image" src="${product.img__delivery}" alt="" width="40" height="56">
    </div>
    `)
    let rezAdditional = `
    <div class="delivery__itemImg hide">
    <div id="additional__delivery__count__container__${products[1].id}" class="delivery__count__box"></div>
      <img class="item__image" src="${products[1].img__delivery}" alt="" width="40" height="56">
    </div>
    `
    deliveryList.innerHTML = rez.join('');
    additionalList.innerHTML = rezAdditional;


}
  
export function genCheckboxName() {
    return Math.random().toString(16).slice(2)
}

export function renderDropHeader(mainDropState, totalQtyInCart, totalSummInCart, boxCount) {
  const dropHeader = document.getElementById("drop__header");
  if (mainDropState) {
    dropHeader.innerHTML = `
    <input onclick="toggleCheckboxes('item__checkbox')" class="checkbox" type="checkbox" id="main__checkbox" ${boxCount === 3 ? 'checked' : ''}/>
    <label class="checkAll__label">
      Выбрать все
    </label>
  `
  } else if (!mainDropState) {
    if (!totalQtyInCart) {
      totalQtyInCart = 3
    }
    console.log(totalSummInCart)

    dropHeader.innerHTML = `
    <div class="checkAll__label semibold">
      <span id="total__qty__inCart">${totalQtyInCart}</span>
      &nbsp;
      <span>${WordEnding.changeEnding(totalQtyInCart, ['товар', 'товара', 'товаров'])}</span>
      &nbsp;·&nbsp;
      <span id="total__cost__inCart">${totalSummInCart ? totalSummInCart.toLocaleString('ru-RU') : ''} сом</span>
    </div>
  `
  }
}



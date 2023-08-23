import {products, user } from './data.js'

// Init

window.onload = () => {
  initCart();
  renderCart();
  renderUnavaliable();
  renderCards()
}

// Render data

let cart = {};
let orderSumm = 0;

function initCart() {
  for (let product of products) {
    cart[product.id] = 0;
  }
  // console.log('cart', cart)
}

export function increment(id) {
  // console.log("cart:", cart);
  let qty = document.getElementById(`item__qty__${id}`);

  // let qtyTotal = document.getElementById(`item__qty__total__${id}`);
  let qtyTotal = document.getElementsByName(`item__qty__total__${id}`);
  // let saleTotal = document.getElementById(`item__qty__sale__total__${id}`);
  let saleTotal = document.getElementsByName(`item__qty__sale__total__${id}`);

  const currentItem = products.find(prod => prod.id === id);
  const totalDiscount = currentItem.general_discount + currentItem.personal_discount;
  const limit = currentItem.in_stock;

  if (+cart[id] < limit) {
  cart[id]++;
  // console.log('количество', +cart[id])
  const oneItemDiscount = Math.round(currentItem.price * totalDiscount);
  const generalItemDiscound = Math.round(currentItem.price * currentItem.general_discount);
  const personalItemDiscound = Math.round(currentItem.price * currentItem.personal_discount);
  const itemsDiscount = (cart[id] * (currentItem.price - oneItemDiscount));

  // console.log("qty changed here:", qty);
  qty.innerText = cart[id]

  let qtyTotalArray = Array.from(qtyTotal)
  qtyTotalArray.map(qty => qty.innerText = `${(cart[id] * currentItem.price).toLocaleString('ru-RU')} сом`)
  // qtyTotal.innerText = `${(cart[id] * currentItem.price).toLocaleString('ru-RU')} сом`

  //общая сумма под один name
  let allTotal = document.getElementById(`side__total__summ`);
  let allTotalRez = Math.round(+allTotal.innerText.replace(/\s/g, "") + +currentItem.price)
  allTotal.innerText = `${(allTotalRez).toLocaleString('ru-RU')}`

  //общее кол-во под один id
  let allItems = document.getElementById(`side__total__qty`);
  allItems.innerText = ++allItems.innerText

  //скидка отдельно по товарам
  let saleTotalArray = Array.from(saleTotal)
  saleTotalArray.map(tot => tot.innerText = `${itemsDiscount.toLocaleString('ru-RU')} `)
  // saleTotal.innerText = `${itemsDiscount.toLocaleString('ru-RU')} `

  // общая скидка по всем товарам кол-во под один id
  let allDiscounts = document.getElementById(`side__total__discount`);
  allDiscounts.innerText = `${(+allDiscounts.innerText.replace(/\s/g, "") + oneItemDiscount).toLocaleString('ru-RU')}`

  // общая сумма с учетом общей скидки
  let checkoutTotal = document.getElementById(`side__checkout__summ`);
  checkoutTotal.innerText = (+allTotal.innerText.replace(/\s/g, "") - +allDiscounts.innerText.replace(/\s/g, "")).toLocaleString('ru-RU')

  // общая базовая скидка в валюте
  // let generalDiscountSumm = document.getElementById(`item__general__discount__summ__${id}`);
  let generalDiscountSumm = document.getElementsByName(`item__general__discount__summ__${id}`);
  let generalDiscountSummArray = Array.from(generalDiscountSumm)
  generalDiscountSummArray.map(arr => arr.innerText = `${(cart[id] * generalItemDiscound).toLocaleString('ru-RU')}`)
  // generalDiscountSumm.innerText = `${(cart[id] * generalItemDiscound).toLocaleString('ru-RU')}`

  // общая персональная скидка в валюте
  // let personalDiscountSumm = document.getElementById(`item__personal__discount__summ__${id}`);
  let personalDiscountSumm = document.getElementsByName(`item__personal__discount__summ__${id}`);
  let personalDiscountSummArray = Array.from(personalDiscountSumm)
  personalDiscountSummArray.map(arr => arr.innerText = `${(cart[id] * personalItemDiscound).toLocaleString('ru-RU')}`)
  // personalDiscountSumm.innerText = `${(cart[id] * personalItemDiscound).toLocaleString('ru-RU')}`

  // order__button
  let checkoutButton = document.getElementById(`order__button__summ`);
  orderSumm = (+allTotal.innerText.replace(/\s/g, "") - +allDiscounts.innerText.replace(/\s/g, "")).toLocaleString('ru-RU')
    if (checkoutButton) {
      checkoutButton.innerText = (+allTotal.innerText.replace(/\s/g, "") - +allDiscounts.innerText.replace(/\s/g, "")).toLocaleString('ru-RU')
    }
  }
}
window.increment = increment


function decrement(id) {
  let qty = document.getElementById(`item__qty__${id}`);

  // let qtyTotal = document.getElementById(`item__qty__total__${id}`);
  let qtyTotal = document.getElementsByName(`item__qty__total__${id}`);
  // let saleTotal = document.getElementById(`item__qty__sale__total__${id}`);
  let saleTotal = document.getElementsByName(`item__qty__sale__total__${id}`);

  let allTotal = document.getElementById(`side__total__summ`);
  let allItems = document.getElementById(`side__total__qty`);
  let allDiscounts = document.getElementById(`side__total__discount`);

  const currentItem = products.find(prod => prod.id === id)
  const totalDiscount = currentItem.general_discount + currentItem.personal_discount

  if (+cart[id] === 0 || +cart[id] < 0) {
    cart[id] = 0;
    qty.innerText = cart[id];
    let qtyTotalArray = Array.from(qtyTotal)
    qtyTotalArray.map(qty => qty.innerText = `0 сом`)
    // qtyTotal.innerText = `0 сом`;
    // console.log('im here')
    saleTotal.innerText = `0 `;
  } else if (+cart[id] > 0) {
  cart[id]--;

  const oneItemDiscount = Math.round(currentItem.price * totalDiscount);
  const generalItemDiscound = Math.round(currentItem.price * currentItem.general_discount);
  const personalItemDiscound = Math.round(currentItem.price * currentItem.personal_discount);
  const itemsDiscount = (cart[id] * (currentItem.price - oneItemDiscount));

  console.log('количество', +cart[id])
  qty.innerText = cart[id]
    
  // console.log("qty changed here:", qty);
  let qtyTotalArray = Array.from(qtyTotal)
  qtyTotalArray.map(qty => qty.innerText = `${(cart[id] * currentItem.price).toLocaleString('ru-RU')} сом`)
  // qtyTotal.innerText = `${(cart[id] * currentItem.price).toLocaleString('ru-RU')} сом`

  //  общая сумма под один id
  let allTotalRez = Math.round(+allTotal.innerText.replace(/\s/g, "") - +currentItem.price)
  allTotal.innerText = `${(allTotalRez).toLocaleString('ru-RU')}`

  // общее кол-во под один id
  allItems.innerText = --allItems.innerText
  
  //скидка отдельно по товарам
  let saleTotalArray = Array.from(saleTotal)
  saleTotalArray.map(tot => tot.innerText = `${itemsDiscount.toLocaleString('ru-RU')} `)
  // saleTotal.innerText = `${itemsDiscount.toLocaleString('ru-RU')} `

  // общая скидка по всем товарам кол-во под один id
  allDiscounts.innerText = `${(+allDiscounts.innerText.replace(/\s/g, "") - oneItemDiscount).toLocaleString('ru-RU')}`

  //  общая сумма с учетом общей скидки
  let checkoutTotal = document.getElementById(`side__checkout__summ`);
  checkoutTotal.innerText = (+allTotal.innerText.replace(/\s/g, "") - +allDiscounts.innerText.replace(/\s/g, "")).toLocaleString('ru-RU')

  // общая базовая скидка в валюте
  let generalDiscountSumm = document.getElementsByName(`item__general__discount__summ__${id}`);
  let generalDiscountSummArray = Array.from(generalDiscountSumm)
  generalDiscountSummArray.map(arr => arr.innerText = `${(cart[id] * generalItemDiscound).toLocaleString('ru-RU')}`)
  // generalDiscountSummArray.map(arr => arr.innerText = Math.round(+arr.innerText.replace(/\s/g, "") - +generalItemDiscound))
  // let generalDiscountSumm = document.getElementById(`item__general__discount__summ__${id}`);
  // generalDiscountSumm.innerText = Math.round(+generalDiscountSumm.innerText.replace(/\s/g, "") - +generalItemDiscound)

  // общая персональная скидка в валюте
  let personalDiscountSumm = document.getElementsByName(`item__personal__discount__summ__${id}`);
  let personalDiscountSummArray = Array.from(personalDiscountSumm)
  personalDiscountSummArray.map(arr => arr.innerText = `${(cart[id] * personalItemDiscound).toLocaleString('ru-RU')}`)
  // let personalDiscountSumm = document.getElementById(`item__personal__discount__summ__${id}`);
  // personalDiscountSumm.innerText = Math.round(+personalDiscountSumm.innerText.replace(/\s/g, "") - +personalItemDiscound)

  // order__button
  let checkoutButton = document.getElementById(`order__button__summ`);
  orderSumm = (+allTotal.innerText.replace(/\s/g, "") - +allDiscounts.innerText.replace(/\s/g, "")).toLocaleString('ru-RU')
    if (checkoutButton) {
      checkoutButton.innerText = (+allTotal.innerText.replace(/\s/g, "") - +allDiscounts.innerText.replace(/\s/g, "")).toLocaleString('ru-RU')
    }
  }
}
window.decrement = decrement

function renderCart() {
  let prods = document.getElementById("items__list");

  let rez = products.map(product => `
  <li class="item__container">

  <div class="item__block">

    <div class="check__itemImg">
      <input id="item__checkbox" onclick="singleInputToggle(event)" name="item__checkbox" class="checkbox" type="checkbox" name="peas" />
      <img name="desc__img" class="item__image" src="${product.img}" alt="" width="72" height="96">
    </div>

    <div class="check__itemImg__mobile">
    <input id="item__checkbox" onclick="singleInputToggle(event)" name="item__checkbox" class="checkbox__mobile" type="checkbox" name="peas" />
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
        ${product.color ? `<span class="item__additional">Цвет: ${product.color}</span>` : ``}
        ${product.size ? `<span class="item__additional">Размер: ${product.size}</span>` : ``}
      </div>
      <span class="item__additional gray">${product.warehouse}</span>
      <div class="item__seller__info tooltip">
        <span class="item__additional gray">${product.seller_name}</span>
        <img style="cursor: pointer;" src="assets/cart_view/icon-20.svg" alt="">
      </div>
    </div>

  </div>

  <div class="item__qty__container">
    <div class="item__counter__container">
      <button class="decrement__btn" onClick="decrement('${product.id}')">−</button>
      <span class="item__qty__number" id="item__qty__${product.id}">${cart[product.id]}</span>
      <button class="increment__btn" onClick="increment('${product.id}')">+</button>
    </div>
    ${+product.in_stock <= 5 ? `<span class="item__remained">Осталось ${product.in_stock} шт.</span>` : ``}
    <div class="icons__hover__container">
      <div class="qty__item__icons">
        <button class="cart__heart__button" type="button"></button>
        <button class="cart__bucket__button" type="button"></button>
      </div>
    </div>
  </div>

  <div class="item__price__container">
    <div style="margin-bottom: 6px;">
      <span 
      name="item__qty__sale__total__${product.id}"
      class="currency__string" id="item__qty__sale__total__${product.id}">0</span>
      <span class="currency__string">сом</span>
    </div>

    <div class="tooltip">
      <div class="lined__price" name="item__qty__total__${product.id}" id="item__qty__total__${product.id}">${cart[product.id]} сом</div>
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

  </li>
  
  `)
  prods.innerHTML = rez.join('');
}


function renderUnavaliable() {
  let nostock = document.getElementById("unavaliable__list");
  let rez = products.map(product => `
  <li class="unavaliable__item__container">

  <div class="unavaliable__img__desc">
    <img name="desc__img" class="item__image grayscaled" src="${product.img}" alt="" width="72" height="96">
    <img name="mobile__img" class="item__image grayscaled" src="${product.img__mobile}" alt="" width="80" height="106">

    <div class="item__description wider">
      <p class="item__name gray">${product.name}</p>
      <div class="item__col__size">
        ${product.color ? `<span class="item__additional gray">Цвет: ${product.color}</span>` : ``}
        ${product.size ? `<span class="item__additional gray">Размер: ${product.size}</span>` : ``}
      </div>
    </div>
  </div>


  <div class="unaval__item__icons">
    <div class="icons__hover__container">
      <div class="qty__item__icons">
        <button class="cart__heart__button" type="button"></button>
        <button class="cart__bucket__button" type="button"></button>
      </div>
    </div>
  </div>

  </li>`)
  nostock.innerHTML = rez.join('');
}

function renderCards() {
  let cards = document.getElementById("cards__list");

  const cardsForm = document.getElementById("cards__form")
  cardsForm.addEventListener(
  "submit",
  (event) => {
    const data = new FormData(cardsForm);
    let output = "";
    for (const entry of data) {
      output = `${entry[1]}`
    }
    // console.log('form output', output)
    event.preventDefault();
    const picked = user.cards.find(card => card.id === output)
    // console.log('picked', picked)
    renderCard(picked)
    document.getElementById('card__Modal').style.display = "none";

  },
  false,
  );

  const renderCard = (cardData) => {
    const pickedCard = document.getElementById('card__container')
    const pickedCardSide = document.getElementById('side__card__container')

    const rez = `
    <img src=${cardData.img} alt="">    
    <div class="centered__flex basic__text">
      ${bulletCard(cardData.number)}
    </div>
    <div class="centered__flex basic__text">
      ${cardData.expiry__date}
    </div>
    `

    const rezSide = `
    <img src=${cardData.img} alt="">
    <div class="centered__flex">
      ${bulletCard(cardData.number)}
    </div>`

    pickedCard.innerHTML = rez
    pickedCardSide.innerHTML = rezSide
  }


  const bulletCard = (num) => {
    let number = num.toString().split('').map(Number);
    number.splice(6, 6, '•', '•', '•', '•', '•', '•');
    const rezult = number.join('').match(/.{1,4}/g).join(' ')
    return rezult
  }

  let rez = user.cards.map(card => `

  <div class="check__cardImg">
    <label class="card__container modal__padding" for=${card.id}>
      <input type="radio" id=${card.id} name='card' value=${card.id} />
      <span class="radio__checkmark"></span>
      <img class="item__image" src="${card.img}" alt="">
      <span class="item__name">${bulletCard(card.number)}</span>
    </label>
  </div>

  `)
  cards.innerHTML = rez.join('');
}

// Toggle & checks

export function toggleDropdown(event) {
  event.preventDefault();
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("rotate").classList.toggle("rotated");
}
window.toggleDropdown = toggleDropdown

function toggleDropdownNotAvaliable(event) {
  event.preventDefault();
  document.getElementById("myUnavaliable").classList.toggle("show");
  document.getElementById("rotate1").classList.toggle("rotated");

  // const header = document.getElementsByName("drop__underline");
  //   if(header.style.color === 'red') {
  //     header.style.color = 'black';
  //   } else {
  //     header.style.color = 'red'
  //   }
}
window.toggleDropdownNotAvaliable = toggleDropdownNotAvaliable



function togglePayment() {
  document.getElementById("payment__checked").classList.toggle("hide");
  document.getElementById("side__payment__checked").classList.toggle("hide");

  let button = document.getElementById("order__button");
  if (button.innerHTML === "Заказать") {
    button.innerHTML = `
    <span>Оплатить&nbsp;</span>
    <span id="order__button__summ">${orderSumm}</span>
    <span>&nbsp;сом</span>
    `;
  } else {
    button.innerHTML = "Заказать";
  }
}
window.togglePayment = togglePayment


let isAllCheck = false;
let boxCount = 0;

function toggleCheckboxes(cn){
    let cbarray = document.getElementsByName(cn);
    for(let i = 0; i < cbarray.length; i++){
        cbarray[i].checked = !isAllCheck
}   
  isAllCheck = !isAllCheck;   
  { isAllCheck ? boxCount = 3 : boxCount = 0 }
  const counter = document.getElementById("cart__pos__count");
  counter.innerText = boxCount
  const footerCounter = document.getElementById("footer__cart__pos__count");
  if (footerCounter) {
    footerCounter.innerText = boxCount
  }
}
window.toggleCheckboxes = toggleCheckboxes


function singleInputToggle(event) {
  event.stopImmediatePropagation()
  let cbarray = document.getElementsByName('item__checkbox');
  const arr = Array.from(cbarray)
  const rez = arr.filter((ch) => ch.checked === true )
  boxCount = rez.length
  const counter = document.getElementById("cart__pos__count");
  counter.innerText = boxCount
  const footerCounter = document.getElementById("footer__cart__pos__count");
  if (footerCounter) {
    footerCounter.innerText = boxCount
  }

  if (rez.length < 3 ) {
    isAllCheck = false
    document.getElementById("main__checkbox").checked = isAllCheck
  } else if (rez.length === 3) {
    isAllCheck = true
    document.getElementById("main__checkbox").checked = isAllCheck
  }
}
window.singleInputToggle = singleInputToggle



import { products, user } from './data.js'
import { renderCards, renderCart, renderDelivery, renderUnavaliable } from './render.js';

// Init
window.onload = () => {
  async function init() {
    try {
      await initCart();
    } catch (err) {
      console.log(err)
    } finally {
      renderCart(cart);
      renderUnavaliable();
      renderCards();
      renderDelivery();
      addOne(); 
    }
    console.log('cart', cart)
  }
  init()
}

// Render data
export let cart = [];
let orderSumm = 0;

async function initCart() {
  for (let product of products) {
    cart.push({ 
      id: product.id,
      count: 0,
      summ: 0,
      discount: 0,
      discSumm: 0,
      checked: true,
    })
  }
}

// начальные значения
export function addOne() {
  products.forEach(product => increment(product.id)) 
}

// переменные для селектора
let qty, deliveryQty, qtyTotal, saleTotal, allTotal, allItems, allDiscounts, checkoutTotal;
let generalDiscountSumm, personalDiscountSumm;
let checkoutButton, plusBtn, minusBtn;

async function selectElements(id) { 
  qty = document.getElementById(`item__qty__${id}`);
  deliveryQty = document.getElementById(`delivery__count__container__${id}`);
  qtyTotal = document.getElementsByName(`item__qty__total__${id}`);
  saleTotal = document.getElementsByName(`item__qty__sale__total__${id}`);
  allTotal = document.getElementById(`side__total__summ`);
  allItems = document.getElementById(`side__total__qty`);
  allDiscounts = document.getElementById(`side__total__discount`);
  checkoutTotal = document.getElementById(`side__checkout__summ`);
  generalDiscountSumm = document.getElementsByName(`item__general__discount__summ__${id}`);
  personalDiscountSumm = document.getElementsByName(`item__personal__discount__summ__${id}`);
  checkoutButton = document.getElementById(`order__button__summ`);
  plusBtn = document.getElementById(`increment__btn__${id}`);
  minusBtn = document.getElementById(`decrement__btn__${id}`); 
}

// счетчики
export async function increment(id) {
  selectElements(id)
  const currentItem = products.find(prod => prod.id === id);
  const totalDiscount = currentItem.general_discount + currentItem.personal_discount;
  const limit = currentItem.in_stock;
  const toIncrement = cart.find(item => item.id === id)
  
    if (+toIncrement.count < limit) {
      toIncrement.count++;
      // console.log('cart', cart)
    const oneItemDiscount = Math.round(currentItem.price * totalDiscount);
    const generalItemDiscound = Math.round(currentItem.price * currentItem.general_discount);
    const personalItemDiscound = Math.round(currentItem.price * currentItem.personal_discount);

    const itemsDiscount = (toIncrement.count * (currentItem.price - oneItemDiscount));
    toIncrement.summ = itemsDiscount
    const itemsfullPrice = (toIncrement.count * currentItem.price);
    toIncrement.discSumm = itemsfullPrice
    const discount = itemsfullPrice - itemsDiscount
    toIncrement.discount = discount
    // console.log('cart', cart)

    // console.log("qty changed here:", qty);
    qty.innerText = toIncrement.count
    {toIncrement.count > 1 ? 
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">${toIncrement.count}</div>`
      :
      deliveryQty.innerHTML = ``
    }

    let qtyTotalArray = Array.from(qtyTotal)
    qtyTotalArray.map(qty => qty.innerText = `${(toIncrement.count * currentItem.price).toLocaleString('ru-RU')} сом`)

    //общая сумма под один id
    const toDiscSumm = cart.filter(item => item.checked === true)
    const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
    allTotal.innerText = discSummRez.toLocaleString('ru-RU')

    //общее кол-во под один id
    const allQty = cart.filter(item => item.checked === true)
    const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    allItems.innerText = allQtyRez

    //скидка отдельно по товарам
    let saleTotalArray = Array.from(saleTotal)

    // console.log('cart', cart)
    saleTotalArray.map(tot => tot.innerText = `${itemsDiscount.toLocaleString('ru-RU')} `)

    // общая скидка по всем товарам кол-во под один id
    const disc = cart.filter(item => item.checked === true)
    const discRez = disc.reduce(function (acc, obj) { return acc + obj.discount; }, 0);
    allDiscounts.innerText = discRez.toLocaleString('ru-RU')

    // общая сумма с учетом общей скидки
    const toSumm = cart.filter(item => item.checked === true)
    const summRez = toSumm.reduce(function (acc, obj) { return acc + obj.summ; }, 0);
    checkoutTotal.innerText = summRez.toLocaleString('ru-RU')

    // общая базовая скидка в валюте
    let generalDiscountSummArray = Array.from(generalDiscountSumm)
    generalDiscountSummArray.map(arr => arr.innerText = `${(toIncrement.count * generalItemDiscound).toLocaleString('ru-RU')}`)

    // общая персональная скидка в валюте
    let personalDiscountSummArray = Array.from(personalDiscountSumm)
    personalDiscountSummArray.map(arr => arr.innerText = `${(toIncrement.count * personalItemDiscound).toLocaleString('ru-RU')}`)

    // подгоняем размер шрифта валюты
    let windowWidth = document.documentElement.clientWidth
    let digits = saleTotalArray[0].innerText.replace(/\s/g, "").length
    { (digits >= 6 && windowWidth >= 600) ? 
      saleTotalArray[1].style.fontSize = `16px` 
      : 
      saleTotalArray[1].style.fontSize = `20px` 
    }
    // order__button
    orderSumm = summRez.toLocaleString('ru-RU')
      if (checkoutButton) {
        checkoutButton.innerText = summRez.toLocaleString('ru-RU')
      }
  } 
  // меняем цвет + / -
  { (+toIncrement.count === limit) ? 
    ( plusBtn.style.color = 'rgba(0, 0, 0, 0.2)', minusBtn.style.color = 'black' )
    : 
    ( plusBtn.style.color = 'black', minusBtn.style.color = 'black' ) 
  }
  {+toIncrement.count === 1 ? minusBtn.style.color = 'rgba(0, 0, 0, 0.2)' : ``}
}
window.increment = increment


function decrement(id) {
  selectElements(id)
  const currentItem = products.find(prod => prod.id === id)
  const totalDiscount = currentItem.general_discount + currentItem.personal_discount
  const toDecrement = cart.find(item => item.id === id)

    if (+toDecrement.count === 0 || +toDecrement.count < 0) {
      toDecrement.count = 0;
      qty.innerText = toDecrement.count;
      let qtyTotalArray = Array.from(qtyTotal)
      qtyTotalArray.map(qty => qty.innerText = `0 сом`)
      saleTotal.innerText = `0 `;
    } else if (+toDecrement.count > 1) {
      toDecrement.count--;

    const oneItemDiscount = Math.round(currentItem.price * totalDiscount);
    const generalItemDiscound = Math.round(currentItem.price * currentItem.general_discount);
    const personalItemDiscound = Math.round(currentItem.price * currentItem.personal_discount);
    const itemsDiscount = (toDecrement.count * (currentItem.price - oneItemDiscount));
    toDecrement.summ = itemsDiscount
    const itemsfullPrice = (toDecrement.count * currentItem.price);
    toDecrement.discSumm = itemsfullPrice
    const discount = itemsfullPrice - itemsDiscount
    toDecrement.discount = discount
    // console.log('cart', cart)

    // console.log('количество', +toDecrement.count)
    qty.innerText = toDecrement.count
    {toDecrement.count > 1 ? 
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">${toDecrement.count}</div>`
      :
      deliveryQty.innerHTML = ``
    }
      
    // console.log("qty changed here:", qty);
    let qtyTotalArray = Array.from(qtyTotal)
    qtyTotalArray.map(qty => qty.innerText = `${(toDecrement.count * currentItem.price).toLocaleString('ru-RU')} сом`)

    //  общая сумма под один id
    const toDiscSumm = cart.filter(item => item.checked === true)
    const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
    allTotal.innerText = discSummRez.toLocaleString('ru-RU')

    // общее кол-во под один id
    const allQty = cart.filter(item => item.checked === true)
    const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    allItems.innerText = allQtyRez
    
    //скидка отдельно по товарам
    let saleTotalArray = Array.from(saleTotal)
    saleTotalArray.map(tot => tot.innerText = `${itemsDiscount.toLocaleString('ru-RU')} `)

    // общая скидка по всем товарам кол-во под один id
    const disc = cart.filter(item => item.checked === true)
    const discRez = disc.reduce(function (acc, obj) { return acc + obj.discount; }, 0);
    allDiscounts.innerText = discRez.toLocaleString('ru-RU')

    //  общая сумма с учетом общей скидки
    const toSumm = cart.filter(item => item.checked === true)
    const summRez = toSumm.reduce(function (acc, obj) { return acc + obj.summ; }, 0);
    checkoutTotal.innerText = summRez.toLocaleString('ru-RU')

    // общая базовая скидка в валюте
    let generalDiscountSummArray = Array.from(generalDiscountSumm)
    generalDiscountSummArray.map(arr => arr.innerText = `${(toDecrement.count * generalItemDiscound).toLocaleString('ru-RU')}`)

    // общая персональная скидка в валюте
    let personalDiscountSummArray = Array.from(personalDiscountSumm)
    personalDiscountSummArray.map(arr => arr.innerText = `${(toDecrement.count * personalItemDiscound).toLocaleString('ru-RU')}`)

    // подгоняем размер шрифта валюты
    let windowWidth = document.documentElement.clientWidth
    let digits = saleTotalArray[0].innerText.replace(/\s/g, "").length
    { (digits >= 6 && windowWidth >= 600) ? 
      saleTotalArray[1].style.fontSize = `16px` 
      : 
      saleTotalArray[1].style.fontSize = `20px` 
    }
    
    // order__button
    orderSumm = summRez.toLocaleString('ru-RU')
      if (checkoutButton) {
        checkoutButton.innerText = summRez.toLocaleString('ru-RU')
      }
    }
  // меняем цвет - / +
  { (+toDecrement.count === 1) ? 
    ( minusBtn.style.color = 'rgba(0, 0, 0, 0.2)', plusBtn.style.color = 'black' )
    : 
    ( minusBtn.style.color = 'black', plusBtn.style.color = 'black' ) 
  }
}
window.decrement = decrement

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


let isAllCheck = true;
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

  cart.forEach(item => item.checked = !item.checked)
  // console.log('cart', cart)

  const toSumm = cart.filter(item => item.checked === true)
  const summRez = toSumm.reduce(function (acc, obj) { return acc + obj.summ; }, 0);
  checkoutTotal.innerText = summRez.toLocaleString('ru-RU')

  orderSumm = summRez.toLocaleString('ru-RU')
  checkoutButton = document.getElementById(`order__button__summ`);
  if (checkoutButton) {
    checkoutButton.innerText = orderSumm;
  }

  const toDiscSumm = cart.filter(item => item.checked === true)
  const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
  allTotal.innerText = discSummRez.toLocaleString('ru-RU')

  const disc = cart.filter(item => item.checked === true)
  const discRez = disc.reduce(function (acc, obj) { return acc + obj.discount; }, 0);
  allDiscounts.innerText = discRez.toLocaleString('ru-RU')

  const allQty = cart.filter(item => item.checked === true)
  const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
  allItems.innerText = allQtyRez
}
window.toggleCheckboxes = toggleCheckboxes


function singleInputToggle(event, id) {
  event.stopImmediatePropagation()
  console.log('id', id)

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

  const toCheck = cart.find(item => item.id === id)
  toCheck.checked = !toCheck.checked
  // console.log('cart', cart)

  const toSumm = cart.filter(item => item.checked === true)
  const summRez = toSumm.reduce(function (acc, obj) { return acc + obj.summ; }, 0);
  checkoutTotal.innerText = summRez.toLocaleString('ru-RU')

  orderSumm = summRez.toLocaleString('ru-RU')
  checkoutButton = document.getElementById(`order__button__summ`);
  if (checkoutButton) {
    checkoutButton.innerText = orderSumm;
  }

  const toDiscSumm = cart.filter(item => item.checked === true)
  const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
  allTotal.innerText = discSummRez.toLocaleString('ru-RU')

  const disc = cart.filter(item => item.checked === true)
  const discRez = disc.reduce(function (acc, obj) { return acc + obj.discount; }, 0);
  allDiscounts.innerText = discRez.toLocaleString('ru-RU')

  const allQty = cart.filter(item => item.checked === true)
  const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
  allItems.innerText = allQtyRez
}
window.singleInputToggle = singleInputToggle


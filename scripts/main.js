import { products, user } from './data.js'
import { renderCart, renderDelivery, renderUnavaliable, renderDropHeader } from './render.js';
import { WordEnding } from './service.js';

// Init
window.onload = () => {
  async function init() {
    try {
      await initCart();
    } catch (err) {
      console.log(err)
    } finally {
      renderDropHeader(false);
      renderCart(cart);
      renderUnavaliable();
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
let qty, deliveryQty, additionalDeliveryQty, qtyTotal, saleTotal, allTotal, allItems, allDiscounts, checkoutTotal, totalItemsInCart, totalItemsSummInCart;
let generalDiscountSumm, personalDiscountSumm, totalQtyInCart, totalSummInCart, additionalQtyContainer, additionalDeliveryDate;
let checkoutButton, plusBtn, minusBtn, allItemsWord, mainDeliveryDate;

async function selectElements(id) { 
  qty = document.getElementById(`item__qty__${id}`);
  deliveryQty = document.getElementById(`delivery__count__container__${id}`);
  mainDeliveryDate = document.getElementById(`delivery__date__main`);
  additionalQtyContainer = document.getElementById(`delivery__list__additional`);
  additionalDeliveryDate = document.getElementById(`delivery__date__additinal`);
  additionalDeliveryQty = document.getElementById(`additional__delivery__count__container__${id}`);
  qtyTotal = document.getElementsByName(`item__qty__total__${id}`);
  saleTotal = document.getElementsByName(`item__qty__sale__total__${id}`);
  allTotal = document.getElementById(`side__total__summ`);
  allItems = document.getElementById(`side__total__qty`);
  allItemsWord = document.getElementById(`side__total__qty__word`);
  totalItemsInCart = document.getElementById(`total__qty__inCart`);
  totalItemsSummInCart = document.getElementById(`total__cost__inCart`);
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

    if (toIncrement.count === 1) {
      deliveryQty.innerHTML = ``
    } 
    if (toIncrement.count > 1) {
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">${toIncrement.count}</div>`
    } 
    if (toIncrement.count === 181) {
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">180</div>`
      additionalQtyContainer.style.display = `flex`
      additionalDeliveryDate.style.display = `flex`
      additionalDeliveryQty.innerHTML = ``
      mainDeliveryDate.innerText = `5–8 фев`
    }
    if (toIncrement.count > 181) {
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">180</div>`
      additionalDeliveryQty.style.display = `flex`
      additionalDeliveryQty.innerHTML = `<div id="additional__delivery__count__${id}" class="delivery__count__container">${toIncrement.count - 180}</div>`
    }

    let qtyTotalArray = Array.from(qtyTotal)
    qtyTotalArray.map(qty => qty.innerText = `${(toIncrement.count * currentItem.price).toLocaleString('ru-RU')} сом`)

    //общая сумма под один id
    const toDiscSumm = cart.filter(item => item.checked === true)
    const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
    allTotal.innerText = discSummRez.toLocaleString('ru-RU')

    //всего кол-во товаров в корзине
    totalQtyInCart = cart.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    if (totalItemsInCart) {
      totalItemsInCart.innerText = totalQtyInCart
    }

    //всего сумма товаров в корзине
    totalSummInCart = cart.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
    if (totalItemsSummInCart) {
      totalItemsSummInCart.innerText = `${totalSummInCart.toLocaleString('ru-RU')} сом`
    }

    //общее кол-во под один id
    const allQty = cart.filter(item => item.checked === true)
    const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    allItems.innerText = allQtyRez
    allItemsWord.innerHTML = `&nbsp;${WordEnding.changeEnding(totalQtyInCart, ['товар', 'товара', 'товаров'])}`

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

    if (toDecrement.count === 1) {
      deliveryQty.innerHTML = ``
    } 
    if (toDecrement.count > 1) {
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">${toDecrement.count}</div>`
    } 
    if (toDecrement.count > 181) {
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">180</div>`
      additionalDeliveryQty.innerHTML = `<div id="additional__delivery__count__${id}" class="delivery__count__container">${toDecrement.count - 180}</div>`
    }
    if (toDecrement.count === 181) {
      additionalQtyContainer.style.display = `flex`
      additionalDeliveryDate.style.display = `flex`
      deliveryQty.innerHTML = `<div id="delivery__count__${id}" class="delivery__count__container">180</div>`
      additionalDeliveryQty.innerHTML = ``
    }
    if (toDecrement.count < 181) {
      additionalQtyContainer.style.display = `none`
      additionalDeliveryDate.style.display = `none`
      mainDeliveryDate.innerText = `5–6 фев`
    }
      
    // console.log("qty changed here:", qty);
    let qtyTotalArray = Array.from(qtyTotal)
    qtyTotalArray.map(qty => qty.innerText = `${(toDecrement.count * currentItem.price).toLocaleString('ru-RU')} сом`)

    //  общая сумма под один id
    const toDiscSumm = cart.filter(item => item.checked === true)
    const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
    allTotal.innerText = discSummRez.toLocaleString('ru-RU')

    //всего кол-во товаров в корзине
    totalQtyInCart = cart.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    if (totalItemsInCart) {
      totalItemsInCart.innerText = totalQtyInCart
    }
    
    //всего сумма товаров в корзине
    totalSummInCart = cart.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
    if (totalItemsSummInCart) {
      totalItemsSummInCart.innerText = totalSummInCart
    }

    // общее кол-во под один id
    const allQty = cart.filter(item => item.checked === true)
    const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
    allItems.innerText = allQtyRez
    allItemsWord.innerHTML = `&nbsp;${WordEnding.changeEnding(totalQtyInCart, ['товар', 'товара', 'товаров'])}`

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
let isAllCheck = true;
let boxCount = 3;

export function toggleDropdown(event) {
  event.preventDefault();
  document.getElementById("rotate").classList.toggle("rotated");
  const mainDrop = document.getElementById("myDropdown")
  mainDrop.classList.toggle("show");
  let mainDropState = mainDrop.classList.contains("show")
  renderDropHeader(mainDropState, totalQtyInCart, totalSummInCart, boxCount)
}
window.toggleDropdown = toggleDropdown

export function toggleFavorites(id, event) {
  event.preventDefault();
  const heart = document.querySelectorAll(`#cart__heart__${id}`)
  heart.forEach(heart => heart.classList.toggle("favorite"))
}
window.toggleFavorites = toggleFavorites

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

function toggleCheckboxes(cn){
  const mainCheckbox = document.querySelectorAll('#main__checkbox');
  const maincheckState = mainCheckbox[0].checked
  const allChecks = document.querySelectorAll('[id^="item__checkbox__"]');

  { maincheckState ? (boxCount = 3) : (boxCount = 0) }
  allChecks.forEach(check => check.checked = maincheckState)

  const counter = document.getElementById("cart__pos__count");
  counter.innerText = boxCount

  const footerCounter = document.getElementById("footer__cart__pos__count");
  if (footerCounter) {
    footerCounter.innerText = boxCount
  }

  // cart.forEach(item => item.checked = !item.checked) // bug
  cart.forEach(item => item.checked !== maincheckState ? item.checked = !item.checked : '') // bugfix
  console.log('cart', cart)

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
  allItemsWord.innerHTML = `&nbsp;${WordEnding.changeEnding(allQtyRez, ['товар', 'товара', 'товаров'])}`
}
window.toggleCheckboxes = toggleCheckboxes


function singleInputToggle(event, id, name) {
  event.stopImmediatePropagation()

  let chName = document.querySelectorAll(`[name="${name}"]`);
  const checkState = chName[0].checked
  let cbarray = document.querySelectorAll(`#item__checkbox__${id}`);

  cbarray.forEach((ch) => ch.checked = checkState)
  { checkState ? ++boxCount : --boxCount }

  const counter = document.getElementById("cart__pos__count");
  counter.innerText = boxCount

  const footerCounter = document.getElementById("footer__cart__pos__count");
  if (footerCounter) {
    footerCounter.innerText = boxCount
  }

  if (boxCount < 3 ) {
    isAllCheck = false
    document.getElementById("main__checkbox").checked = isAllCheck
  } else if (boxCount === 3) {
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

  // const additionalQtyContainer = document.getElementById(`delivery__list__additional`);
  // const additionalDeliveryDate = document.getElementById(`delivery__date__additinal`);
  // if (id === `чехол` && cbarray[0].checked === false) {
  //   additionalQtyContainer.style.display = `none`
  //   additionalDeliveryDate.style.display = `none`
  // }
  // if (id === `чехол` && cbarray[0].checked === true) {
  //   additionalQtyContainer.style.display = `flex`
  //   additionalDeliveryDate.style.display = `flex`
  // }

  const toDiscSumm = cart.filter(item => item.checked === true)
  const discSummRez = toDiscSumm.reduce(function (acc, obj) { return acc + obj.discSumm; }, 0);
  allTotal.innerText = discSummRez.toLocaleString('ru-RU')

  const disc = cart.filter(item => item.checked === true)
  const discRez = disc.reduce(function (acc, obj) { return acc + obj.discount; }, 0);
  allDiscounts.innerText = discRez.toLocaleString('ru-RU')

  const allQty = cart.filter(item => item.checked === true)
  const allQtyRez = allQty.reduce(function (acc, obj) { return acc + obj.count; }, 0);
  allItems.innerText = allQtyRez
  allItemsWord.innerHTML = `&nbsp;${WordEnding.changeEnding(allQtyRez, ['товар', 'товара', 'товаров'])}`
}
window.singleInputToggle = singleInputToggle
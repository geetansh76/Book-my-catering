const slidePage = document.querySelector(".slide-page");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
const menu = import("../movies.json")

nextBtn.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
submitBtn.addEventListener("click", function () {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Submited");
    location.reload();
  }, 800);
});
prevBtn.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 1].classList.remove("active");
  progressCheck[current - 1].classList.remove("active");
  progressText[current - 1].classList.remove("active");
  current -= 1;
});

/*----------- Menu ----------------------*/
let items = {}
let item_count = document.getElementById('item_count')
let total_price = document.getElementById('total_price')
let products = document.getElementById("products");
var cart_item = document.getElementById('cart-items');
let totalAmount = 0;

function startingFunction() {

  const xhr = new XMLHttpRequest();
  xhr.open("GET",
    "http://localhost:4001/list_movies", true);
  xhr.onload = function () {
    if (this.status === 200) {

      obj = JSON.parse(this.responseText);
      console.log(obj)
      let breakfast = obj[0].breakfast;
      let lunch = obj[0].lunch;
      let dinner = obj[0].dinner;

      str = ""
      if (breakfast.length != 0) {
        str += `
        <h2>Break Fast</h2>`
        for (let i = 0; i < breakfast.length; i++) {
          items[breakfast[i].id] = breakfast[i];
          str += `<div class="product">
                      <div class="product-info">
                          <div class="item" >
                              <h3 class="product-name">${breakfast[i].title}</h3>
                              <span class="border"></span>
                              <h4 class="product-price">₹ ${breakfast[i].price}</h4>
                              <button class="product-add" onClick="myFunction('add',this.id)" id="${breakfast[i].id}">
                                  <i class="fa fa-plus" aria-hidden="true"></i>
                                  <span class="add">Add</span>
                              </button>
                              <button class="product-remove mn none" onClick="myFunction('remove',this.id)" id='${breakfast[i].id}_remove'>
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                  <span class="remove">Remove</span>
                              </button>
                  
                          </div>
                      </div>
                    </div>`
          }

      }
      if (lunch.length != 0) {
        str += `
                                        <h2>Lunch</h2>`
        for (let i = 0; i < lunch.length; i++) {
          items[lunch[i].id] = lunch[i];

          str += `<div class="product">
                                <div class="product-info">
                                    <div class="item" >
                                        <h3 class="product-name">${lunch[i].title}</h3>
                                        <span class="border"></span>
                                        <h4 class="product-price">₹ ${lunch[i].price}</h4>
                                        <button class="product-add" onClick="myFunction('add',this.id)" id="${lunch[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove mn none" onClick="myFunction('remove',this.id)" id='${lunch[i].id}_remove'>
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                            <span class="remove">Remove</span>
                                        </button>
                            
                                    </div>
                                </div>
                            </div>`
        }

      }
      if (dinner.length != 0) {

        str += `
                                        <h2>Dinner</h2>`
        for (let i = 0; i < dinner.length; i++) {
          items[dinner[i].id] = dinner[i];

          str += `<div class="product" >
                                <div class="product-info">
                                    <div class="item">
                                        <h3 class="product-name">${dinner[i].title}</h3>
                                        <span class="border"></span>
                                        <h4 class="product-price">₹ ${dinner[i].price}</h4>
                                       
                                        <button class="product-add" onClick="myFunction('add',this.id)" id="${dinner[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove mn none" onClick="myFunction('remove',this.id)" id='${dinner[i].id}_remove'>
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                            <span class="remove">Remove</span>
                                        </button>
                            
                                    </div>
                                </div>
                            </div>`
        }
      }

      products.innerHTML = str;
    }
    else {
      console.log("File not found");
    }
  }
  xhr.send();
}
window.onload = (event) => {
  startingFunction();
};

var cartList = []
var breakfast = []
var lunch = []
var dinner = []
function myFunction(str, time, id) {
  if (str == 'add') {

    perPlateAmount += items[id].price;
    if (time == 'breakfast') {
      breakfast.push(items[id]);
    }
    else if (time == 'lunch') {
      lunch.push(items[id]);
    } else {
      dinner.push(items[id]);
    }
    cartList.push(items[id]);
    document.getElementById(id).classList.add('none')
    document.getElementById(`${id}_remove`).classList.remove('none')

  }
  else {

    id = id.substring(0, id.length - 7)

    if (time == 'breakfast') {


      breakfast = breakfast.filter((value) => {
        return value.id != id;
      });
    }
    else if (time == 'lunch') {
      lunch = lunch.filter((value) => {
        return value.id != id;
      });
    } else {
      dinner = dinner.filter((value) => {
        return value.id != id;
      });
    }
    cartList = cartList.filter((value) => {
      return value.id != id;
    });
    document.getElementById(id).classList.remove('none')
    document.getElementById(`${id}_remove`).classList.add('none')
  }
  updateCart();
}
function updateCart() {
  total_price.innerHTML = 'Rs ' + (perPlateAmount * details['no_of_people']).toString()
  per_plate.innerHTML = 'Rs ' + perPlateAmount.toString()
  item_count.innerHTML = cartList.length.toString()
  let str = '';
  for (let i = 0; i < cartList.length; i++) {
    str += `
                <div class="elements">
                            <div class="element">
                                <h3 class="product-name">${cartList[i].title}</h3>
                                <h3 class="product-price">₹ ${cartList[i].price}</h3>
                                <button class="product-remove" onClick="myFunction('remove','${cartList[i].id}_remove')">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="remove">Remove</span>
                                </button>
                            </div>
                </div>`
  }
  cart_item.innerHTML = str;

}

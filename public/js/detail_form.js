const slidePage = document.querySelector(".slide-page");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;
var details = {};
$('#next').click(function (e) {
  e.preventDefault()
  details = {
    'name': $('#name').val(),
    'phone_no': $('#phone_no').val(),
    'email': $('#email').val(),
    'address': $('#address').val(),
    'city': $('#city').val(),
    'state': $('#state').val(),
    'zip_code': $('#pincode').val(),
    'event_date': $('#date').val(),

    'no_of_caterer': $('#caters').val(),
    'no_of_people': $('#no_of_people').val(),
    // 'cater_id':,
    'shift': $('#shift').val(),
    'service': $('#service').val()
  }
  
  if (validate(details) || true) {
    // event.preventDefault();
    $('#error').html('')
    slidePage.style.marginLeft = "-25%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    $('#people').html(details['no_of_people'])
  }


  console.log(details)

});
function validate(mp) {
  for (const [key, val] of Object.entries(mp)) {
    if (val === null || val.length == 0 || val === 'none') {

      $('#error').html('Please fill all details')
      return false;
    }
  }
  return true;
}

submitBtn.addEventListener("click", async function () {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  data = {
    ...details,
    'items': [{
      "breakfast": [...breakfast],
      "lunch": [...lunch],
      "dinner": [...dinner],
    },
    ],

    'order_date': new Date(),
    'order_id': orderId,
    "total_price": perPlateAmount * details['no_of_people'],
    "cater_id": localStorage.getItem('currentCaterId'),
    'payment_status': 'pending'
  }
  await $.ajax({
    url: "http://localhost:3000/orders",
    type: "POST",
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(data),
    async: true,
    success: function (response, textStatus, jqXHR) {
      console.log(response.body)
      //data - response from server
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
  payment();
  current -= 1;
  console.log(data);
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
let perPlateAmount = 0;

function startingFunction() {

  const xhr = new XMLHttpRequest();
  xhr.open("GET",
    "http://localhost:3000/list_movies", true);
  xhr.onload = function () {
    if (this.status === 200) {

      obj = JSON.parse(this.responseText);
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
                                        <button class="product-add" type='button' onclick="myFunction('add','breakfast',this.id)" id="${breakfast[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove none" type="button" onclick="myFunction('remove','breakfast',this.id)" id='${breakfast[i].id}_remove'>
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
                                        <button class="product-add" type='button' onclick="myFunction('add','lunch',this.id)" id="${lunch[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove none" type='button' onclick="myFunction('remove','lunch',this.id)" id='${lunch[i].id}_remove'>
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
                                       
                                        <button class="product-add" type='button' onclick="myFunction('add','dinner',this.id)" id="${dinner[i].id}">
                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                            <span class="add">Add</span>
                                        </button>
                                        <button class="product-remove none" type='button'   onclick="myFunction('remove','dinner',this.id)" id='${dinner[i].id}_remove'>
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




// Payment
var orderId;
$(document).ready(function () {
  var settings = {
    "url": "/create/orderId",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "amount": perPlateAmount * details['no_of_people']*100
    }),
  };

  //creates new orderId everytime
  $.ajax(settings).done(function (response) {

    orderId = response.orderId;
    console.log(orderId);
    $("button").show();
  });
});

function payment() {
 var price= perPlateAmount * details['no_of_people']*100
 console.log(price);
  var options = {
    "key": "rzp_test_B18jSv3TMrkWsp", // Enter the Key ID generated from the Dashboard
    "amount": price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Catering Service",
    "description": "Babhut Paisa aa gaya ha ",
    //"image": "https://example.com/your_logo",
    "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response) {
       orderSuccessUpdate()
      

    },

    "theme": {
      "color": "#3399cc"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
}

async function orderSuccessUpdate(){
  await $.ajax({
    url: `http://localhost:3000/orderUpdate/${orderId}`,
    type: "PUT",
    contentType: 'application/json',
    dataType: 'json',
    async: true,
    success: function (response, textStatus, jqXHR) {
      console.log(response.body)
      //data - response from server'
      window.location.href='./success_page'
    
    },
    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
  
}
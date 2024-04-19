async function getMenu() {
    //url = 'http://localhost:3000/catermenuformdata/me'
    url = 'http://localhost:3000/shiva'

    const res = await fetch(url)
    const data = await res.json()
    return data
}
$('#hello').click(async function(){
    var dishName = $('#dish_name').val();
    var price = $('#price').val();
     var meal = $('#meal').val();
     console.log(meal)
     var mp = {};
    if (meal == 'breakfast') {
        mp = {
            'breakfast': {

                'title': dishName,
                'price': price
            }
        }
    }
    else if (meal == 'lunch') {
        mp = {
            'lunch': {
                'title': dishName,
                'price': price
            }
        }
    }
    else {
        mp = {
            'dinner': {

                'title': dishName,
                'price': price
            }
        }
    }
    console.log(mp)
    await $.ajax({
        url: "http://localhost:3000/updatemenu",
        type: "PUT",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(mp),
        async: true,
        success: function (response, textStatus, jqXHR) {
          console.log(response.body)
          //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
      });

})
async function addButton() {

    var dishName = $('#dish_name').val();
    var price = $('#price').val();
     var meal = $('#meal').val();
    
    // var mp = {};
    // if (meal == 'breakfast') {
    //     mp = {
    //         'breakfast': {

    //             'title': dishName,
    //             'price': price
    //         }
    //     }
    // }
    // else if (meal == 'lunch') {
    //     mp = {
    //         'lunch': {
    //             'title': dishName,
    //             'price': price
    //         }
    //     }
    // }
    // else {
    //     mp = {
    //         'dinner': {

    //             'title': dishName,
    //             'price': price
    //         }
    //     }
    // }
    // console.log(mp)
    // await $.ajax({
    //     url: "http://localhost:3000/updatemenu",
    //     type: "PUT",
    //     contentType: 'application/json',
    //     dataType: 'json',
    //     data: JSON.stringify(mp),
    //     async: true,
    //     success: function (response, textStatus, jqXHR) {
    //       console.log(response.body)
    //       //data - response from server
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {

    //     }
    //   });

}

async function removeBreakfastItem(id) {
    var meal = {
        'breakfast': {
            '_id' : id
        }
    }
    console.log('meal')
    console.log(meal)
    await $.ajax({
        url: "http://localhost:3000/updatemenu/delete",
        type: "PUT",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(meal),
        async: true,
        success: function (response, textStatus, jqXHR) {
          console.log(response.body)
          //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    })
}

async function removeLunchItem(id) {
    var meal = {
        'lunch': {
            '_id' : id
        }
    }
    console.log('meal')
    console.log(meal)
    await $.ajax({
        url: "http://localhost:3000/updatemenu/delete",
        type: "PUT",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(meal),
        async: true,
        success: function (response, textStatus, jqXHR) {
          console.log(response.body)
          //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    })
}

async function removeDinnerItem(id) {
    var meal = {
        'dinner': {
            '_id' : id
        }
    }
    console.log('meal')
    console.log(meal)
    await $.ajax({
        url: "http://localhost:3000/updatemenu/delete",
        type: "PUT",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(meal),
        async: true,
        success: function (response, textStatus, jqXHR) {
          console.log(response.body)
          //data - response from server
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    })
}

let a = getMenu()
a.then((data)=>{
    console.log(data)
    //console.log(data[0].breakfast[4]._id)
    const menubox = document.querySelector('#menubox')
    const dinner = data[0].dinner
    const lunch = data[0].lunch
    const breakfast = data[0].breakfast
    const total_item = breakfast.length + lunch.length + dinner.length 
    //console.log('total item',total_item)
    x = document.querySelector('#total_item')
    x.innerHTML = total_item
    str = ''

    if(breakfast.length !=0){
        str+=`<div class="block">
        <h2>Breakfast</h2>`
    }
    for(let i=0;i<breakfast.length;i++ ){
        str += `<div class="product">
        <div class="product-info">
            <div class="item">
                <h3 class="product-name">${breakfast[i].title}</h3>
                <span class="border"></span>
                <h4 class="product-price">₹ ${breakfast[i].price}</h4>
                <button class="product-remove" onclick="removeBreakfastItem(this.id)"  id="${data[0].breakfast[i]._id}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span class="remove">Remove</span>
                </button>
            </div>
        </div>
    </div>`
    }
    str += `</div>`


    if(lunch.length !=0){
        str+=`<div class="block">
        <h2>Lunch</h2>`
    }
    for(let i=0;i<lunch.length;i++ ){
        str += `<div class="product">
        <div class="product-info">
            <div class="item">
                <h3 class="product-name">${lunch[i].title}</h3>
                <span class="border"></span>
                <h4 class="product-price">₹ ${lunch[i].price}</h4>
                <button class="product-remove" onclick="removeLunchItem(this.id)"  id="${data[0].lunch[i]._id}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span class="remove">Remove</span>
                </button>
            </div>
        </div>
    </div>`
    }
    str += `</div>`


    if(dinner.length!=0){
        str+=`<div class="block">
        <h2>Dinner</h2>`
    }
    for(let i=0;i<dinner.length;i++ ){
        str += `<div class="product">
        <div class="product-info">
            <div class="item">
                <h3 class="product-name">${dinner[i].title}</h3>
                <span class="border"></span>
                <h4 class="product-price">₹ ${dinner[i].price}</h4>
                <button class="product-remove" onclick="removeDinnerItem(this.id)"  id="${data[0].dinner[i]._id}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span class="remove">Remove</span>
                </button>
            </div>
        </div>
    </div>`
    }
str += `</div>`

menubox.innerHTML = str
})
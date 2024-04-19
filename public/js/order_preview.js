async function getOrderPreview() {
    //url = 'http://localhost:3000/services/data'
    //url = 'http://localhost:3000/malik'
     url = 'http://localhost:3000/order/data/me'
   // url = 'http://localhost:3000/caterName/me'

    const res = await fetch(url)
    const data = await res.json()
    return data
}


let a = getOrderPreview()

function profile(id) {
    console.log('Setting id:')
    console.log(id)
    localStorage.setItem('id', (id))
    window.location.href = '/orderDetails'
}

a.then((data) => {
    console.log(data)
    console.log(data.length)
    console.log(data[0].name)
    const order = document.querySelector('#order')
    str = ''
    for (i = 0; i < data.length; i++) {
        const per_plate = data[0].total_price/data[0].no_of_people
        str +=`
        <div class="order">
                <p class="heading" name="caterer">${data[i].name}</p>
                <p class="items u" name="caterer">Venu</p>
                <p class="items u" name="caterer">No. of persons</p>
                <p class="items d" name="caterer">${data[i].address} ${data[i].city} ${data[i].state} ${data[i].zip_code}</p>
                <p class="items d" name="caterer">${data[i].no_of_people}</p>
                <p class="items u" name="caterer">Booking Date</p>
                <p class="items u" name="caterer">Event Date</p>
                <p class="items d" name="caterer">${data[i].order_date}</p>
                <p class="items d" name="caterer">${data[i].event_date}</p>
                <p class="border"></p>
                <p class="items u" name="caterer">Per Plate</p>
                <p class="items u" name="caterer">Total</p>
                <p class="items d" name="caterer">₹ ${per_plate}</p>
                <p class="items d" name="caterer">₹ ${data[i].total_price}</p>
                <a class="detail-button" type="button" onclick="profile(this.id)" id="${data[i]._id}" >View details</a>
        </div>`
    }
    order.innerHTML = str
})

console.log(order)

//<button onclick="profile(this.id)" id="${data[i]._id}" >Book Now</button>

x = document.querySelector('#header')
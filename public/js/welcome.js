async function welCome_details() {
    url = "http://localhost:3000/users"
    //url = "http://localhost:3000/cater"
    params = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
    }
    const res = await fetch(url, params)
    const data = await res.json()
    return data
}

let a = welCome_details()
function profile(id) {
    console.log('Setting id:')
    console.log(id)
    localStorage.setItem('currentCaterId', (id))
    localStorage.setItem('name', ('Hrithik'))
    window.location.href = '/details'
}
a.then((data) => {
   // console.log(data)
   // console.log(data[0]._id)
    //localStorage.setItem('id',(data[0]._id))
    let cards = document.getElementById('cards')
    //console.log(user_type)
    //if(user_type === 'catering')
    str = ''
    for (i = 0; i < data.length; i++) {
        let user_type = `${data[i].user_type}`

        if (user_type === "catering") {
            str += `<div class="card">
                <div class="box img"><img src="./image/cater_logo.jpg" alt=""> </div>
                <div class="box items">
                    <h1>${data[i].name}</h1>
                    <div class="item">
                        <img src="./image/phone-call.png" alt="">
                        <p>+(91)-${data[i].mobile_no}</p>
                    </div>
                    <div class="item">
                        <img src="./image/location.png" alt="">
                        <p>${data[i].address} ${data[i].city} ${data[i].state} ${data[i].zip_code}| more</p>
                    </div>
                    <div class="item">
                        <img src="./image/bookmark.png" alt="">
                        <p>Tiffin, Catering, Resturant, t... | more</p>
                    </div>
                    <div class="item">
                        <img src="./image/time-twenty-four.png" alt="">
                        <p>Open 24 hour</p>
                    </div>
                </div>
                <div class="box item-button">
                    <button onclick="profile(this.id)" id="${data[i]._id}" >Book Now</button>
                </div>
            </div>`
        }

        cards.innerHTML = str
    }


})
const x = document.querySelector('#name')
function getData(){
    url = 'http://localhost:3000/detail/626cf5d2426ac406ca61ef64'

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
        console.log(data.name)
        x.textContent = data.name
        console.log(`${data.address} ${data.state}`)
    })
}

getData()
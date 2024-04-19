async function getMenu(){
    url = 'http://localhost:3000/menu/data'

    const res = await fetch(url)
    const data = await res.json()
    return data 
}

let a = getMenu()
a.then((data)=>{console.log(data)})
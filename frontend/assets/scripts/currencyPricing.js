const callApi = (api, token) => fetch(api, {
    method: 'GET',
    headers: {
        // 'Authorization': 'Basic '+btoa('username:password'),
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
});

async function common(api, token, id) {
    try {
        const response = await callApi(api,token);
        if(response.status === 401 || response.status === 403) return alert('Access not allowed!');
        if(response.status !== 200) {
            console.log(response.status);
            return alert('Something went wrong!');
        }

        const { USD, EUR } = await response.json();
        // console.log('x',data);
        const price = document.getElementById(id);
        price.innerHTML = 'USD: &nbsp;'+USD + '<br>EUR: &nbsp;'+EUR;
    } catch (err) {
        console.log('err ->',err);
    }
}

// async function btcPrice(){
//     const token = 1;
//     const response = await callApi('/btc','GET',{ token });
//     if(response.status !== 200)
//         return alert('Something went wrong!\nPlease try again...');

//     const { USD:usd, EUR:eur } = await response.json();
//     // console.log('x',data);
//     const price = document.getElementById('btc');
//     price.innerHTML = 'USD: &nbsp;'+usd + '<br>EUR: &nbsp;'+eur;
// }

/*
async function ethPrice(){
    const token = 1;
    const response = await callApi('/eth','GET',{ token });
    if(response.status !== 200)
        return alert('Something went wrong!\nPlease try again...');

    const { USD:usd, EUR:eur } = await response.json();
    // console.log('x',data);
    const price = document.getElementById('eth');
    price.innerHTML = 'USD: &nbsp;'+usd + '<br>EUR: &nbsp;'+eur;
}


async function bnbPrice(){
    const token = 1;
    const response = await callApi('/bnb','GET',{ token });
    if(response.status !== 200)
        return alert('Something went wrong!\nPlease try again...');

    const { USD:usd, EUR:eur } = await response.json();
    // console.log('x',data);
    const price = document.getElementById('bnb');
    price.innerHTML = 'USD: &nbsp;'+usd + '<br>EUR: &nbsp;'+eur;
}
*/


const btcPrice = token => common('/btc',token,'btc');
const ethPrice = token => common('/eth',token,'eth');
const bnbPrice = token => common('/bnb',token,'bnb');


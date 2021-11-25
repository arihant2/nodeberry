const callApi = (api, token) => fetch(api, {
    method: 'GET',
    headers: {
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
        document.getElementById(id).innerHTML = 'USD: &nbsp;'+USD + '<br>EUR: &nbsp;'+EUR;
    } catch (err) {
        console.log('err ->',err);
    }
}


const btcPrice = token => common('/btc',token,'btc');
const ethPrice = token => common('/eth',token,'eth');
const bnbPrice = token => common('/bnb',token,'bnb');


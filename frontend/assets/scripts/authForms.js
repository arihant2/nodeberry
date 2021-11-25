const callApi = (api, method, data) => fetch(api, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});


const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async e => {
    try {
        e.preventDefault();     // prevent form from reloading
        const email = document.getElementById('email2').value;
        const password = document.getElementById('password2').value;

        const response = await callApi('/login','POST',{ email, password });
        if(response.status === 422) return alert('Wrong email or password format!');
        if(response.status === 401) return alert('Invalid credentials!');
        if(response.status !== 200) {
            console.log(response.status);
            return alert('Something went wrong!');
        }

        const { token } = await response.json();
        if(!token) return alert('Something went wrong!');
        window.location.href = '/currencypricing/' + token;        // open pg in same tab
    } catch (err) {
        console.log('err ->',err);
    }
});


const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async e => {
    try {
        e.preventDefault();     // prevent form from reloading
        const username = document.getElementById('username').value;
        const email = document.getElementById('email1').value;
        const password = document.getElementById('password1').value;

        const response = await callApi('/signup','POST',{ username, email, password });
        if(response.status === 422) return alert('Wrong input format for one of the fields!');
        if(response.status === 409) return alert('Email already exists!');
        if(response.status !== 202) {
            console.log(response.status);
            return alert('Something went wrong!');
        }

        const msg = await response.text();
        if(!msg) return alert('Something went wrong!');
        alert(msg);

        document.getElementById('verifyemail').style.display = "initial";
        document.getElementById('signup').style.display = "none";
    } catch (err) {
        console.log('err ->',err);
    }
});


const verifyemailForm = document.getElementById('verifyemail-form');
verifyemailForm.addEventListener('submit', async e => {
    try {
        e.preventDefault();     // prevent form from reloading
        const code = document.getElementById('code').value;

        const response = await callApi('/verifyemail/'+code,'GET');
        if(response.status === 401) return alert('Incorrect code!');
        if(response.status !== 201) {
            console.log(response.status);
            return alert('Something went wrong!');
        }

        const { msg } = await response.json();
        if(!msg) return alert('Something went wrong!');
        alert(msg);

        window.location.href = '/';        // open pg in same tab
    } catch (err) {
        console.log('err ->',err);
    }
});


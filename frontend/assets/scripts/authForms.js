// async function callApi(api, data) {
//     // console.log(data,typeof(data));
//     try {
//         await fetch(api, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });
//     } catch (err) {
//         console.log('err ->',err);
//     }
// }
const callApi = (api, method, data) => fetch(api, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});


// const login =
// async function login() {
//     try {
//         await fetch(`/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: JSON.stringify({ data, pg })
//         });
//     } catch (err) {
//         console.log('err ->',err);
//     }
// }
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async e => {
    try {
        e.preventDefault();     // prevent form from reloading
        // console.log(loginForm);
        // const formData = new FormData();
        // console.log(formData);
        // const formDataSerialized = Object.fromEntries(formData);
        // console.log(formDataSerialized);
        const email = document.getElementById('email2').value;
        const password = document.getElementById('password2').value;

        // console.log(email,pass);
        const response = await callApi('/login','POST',{ email, password });
        // console.log(response);
        if(response.status === 422) return alert('Wrong email or password format!');
        if(response.status === 401) return alert('Invalid credentials!');
        if(response.status !== 200) {
            console.log(response.status);
            return alert('Something went wrong!');
        }
        // console.log(response.json());
        const { token } = await response.json();
        if(!token) return alert('Something went wrong!');
        // console.log(x);
        // await callApi(`/currencypricing/${token}`,'GET');
        // window.open('/home');
        // window.open(`/currencypricing/${token}`);        // open pg in new tab
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
        // console.log(username,email,password);

        const response = await callApi('/signup','POST',{ username, email, password });
        if(response.status === 422) return alert('Wrong input format for one of the fields!');
        if(response.status === 409) return alert('Email already exists!');
        if(response.status !== 202) {
            console.log(response.status);
            return alert('Something went wrong!');
        }

        const msg = await response.text();
        if(!msg) return alert('Something went wrong!');
        // console.log(msg);
        alert(msg);

        // const signupSection = document.getElementById('signup');
        // const verifyemailSection = document.getElementById('verifyemail');
        // verifyemailSection.style.display = "initial";
        // signupSection.style.display = "none";
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
        // console.log(msg);
        alert(msg);

        window.location.href = '/';        // open pg in same tab
        // const signupSection = document.getElementById('signup');
        // const verifyemailSection = document.getElementById('verifyemail');
        // alert('Signup Successful!\nLogin Now...');
        // signupSection.style.display = "initial";
        // verifyemailSection.style.display = "none";
    } catch (err) {
        console.log('err ->',err);
    }
});


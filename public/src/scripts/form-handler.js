//get error message containers
const regInputError = document.querySelector('.reg-input-error');
const logInputError = document.querySelector('.log-input-error');
//reg form
const formReg = document.querySelector('#reg-form');
if (formReg){
    formReg.addEventListener('submit', async event => {
        event.preventDefault();

        //reset errors
        regInputError.textContent = '';

        //get values from the form
        const login = document.getElementById('reg-login').value;
        const password = document.getElementById('reg-password').value;


        //post request
        try {
            const res = await fetch("/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({login, password})
            });

            const data = await res.json();

            //show error message to the user (if there is one)

            if (data.message) {
                regInputError.textContent = data.message
            }
            if (data.user){
                location.assign('/logged')
            }
        } catch (error) {
            console.log(error)

        } finally {
            console.log('Done handling form')
        }


    })
}




//log form

const formLog = document.querySelector('#log-form');

if(formLog){
    formLog.addEventListener('submit', async event => {
        event.preventDefault();

        //reset errors
        logInputError.textContent = '';

        //get values from the form
        const login = document.getElementById('log-login').value;
        const password = document.getElementById('log-password').value;


        //post request
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({login, password})
            });

            const data = await res.json();

            //show error message to the user (if there is one)

            if (data.message) {
                logInputError.textContent = data.message
            }
            if (data.user){
                location.assign('/logged')
            }
        } catch (error) {
            console.log(error)

        } finally {
            console.log('Done handling form');
        }


    })

}



const savetoDB = document.querySelector('#save-to-db');

if (savetoDB){
    const loggedUserInputMessage = document.getElementById('logged-user-input-message');
    loggedUserInputMessage.textContent = '';
    savetoDB.addEventListener('click', async event => {
        event.preventDefault();
        const getLocalPoints = localStorage.getItem('all-points');
        getLocalPoints ?? 0;
        try {
            const res = await fetch("/logged/points", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({getLocalPoints}),
            });

            const data = await res.json();
            if (data.message) {
                loggedUserInputMessage.textContent = data.message
            }
        } catch (error) {
            console.log(error)

        }
    });

}


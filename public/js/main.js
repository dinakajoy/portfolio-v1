if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../../sw_Site.js')
        .then(reg => console.log())
        .catch(err => console.log(`Service Worker Error: Error-${err}`));
    });
} else {
    console.log('Service Worker Is Not Suported');
}

document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    const response = document.querySelector('#submit');
    response.value = 'Submitting...';
    response.disabled = true;
    
    const data = {
        name: document.querySelector('#uname').value,
        email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        body: document.querySelector('#body').value
    }

    fetch('/contact-form', {method: 'POST', headers: {'Content-Type': 'application/json'},  credentials: 'same-origin', body: JSON.stringify(data)})
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                response.value = 'Submitted';
                response.style.background = 'green';
                response.style.color = 'white';
            } else {
                response.value = 'Error, please reload';
            }
        })
        .catch(error => {
            response.value = 'Error, please reload';
        })
})
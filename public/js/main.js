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
    const output = document.querySelector('.output');
    output.disabled = true;
    const data = {
        from: document.querySelector('#from').value,
        name: document.querySelector('#uname').value,
        subject: document.querySelector('#subject').value,
        body: document.querySelector('#body').value
    }

    fetch('/mail', {method: 'POST', headers: {'Content-Type': 'application/json'},  credentials: 'same-origin', body: JSON.stringify(data)})
        .then(response => response.json())
        .then(data => {
            output.innerHTML = data.message;
            output.disabled = false;
        });
})
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        // Perform basic authentication (this is a simple example; for production, use a more secure method)
        if (username === 'admin' && password === 'password') { // Replace with your own credentials
            localStorage.setItem('authenticated', 'true');
            window.location.href = '/index.html';
        } else {
            alert('Invalid username or password');
        }
    } else {
        alert('Please fill in both fields.');
    }
});

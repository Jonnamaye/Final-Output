let users = JSON.parse(localStorage.getItem('users')) || [];

function showForm(formType) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    
    document.querySelector(`.tab[data-form="${formType}"]`).classList.add('active');
    document.getElementById(`${formType}Form`).classList.add('active');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'activities.html';
    } else {
        alert('Invalid username or password! Try again or sign up.');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (users.some(u => u.username === username)) {
        alert('Username already exists!');
        return;
    }
    
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Signup successful! Please login with your new account.');
    this.reset();
    showForm('login');
});

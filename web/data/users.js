let users = [];

function fetchUsers() {
    return fetch('/web/data/users.json')
      .then(response => response.json())
      .then(data => {
        users = data;
        initializeEventListeners();
      })
      .catch(error => console.error('Error al cargar el archivo JSON de usuarios:', error));
}

function createUser(name, email, password) {
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        alert('Usuario ya registrado con este correo, por favor inicia sesión');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        rol: "USER",
        password: password
    };

    alert('Cuenta creada satisfactoriamente');
    
    users.push(newUser);
    
    console.log(users);
    
    window.location.href = 'mainpage.html';
}

function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
        alert('Email o contraseña incorrectos');
        return;
    }

    // Guardar usuario en localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    
    if (user.rol === 'USER') {
        window.location.href = 'mainpage.html';
    } else if (user.rol === 'ADMIN') {
        window.location.href = 'admin.html';
    }
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'mainpage.html';
}

function checkLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        // Cambiar mensaje de bienvenida y botón
        document.querySelector('.bienvenida h2').textContent = `Bienvenido, ${loggedInUser.name}!`;
        const loginButton = document.querySelector('.btn-iniciar-sesion');
        loginButton.textContent = 'Cerrar Sesión';
        loginButton.href = '#';
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();
            logoutUser();
        });
    }
}

function initializeEventListeners() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            var nombre = document.getElementById('nombre').value;
            var email = document.getElementById('email').value;
            var contrasena = document.getElementById('contrasena').value;
            if (nombre === '' || email === '' || contrasena === '') {
                alert('Por favor llena todos los campos');
                return;
            }
            createUser(nombre, email, contrasena);
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('contrasena').value = '';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            var email = document.getElementById('loginEmail').value;
            var contrasena = document.getElementById('loginPassword').value;
            if (email === '' || contrasena === '') {
                alert('Por favor llena todos los campos');
                return;
            }
            loginUser(email, contrasena);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    checkLoggedInUser();
});

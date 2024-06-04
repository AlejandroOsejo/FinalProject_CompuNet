const users = [
    {
        
        id: 1,
        
        name: "Juan Torres",
        
        email: "juandatorres@gmail.com",
        
        rol: "ADMIN",
        
        password: "ADMIN123"
    
    }

];

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
    
    if (user.rol === 'USER') {
    
        window.location.href = 'mainpage.html';
    
    } else if (user.rol === 'ADMIN') {
    
        window.location.href = 'admin.html';
    
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
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

});

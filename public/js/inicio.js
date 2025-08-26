document.addEventListener('DOMContentLoaded', () => {
    const registroBtn = document.querySelector('button[type="button"]:not(#btninicio)');
    if (registroBtn) {
        registroBtn.addEventListener('click', handleRegister);
    }

    const inicioBtn = document.getElementById('btninicio');
    if (inicioBtn) {
        inicioBtn.addEventListener('click', handleLogin);
    }
});

function showMessage(msg, type = 'error') {
    let msgDiv = document.getElementById('msg');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'msg';
        msgDiv.style.margin = '10px 0';
        msgDiv.style.color = type === 'error' ? 'red' : 'green';
        const container = document.querySelector('.container');
        container.insertBefore(msgDiv, container.children[container.children.length - 1]);
    }
    msgDiv.style.color = type === 'error' ? 'red' : 'green';
    msgDiv.innerText = msg;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function handleRegister() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim().toLowerCase();
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmar').value;


    if (!nombre || !correo || !usuario || !password || !confirmar) {
        showMessage('Todos los campos son obligatorios.');
        return;
    }
    if (!validateEmail(correo)) {
        showMessage('El correo no es válido.');
        return;
    }
    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (password !== confirmar) {
        showMessage('Las contraseñas no coinciden.');
        return;
    }

    const users = getUsers();

    if (users.some(u => u.usuario === usuario)) {
        showMessage('El nombre de usuario ya existe.');
        return;
    }
    if (users.some(u => u.correo === correo)) {
        showMessage('El correo ya está registrado.');
        return;
    }

    users.push({ nombre, correo, usuario, password });
    saveUsers(users);

    showMessage('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
    setTimeout(() => { window.location.href = 'iniciosecion.html'; }, 1200);
}


function handleLogin() {
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Por favor, completa todos los campos.');
        return;
    }

    const users = getUsers();

    const user = users.find(u =>
        (u.usuario.toLowerCase() === username || u.correo === username) && u.password === password
    );

    if (!user) {
        showMessage('Usuario o contraseña incorrectos.');
        return;
    }


    localStorage.setItem('currentUser', user.usuario);

    showMessage('¡Inicio de sesión exitoso!', 'success');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1200);
}
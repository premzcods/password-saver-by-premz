let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
let deleteIndex = null;

document.getElementById('passwordForm').addEventListener('submit', savePassword);
window.addEventListener('load', renderPasswords);

function savePassword(e) {
    e.preventDefault();
    
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    passwords.push({ website, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));
    
    document.getElementById('passwordForm').reset();
    renderPasswords();
}

/* Rest of the JavaScript functions from previous answer */
/* (Copy all JS content from the previous combined version) */
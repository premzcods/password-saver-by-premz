// script.js
let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
let deleteIndex = null;

// Load passwords when the page loads
window.addEventListener('load', () => {
    renderPasswords();
});

// Save password form submission
document.getElementById('passwordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    savePassword();
});

// Function to save a new password
function savePassword() {
    const website = document.getElementById('website').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!website || !username || !password) {
        alert('Please fill in all fields!');
        return;
    }

    // Add new password entry
    passwords.push({ website, username, password });
    localStorage.setItem('passwords', JSON.stringify(passwords));

    // Clear the form
    document.getElementById('passwordForm').reset();

    // Re-render the password list
    renderPasswords();
}

// Function to render the password list
function renderPasswords() {
    const passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';

    passwords.forEach((entry, index) => {
        const passwordItem = document.createElement('div');
        passwordItem.className = 'password-item';
        passwordItem.innerHTML = `
            <div>
                <h3>${entry.website}</h3>
                <p>${entry.username}</p>
            </div>
            <div class="actions">
                <button class="icon-btn" onclick="togglePassword(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="icon-btn" onclick="showDeleteModal(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        passwordList.appendChild(passwordItem);
    });
}

// Function to toggle password visibility
function togglePassword(index) {
    const entry = passwords[index];
    const passwordField = document.querySelectorAll('.password-item h3')[index];

    if (passwordField.textContent === entry.website) {
        passwordField.textContent = entry.password;
    } else {
        passwordField.textContent = entry.website;
    }
}

// Function to show the delete confirmation modal
function showDeleteModal(index) {
    deleteIndex = index;
    document.getElementById('deleteModal').style.display = 'flex';
}

// Function to confirm deletion
function confirmDelete() {
    if (deleteIndex !== null) {
        passwords.splice(deleteIndex, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        renderPasswords();
        closeModal();
    }
}

// Function to close the modal
function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
    deleteIndex = null;
}

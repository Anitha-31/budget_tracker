document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const profileDiv = document.getElementById('profile');
    const updateProfileForm = document.getElementById('updateProfileForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const data = await apiRequest('/auth/register', 'POST', { username, email, password });
                alert(data.message);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const data = await apiRequest('/auth/login', 'POST', { email, password });
                localStorage.setItem('token', data.token);
                alert(data.message);
                window.location.href= "profile.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            localStorage.removeItem('token');
            alert('Logged out successfully');
        });
    }

    if (profileDiv) {
        (async () => {
            try {
                const user = await apiRequest('/auth/profile');
                profileDiv.innerHTML = `
                <p><img src="${user.profile_pic}" alt="Profile Picture" width="100"></p>
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                `;
            } catch (error) {
                alert(error.message);
            }
        })();
    }

    if (updateProfileForm) {
        (async () => {
            try {
                // Populate form with current user data
                const user = await apiRequest('/auth/profile');
                updateProfileForm.username.value = user.username;
                updateProfileForm.profilePic.value = user.profile_pic || '';

                // Handle form submission
                updateProfileForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const username = e.target.username.value;
                    const profilePic = e.target.profilePic.value;

                    try {
                        const data = await apiRequest('/auth/profile', 'PUT', { username, profilePic });
                        alert(data.message);
                    } catch (error) {
                        alert(error.message);
                    }
                });
            } catch (error) {
                alert(error.message);
            }
        })();
    }
});

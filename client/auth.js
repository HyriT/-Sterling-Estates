document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:5000";
  const LOGIN_URL = `${BASE_URL}/api/auth/signin`;
  const REGISTER_URL = `${BASE_URL}/api/auth/signup`;
  const FORGOT_URL = `${BASE_URL}/api/auth/forgot-password`;

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  const forgotLink = document.getElementById("forgot-password");
  const forgotModal = document.getElementById("forgot-modal");
  const forgotClose = document.getElementById("forgot-close");
  const forgotSubmit = document.getElementById("forgot-submit");
  const forgotEmail = document.getElementById("forgot-email");
  const forgotError = document.getElementById("forgot-error");

  // Toggle forms
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");
    clearErrorMessages();
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
    clearErrorMessages();
  });

  function clearErrorMessages() {
    document.querySelectorAll(".error-msg").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
  }

  function showError(form, message) {
    const errorEl = form.querySelector(".error-msg");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
  }

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrorMessages();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      return showError(loginForm, "Email and password are required");
    }

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

localStorage.setItem("user", JSON.stringify({ token: data.token, user: data.user }));
      window.location.href = "home.html";
    } catch (err) {
      showError(loginForm, err.message);
    }
  });

  // Register
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrorMessages();

    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirm = document.getElementById("register-password-confirm").value;

    if (!username || !email || !password || !confirm) {
      return showError(registerForm, "All fields are required");
    }

    if (password !== confirm) {
      return showError(registerForm, "Passwords do not match");
    }

    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Registration successful! Please log in.");
      showLogin.click();
    } catch (err) {
      showError(registerForm, err.message);
    }
  });

  // Forgot password modal
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotModal.classList.remove("hidden");
    forgotError.style.display = "none";
    forgotEmail.value = "";
  });

  forgotClose.addEventListener("click", () => {
    forgotModal.classList.add("hidden");
  });

  forgotSubmit.addEventListener("click", async () => {
    const email = forgotEmail.value.trim();

    if (!email) {
      forgotError.textContent = "Please enter your email";
      forgotError.style.display = "block";
      return;
    }

    try {
      const res = await fetch(FORGOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send reset link");

      alert("Reset password link has been sent to your email.");
      forgotModal.classList.add("hidden");
    } catch (err) {
      forgotError.textContent = err.message;
      forgotError.style.display = "block";
    }
  });
});

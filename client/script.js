document.addEventListener("DOMContentLoaded", () => {
  // Session Management
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("login-nav")?.classList.add("hidden");
    document.getElementById("profile-menu")?.classList.remove("hidden");
  }

  // Appraisal Form Submission
  const appraisalForm = document.getElementById("appraisal-form");
  if (appraisalForm) {
    const showMessage = (msg, isError = false) => {
      const msgBox = document.createElement("div");
      msgBox.textContent = msg;
      msgBox.style = `
        background: ${isError ? '#e74c3c' : '#2ecc71'};
        color: white;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        font-weight: 500;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        max-width: 300px;
        position: relative;
      `;
      appraisalForm.appendChild(msgBox);
      setTimeout(() => msgBox.remove(), 4000);
    };

    appraisalForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const emailInput = appraisalForm.querySelector('input[type="email"]');
const mobileInput = appraisalForm.querySelector('input[name="mobile"]');
const mobile = mobileInput.value.trim();    
  const submitBtn = appraisalForm.querySelector('button[type="submit"]');

      const email = emailInput.value.trim();

      // Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-]{8,}$/;

      if (!email || !mobile) {
        showMessage("Please fill in all fields.", true);
        return;
      }

      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", true);
        return;
      }

      if (!phoneRegex.test(mobile)) {
        showMessage("Please enter a valid mobile number.", true);
        return;
      }
console.log("Email:", email);
console.log("Mobile:", mobile);

      // Show confirmation (optional)
      showMessage(`Submitting your request...`);

      // Disable button while sending
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const response = await fetch("http://localhost:5000/api/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mobile }),
        });

        if (response.ok) {
          showMessage(" Appraisal request submitted!");
          appraisalForm.reset();
        } else {
          const error = await response.json();
          showMessage(` ${error.message || "Submission failed."}`, true);
        }
      } catch (err) {
        console.error("Submission error:", err);
        showMessage("Network error. Please try again.", true);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Get Free Appraisal";
      }
    });
  }


});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("team-carousel");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: 300, behavior: "smooth" });
    });

    function updateArrowVisibility() {
      leftArrow.style.display = carousel.scrollLeft <= 0 ? 'none' : 'block';
      rightArrow.style.display = (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) ? 'none' : 'block';
    }

    carousel.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    updateArrowVisibility();
  }

  // Controll login
  const user = JSON.parse(localStorage.getItem("user"));
  const profileMenu = document.getElementById("profile-menu");
  const loginBtn = document.querySelector(".nav-btn");

  if (profileMenu && loginBtn) {
    if (user && user.email) {
      profileMenu.classList.remove("hidden");
      loginBtn.classList.add("hidden");
    } else {
      profileMenu.classList.add("hidden");
      loginBtn.classList.remove("hidden");
    }
  }
});

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-menu");
  if (dropdown) dropdown.classList.toggle("hidden");
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.reload();
}

window.toggleDropdown = toggleDropdown;
window.logout = logout;

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const profileMenu = document.getElementById("profile-menu");
  const loginBtn = document.querySelector(".nav-btn");
  const protectedLinks = document.querySelectorAll(".protected-link");

  if (profileMenu && loginBtn) {
    if (user && user.email) {
      profileMenu.classList.remove("hidden");
      loginBtn.classList.add("hidden");
      protectedLinks.forEach(link => link.classList.remove("hidden"));
    } else {
      profileMenu.classList.add("hidden");
      loginBtn.classList.remove("hidden");
      protectedLinks.forEach(link => link.classList.add("hidden"));
    }
  }
});

window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.scrollY > 50) { 
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

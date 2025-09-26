document.addEventListener("DOMContentLoaded", () => {

  // Merr të dhënat e përdoruesit nga localStorage
  const storedData = JSON.parse(localStorage.getItem("user"));
  const user = storedData?.user;
  const token = storedData?.token;

  const profileMenu = document.getElementById("profile-menu");
  const loginBtn = document.querySelector(".nav-btn"); 
  const loginLink = document.getElementById("login-link"); 
  const protectedLinks = document.querySelectorAll(".protected-link");

  // Kontrolli i login për shfaqjen e protected links
  if (user && token) {
    profileMenu?.classList.remove("hidden");
    loginBtn?.classList.add("hidden");
    loginLink?.classList.add("hidden");
    protectedLinks.forEach(link => link.classList.remove("hidden"));
  } else {
    profileMenu?.classList.add("hidden");
    loginBtn?.classList.remove("hidden");
    loginLink?.classList.remove("hidden");
    protectedLinks.forEach(link => link.classList.add("hidden"));
  }

  // Appraisal Form
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
      `;
      appraisalForm.appendChild(msgBox);
      setTimeout(() => msgBox.remove(), 4000);
    };

    appraisalForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = appraisalForm.querySelector('input[type="email"]').value.trim();
      const mobile = appraisalForm.querySelector('input[name="mobile"]').value.trim();
      const submitBtn = appraisalForm.querySelector('button[type="submit"]');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-]{8,}$/;

      if (!email || !mobile) return showMessage("Please fill in all fields.", true);
      if (!emailRegex.test(email)) return showMessage("Invalid email address.", true);
      if (!phoneRegex.test(mobile)) return showMessage("Invalid mobile number.", true);

      showMessage("Submitting your request...");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const res = await fetch("http://localhost:5000/api/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mobile }),
        });

        if (res.ok) {
          showMessage("Appraisal request submitted!");
          appraisalForm.reset();
        } else {
          const err = await res.json();
          showMessage(err.message || "Submission failed.", true);
        }
      } catch (err) {
        console.error(err);
        showMessage("Network error. Please try again.", true);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Get Free Appraisal";
      }
    });
  }

  // Carousel i ekipit
  const carousel = document.getElementById("team-carousel");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener("click", () => carousel.scrollBy({ left: -300, behavior: "smooth" }));
    rightArrow.addEventListener("click", () => carousel.scrollBy({ left: 300, behavior: "smooth" }));

    function updateArrows() {
      leftArrow.style.display = carousel.scrollLeft <= 0 ? "none" : "block";
      rightArrow.style.display = (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) ? "none" : "block";
    }

    carousel.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  // Animacion i property rows
  const propertyRows = document.querySelectorAll(".property-row");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  propertyRows.forEach(row => observer.observe(row));
});

// Dropdown toggle
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-menu");
  dropdown?.classList.toggle("hidden");
}

// Logout funksioni
function logout() {
  localStorage.removeItem("user");
  window.location.href = "auth.html"; 
}

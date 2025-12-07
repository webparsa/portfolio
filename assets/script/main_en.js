const words = [
  "Front-end Developer",
  "HTML/CSS Specialist",
  "Responsive Layout Expert",
  "Sass & Scalable CSS Engineer",
  "SEO-aware Frontend",
  "Web Performance Engineer",
];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed");

function type() {
  const currentWord = words[index];
  let displayedText = currentWord.substring(0, charIndex);
  typedEl.textContent = displayedText;

  if (!isDeleting) {
    if (charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, 70);
    } else {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1800);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 40);
    } else {
      isDeleting = false;
      index = (index + 1) % words.length;
      setTimeout(type, 300);
    }
  }
}
type();








//todo Form Submission

const form = document.getElementById("enquery-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Trimis cu succes",
          html: `
          <p><strong>Name:</strong> ${formData.get("name")}</p>
          <p><strong>Phone:</strong> ${formData.get("phone")}</p>
          <p><strong>Email:</strong> ${formData.get("email")}</p>
          <p><strong>Service:</strong> ${formData.get("service")}</p>
          <p><strong>Message:</strong> ${formData.get("message")}</p>
        `,
        });
        form.reset();
      } else {
        throw new Error("Form submission error");
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Something went wrong, please try again.",
      });
    });
});

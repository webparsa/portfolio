const words = [
  "توسعه‌دهنده فرانت‌اند",
  "متخصص HTML/CSS",
  "کارشناس لایه‌بندی واکنش‌گرا",
  "مهندس SASS و CSS مقیاس‌پذیر",
  "بهینه‌ساز سرعت سایت",
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
      setTimeout(type, 60);
    } else {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1800);
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 30);
    } else {
      isDeleting = false;
      index = (index + 1) % words.length;
      setTimeout(type, 300);
    }
  }
}
type();



//todo Form Submission

const form = document.getElementById('enquery-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'ارسال موفق',
        html: `
          <p><strong>نام:</strong> ${formData.get('name')}</p>
          <p><strong>شماره:</strong> ${formData.get('phone')}</p>
          <p><strong>ایمیل:</strong> ${formData.get('email')}</p>
          <p><strong>حوزه:</strong> ${formData.get('service')}</p>
          <p><strong>پیام:</strong> ${formData.get('message')}</p>
        `
      });
      form.reset();
    } else {
      throw new Error('Form submission error');
    }
  })
  .catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'خطا',
      text: 'مشکلی پیش آمد، دوباره تلاش کنید.'
    });
  });
});

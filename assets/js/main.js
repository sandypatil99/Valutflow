const backtoTop = document.getElementById("backtoTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backtoTop.classList.remove("d-none");
  } else {
    backtoTop.classList.add("d-none");
  }
});

backtoTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});




(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated') //bootstrap validation style
    }, false)
  })
})()

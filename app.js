const scriptURL = 'https://script.google.com/macros/s/AKfycbwXdIzNRvFH9xZa7ghuL2dWA_F41yekWp9LGd04xpFmMgNisAnGWtlDWW3k6vmvNT0/exec';
const form = document.getElementById('registroForm');
const btnSubmit = document.getElementById('submitBtn');
const btnText = btnSubmit.querySelector('.btn-text');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', e => {
  e.preventDefault(); // Evita que la página se recargue

  // 1. Mostrar estado de carga en el botón
  const originalText = btnText.innerText;
  btnText.innerText = 'Enviando...';
  btnSubmit.disabled = true;
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  // 2. Recopilar datos del formulario (usa el atributo "name" de HTML)
  const formData = new FormData(form);

  // 3. Enviar hacia Google Sheets
  fetch(scriptURL, { 
    method: 'POST', 
    body: formData, 
    mode: 'no-cors' // Importante para evitar bloqueos por políticas CORS de Google
  })
    .then(response => {
      // Como usamos "no-cors", la respuesta es opaca, pero significa éxito si entra aquí.
      successMsg.style.display = 'block';
      form.reset(); // Vaciamos el formulario para uno nuevo
    })
    .catch(error => {
      console.error('Error al enviar:', error.message);
      errorMsg.style.display = 'block';
    })
    .finally(() => {
      // 4. Restaurar el botón sin importar el resultado
      btnText.innerText = originalText;
      btnSubmit.disabled = false;
    });
});

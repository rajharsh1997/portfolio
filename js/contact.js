/**
 * contact.js — Contact form "Try it out" simulation with EmailJS integration
 */
(function () {
  'use strict';



  let isFormActive = false;

  function init() {
    const tryBtn = document.getElementById('tryBtn');
    const form = document.getElementById('contactForm');
    const executeBtn = document.getElementById('executeBtn');
    const responsePanel = document.getElementById('responsePanel');
    const spinner = document.getElementById('spinner');
    const curlBlock = document.getElementById('curlBlock');
    const responseBody = document.getElementById('responseBody');

    if (!tryBtn || !form) return;

    // Toggle "Try it out" mode
    tryBtn.addEventListener('click', function () {
      isFormActive = !isFormActive;
      form.classList.toggle('is-active', isFormActive);
      tryBtn.classList.toggle('active', isFormActive);
      tryBtn.textContent = isFormActive ? 'Cancel' : 'Try it out';
      responsePanel.classList.remove('is-visible');
    });

    // Execute button
    executeBtn.addEventListener('click', async function () {
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !subject || !message) {
        alert('All fields are required.');
        return;
      }

      // Show spinner, disable button
      spinner.classList.add('is-spinning');
      executeBtn.disabled = true;

      // Build curl command display
      curlBlock.textContent =
        `curl -X POST https://harsh.dev/api/contact \\\n` +
        `  -H "Content-Type: application/json" \\\n` +
        `  -d '{\n` +
        `    "name": "${name}",\n` +
        `    "email": "${email}",\n` +
        `    "subject": "${subject}",\n` +
        `    "message": "${message}"\n` +
        `  }'`;

      // Try to send via FormSubmit.co
      try {
        const response = await fetch("https://formsubmit.co/ajax/rajharsh1997@gmail.com", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _captcha: "false" // Disable recaptcha for seamless API feel
          })
        });

        if (response.ok) {
          responseBody.innerHTML = formatJson({
            status: 200,
            message: "Message sent successfully!",
            data: { name, email, subject }
          });
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        responseBody.innerHTML = formatJson({
          status: 500,
          error: "Failed to send message. Please try again later.",
          details: err.message
        });
      } finally {
        responsePanel.classList.add('is-visible');
        spinner.classList.remove('is-spinning');
        executeBtn.disabled = false;
      }
    });
  }

  function formatJson(obj) {
    const json = JSON.stringify(obj, null, 2);
    return syntaxHighlight(json);
  }

  function syntaxHighlight(json) {
    return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/: (null)/g, ': <span class="json-null">$1</span>');
  }

  // Expose
  window.Contact = { init };
})();
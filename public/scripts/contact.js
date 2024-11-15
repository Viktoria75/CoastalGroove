window.addEventListener('load', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            const result = await response.json();

            if (result.success) {
                alert('Form Submitted!');
                form.reset(); //clear form fields
            } else {
                alert('Form submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Internal Server Error. Please try again.');
        }
    });
});
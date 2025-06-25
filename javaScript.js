
  const scrollSections = document.querySelectorAll('.scrollable');
 const scrollAmount = 450;
  
  scrollSections.forEach(wrapper => {
    const scrollContent = wrapper.querySelector('.scroll-content');
    const items = Array.from(scrollContent.querySelectorAll('.item'));
    const itemCount = items.length;

    const clonesBefore = items.slice(-2).map(item => item.cloneNode(true));
    const clonesAfter = items.slice(0, 2).map(item => item.cloneNode(true));

     clonesBefore.forEach(clone => scrollContent.prepend(clone));
    clonesAfter.forEach(clone => scrollContent.append(clone));

     setTimeout(() => {
      scrollContent.scrollLeft = scrollAmount * 2;
    }, 0);
  

    const leftBtn = wrapper.querySelector('.scroll-btn.left');
    const rightBtn = wrapper.querySelector('.scroll-btn.right');

    leftBtn.addEventListener('click', () => {
      scrollContent.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      scrollContent.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Loop detection on scroll end
    scrollContent.addEventListener('scroll', () => {
      const maxScroll = scrollContent.scrollWidth - scrollContent.clientWidth;

      if (scrollContent.scrollLeft <= 0) {
        scrollContent.scrollLeft = scrollContent.scrollWidth - (scrollAmount * itemCount + scrollAmount * 2);
      }

      if (scrollContent.scrollLeft >= maxScroll) {
        scrollContent.scrollLeft = scrollAmount * 2;
      }
    });
  });


    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const spinner = document.getElementById('spinner');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      submitBtn.disabled = true;
      spinner.style.display = 'inline-block';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        if (response.ok) {
          spinner.style.display = 'none';
          successMessage.textContent = 'Thank you! Your form was submitted successfully.';
          successMessage.style.display = 'block';
          form.reset();
          setTimeout(() => {
            successMessage.innerHTML = '<a href="#" id="submit-another">Submit another form</a>';
            document.getElementById('submit-another').onclick = ev => {
              ev.preventDefault();
              successMessage.style.display = 'none';
              form.querySelector('input[name="name"]').focus();
            };
          }, 3000);
        } else {
          alert('Oops! There was a problem submitting your form.');
        }
      } catch {
        alert('Oops! There was a problem submitting your form.');
      } finally {
        spinner.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
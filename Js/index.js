
  function handleCalendlyClick(event) {
    const isMobile = window.matchMedia('(max-width: 720px)').matches;

    if (isMobile) {
      // No mobile, deixa o link normal abrir o Calendly em nova aba
      return true;
    }

    // No desktop, abre o popup
    event.preventDefault();
    Calendly.initPopupWidget({ url: 'https://calendly.com/singularagen' });
    return false;
  }
ScrollReveal().reveal('.header', {
        origin: 'top',
        duration: 3000,
        distance: '30%'
    });

ScrollReveal().reveal('.container', {
        origin: 'left',
        duration: 3000,
        distance: '30%'
    });
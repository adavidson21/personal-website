if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover)').matches) {

    // 3D Tilt Effect and Glare for Project Cards
    document.querySelectorAll('.tilt-card').forEach(card => {
      const glare = card.querySelector('.glare');
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation limits (up to 6 degrees of rotation)
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Move glare effect with mouse
        if (glare) {
          glare.style.opacity = '1';
          const glareWidth = rect.width * 2;
          const glareHeight = rect.height * 2;
          glare.style.transform = `translate(${x - glareWidth / 2}px, ${y - glareHeight / 2}px)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset card to default state
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        if (glare) {
          glare.style.opacity = '0';
        }
      });
    });
  }

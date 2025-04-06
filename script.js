document.addEventListener('DOMContentLoaded', function() {
    // Show welcome popup when page loads
    const welcomePopup = document.getElementById('welcomePopup');
    welcomePopup.style.display = 'block';
  
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
  
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });
  
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('popup')) {
        e.target.style.display = 'none';
      }
    });
  
    // Welcome popup buttons
    document.querySelectorAll('.immediate-btn, .sometime-btn, .register-btn').forEach(button => {
      button.addEventListener('click', function() {
        welcomePopup.style.display = 'none';
        document.getElementById('registerPopup').style.display = 'block';
      });
    });
  
    // Form submission to Telegram
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('preregisterName').value;
      const email = document.getElementById('preregisterEmail').value;
      const phone = document.getElementById('preregisterContact').value;
      
      const token = "8088537033:AAGIqRpd62gKZeoQEVSHasHMtNChzX0ZgJo";
      const chatId = "1560320348";
      const message = `📝 *NEW REGISTRATION*\n\n👤 NAME: ${name}\n📧 EMAIL: ${email}\n📱 PHONE: ${phone}`;
      
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      })
      .then(response => {
        if (response.ok) {
          document.getElementById('registerPopup').style.display = 'none';
          document.getElementById('successPopup').style.display = 'block';
          this.reset();
        } else {
          alert("FAILED TO SUBMIT. PLEASE TRY AGAIN.");
        }
      })
      .catch(error => {
        alert("ERROR: " + error);
      });
    });
  
    // Close success popup
    document.querySelector('.close-btn').addEventListener('click', function() {
      document.getElementById('successPopup').style.display = 'none';
    });
  });
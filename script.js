$(document).ready(function() {
  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  $(".header ul li a").click(function(e) {
    e.preventDefault(); 

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return; 
    }

    var offset = target === "#home" ? 0 : $(target).offset().top - 40; 

    $("html, body").animate(
      {
        scrollTop: offset
      },
      500
    );

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Contact form to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzEMBkODc-qc4ZbcGLOrxFEFZ8Bd58AkHm6-NxvnIm7pyttajdTG_f0JcNaU14e5BBagw/exec'; // Replace with your Google Apps Script URL
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    fetch(scriptURL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.text())
    .then(text => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch(error => {
      console.error('Error!', error.message);
      msg.innerHTML = "Error sending message.";
    });
  });

  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
});

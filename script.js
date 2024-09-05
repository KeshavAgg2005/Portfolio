// $(document).ready(function() {

//   //sticky header
//     $(window).scroll(function() {
//       if ($(this).scrollTop() > 1) {
//         $(".header-area").addClass("sticky");
//       } else {
//         $(".header-area").removeClass("sticky");
//       }
  
//       // Update the active section in the header
//       updateActiveSection();
//     });
  
//     $(".header ul li a").click(function(e) {
//       e.preventDefault(); 
  
//       var target = $(this).attr("href");
  
//       if ($(target).hasClass("active-section")) {
//         return; 
//       }
  
//       if (target === "#home") {
//         $("html, body").animate(
//           {
//             scrollTop: 0 
//           },
//           500
//         );
//       } else {
//         var offset = $(target).offset().top - 40; 
  
//         $("html, body").animate(
//           {
//             scrollTop: offset
//           },
//           500
//         );
//       }
  
//       $(".header ul li a").removeClass("active");
//       $(this).addClass("active");
//     });
  

//     //Initial content revealing js
//     ScrollReveal({
//       distance: "100px",
//       duration: 2000,
//       delay: 200
//     });
  
//     ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
//       origin: "left"
//     });
//     ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
//       origin: "right"
//     });
//     ScrollReveal().reveal(".project-title, .contact-title", {
//       origin: "top"
//     });
//     ScrollReveal().reveal(".projects, .contact", {
//       origin: "bottom"
//     });

//   //contact form to excel sheet
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
//   const form = document.forms['submitToGoogleSheet']
//   const msg = document.getElementById("msg")

//   form.addEventListener('submit', e => {
//       e.preventDefault()
//       fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//           .then(response => {
//               msg.innerHTML = "Message sent successfully"
//               setTimeout(function () {
//                   msg.innerHTML = ""
//               }, 5000)
//               form.reset()
//           })
//           .catch(error => console.error('Error!', error.message))
//   })
    
//   });
  
//   function updateActiveSection() {
//     var scrollPosition = $(window).scrollTop();
  
//     // Checking if scroll position is at the top of the page
//     if (scrollPosition === 0) {
//       $(".header ul li a").removeClass("active");
//       $(".header ul li a[href='#home']").addClass("active");
//       return;
//     }
  
//     // Iterate through each section and update the active class in the header
//     $("section").each(function() {
//       var target = $(this).attr("id");
//       var offset = $(this).offset().top;
//       var height = $(this).outerHeight();
  
//       if (
//         scrollPosition >= offset - 40 &&
//         scrollPosition < offset + height - 40
//       ) {
//         $(".header ul li a").removeClass("active");
//         $(".header ul li a[href='#" + target + "']").addClass("active");
//       }
//     });
//   }


$(document).ready(function() {

  // Sticky header functionality
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Smooth scrolling for navigation links
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

  // Initial content revealing
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

  // Update the active section in the header
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

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

  // Sidebar functionality
  function openNav() {
    document.getElementById("sidebar").style.width = "250px"; // Adjust width as needed
    document.getElementById("main").style.marginLeft = "250px"; // Adjust width as needed
  }

  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // Smooth scrolling behavior for mobile sidebar links
  document.querySelectorAll('#sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1); // Remove the "#" from the href
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
      
      closeNav(); // Close the sidebar after clicking a link
    });
  });
});

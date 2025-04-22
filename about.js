document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

function dark() {
    const body = document.body;
    const button = document.querySelector('#button1');
    const links = document.querySelectorAll('a');
 
    if (body.style.backgroundColor === 'black') {
     // Switch to light mode
     body.style.backgroundColor = 'rgb(255, 255, 255)';
     body.style.color = 'black';
     headerImage.src = 'header.png';
     button.textContent = 'dark mode'; // Update button text
 
     links.forEach(link => {
         link.style.color = ''; // Reset to default (or initial CSS)
     });
 
     } else {
 
     headerImage.src = 'header white.png';
     body.style.backgroundColor = 'black';
     body.style.color = 'white';
     button.textContent = 'light mode';
 
     links.forEach(link => {
         link.style.color = 'rgb(249, 240, 158)'; // Set dark mode link color
     });
     }
 }
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

function dark() {
    const body = document.body;
    const button = document.querySelector('#button1');
    const headerImage = document.getElementById('headerImage');
    const workImage = document.getElementById('workImage');
    const links = document.querySelectorAll('a');
 
    if (body.style.backgroundColor === 'black') {
     // Switch to light mode
     body.style.backgroundColor = 'white';
     body.style.color = 'black';
     headerImage.src = 'header.png'; // Replace with your light mode header image path
     workImage.src = 'work.png';
     button.textContent = 'dark mode'; // Update button text
 
     links.forEach(link => {
         link.style.color = ''; // Reset to default (or initial CSS)
     });
 
     } else {
 
     body.style.backgroundColor = 'black';
     body.style.color = 'white';
     headerImage.src = 'header white.png'
     button.textContent = 'light mode';
     workImage.src = 'work-white.png';
 
     links.forEach(link => {
         link.style.color = 'rgb(249, 240, 158)'; // Set dark mode link color
     });
     }
 }





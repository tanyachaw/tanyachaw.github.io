document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

function dark() {
    const body = document.body;
    const button = document.querySelector('#button1');
    const headerImage = document.getElementById('headerImage');
    const links = document.querySelectorAll('a');
    const writingImage = document.getElementById('writingImage');
 
    if (body.style.backgroundColor === 'black') {
     // Switch to light mode
     body.style.backgroundColor = 'white';
     body.style.color = 'black';
     headerImage.src = 'header.png'; // Replace with your light mode header image path
     writingImage.src = 'writing.png';
     button.textContent = 'dark mode'; // Update button text
 
     links.forEach(link => {
         link.style.color = ''; // Reset to default (or initial CSS)
     });
 
     } else {
 
     body.style.backgroundColor = 'black';
     body.style.color = 'white';
     headerImage.src = 'header white.png'
     button.textContent = 'light mode';
     writingImage.src = 'writing-white.png';
 
     links.forEach(link => {
         link.style.color = 'rgb(249, 240, 158)'; // Set dark mode link color
     });
     }
 }
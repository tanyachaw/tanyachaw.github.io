document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
});

function dark() {
    const body = document.body;
    const button = document.querySelector('#button1');
    const headerImage = document.getElementById('headerImage');
    const writingImage = document.getElementById('writingImage');
    const links = document.querySelectorAll('a');
    document.body.classList.toggle('dark-mode');

    if (body.style.backgroundColor === 'black') {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        button.textContent = 'dark mode';

        if (headerImage) {
            headerImage.src = 'header.png';
        }

        if (writingImage) {
            writingImage.src = 'notes_transparent.png';
        }

        links.forEach(link => {
            link.style.color = '';
        });

    } else {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        button.textContent = 'light mode';

        if (headerImage) {
            headerImage.src = 'header white.png';
        }

        if (writingImage) {
            writingImage.src = 'notes_white_transparent.png';
        }

        links.forEach(link => {
            link.style.color = 'rgb(249, 240, 158)';
        });
    }
}
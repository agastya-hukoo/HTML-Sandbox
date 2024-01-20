window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var header = document.querySelector("header");
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.style.backgroundColor = "#000";
    } else {
        header.style.backgroundColor = "transparent";
    }
}

const typingText = "Your Name";
const typingElement = document.getElementById('typing');
let idx = 0;

function typeWriter() {
    if (idx < typingText.length) {
        typingElement.innerHTML += typingText.charAt(idx);
        idx++;
        setTimeout(typeWriter, 150); // Adjust speed here
    } else {
        typingElement.innerHTML = typingText;
        typingElement.classList.add('typing-cursor');
    }
}

// Start the typing effect on load
window.onload = typeWriter;

function typeWriter(element, text, speed) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

window.onload = function() {
    const typingElement = document.getElementById('typing');
    if (typingElement) {
        typeWriter(typingElement, "Your Name", 150);
    }
};

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

document.addEventListener('scroll', function() {
    const secondSection = document.getElementById('second-section');
    if (isInViewport(secondSection)) {
        secondSection.classList.add('visible');
    }
});

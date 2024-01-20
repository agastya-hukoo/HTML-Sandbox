window.onload = function() {
    // Typing effect
    const typingText = "Your Name";
    const typingElement = document.getElementById('typing');
    let idx = 0;

    function typeWriter() {
        if (idx < typingText.length) {
            typingElement.innerHTML += typingText.charAt(idx);
            idx++;
            setTimeout(typeWriter, 150); // Adjust speed here
        } else {
            typingElement.classList.add('typing-cursor');
        }
    }

    if (typingElement) {
        typeWriter();
    }

    // Header background change on scroll
    function scrollFunction() {
        var header = document.querySelector("header");
        if (header) {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                header.style.backgroundColor = "#000";
            } else {
                header.style.backgroundColor = "transparent";
            }
        }
    }

    // Attach scroll event to window
    window.onscroll = scrollFunction;
};

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Event listener for scroll to check each section
document.addEventListener('scroll', function () {
    document.querySelectorAll('section').forEach(section => {
        if (isInViewport(section)) {
            section.style.visibility = 'visible';
        }
    });
});

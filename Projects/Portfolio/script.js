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

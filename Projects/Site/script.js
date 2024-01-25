window.addEventListener("scroll", () => {
    let sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        let sectionTop = section.getBoundingClientRect().top;
        let sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            section.style.opacity = 1;
        } else {
            section.style.opacity = 0;
        }
    });
});

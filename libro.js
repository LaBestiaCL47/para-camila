const pages = document.querySelectorAll(".page");
const next = document.getElementById("next");

let currentPage = 0;
let startX = 0;

function showPage(direction = 1) {
    pages.forEach((page, index) => {
        page.classList.remove("active", "slide-left", "slide-right");

        if (index === currentPage) {
            page.classList.add("active");

            if (direction === 1) {
                page.classList.add("slide-left");
            } else {
                page.classList.add("slide-right");
            }
        }
    });

    next.textContent =
        currentPage === pages.length - 1 ? "❤️" : "›";
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(1);
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(-1);
    }
}

next.addEventListener("click", nextPage);

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const difference = startX - endX;

    if (Math.abs(difference) > 50) {
        if (difference > 0) {
            nextPage();
        } else {
            previousPage();
        }
    }
});

showPage();
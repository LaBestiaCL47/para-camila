const text = document.getElementById("text");
const button = document.getElementById("openButton");
const music = document.getElementById("music");
const touchMessage = document.getElementById("touchMessage");

const intro = document.getElementById("intro");
const bookPage = document.getElementById("bookPage");

let musicStarted = false;

function startMusic() {

    if (!musicStarted) {
        musicStarted = true;

        music.volume = 0.7;

        music.play().catch(() => {});

        touchMessage.classList.add("hide");
    }
}

let started = false;

function startExperience() {

    if (started) return;

    started = true;

    music.volume = 0.7;

    music.play().catch(() => {});

    touchMessage.classList.add("hide");

    setTimeout(() => {
        typeMessage();
    }, 700);
}

document.addEventListener("click", startExperience, { once: true });
document.addEventListener("touchstart", startExperience, { once: true });


const messages = [
    "Hay personas que llegan a tu vida…",
    "…y otras que se convierten en tu vida.",
    "Esta carta es para la segunda."
];

let messageIndex = 0;
let characterIndex = 0;

function typeMessage() {

    if (characterIndex < messages[messageIndex].length) {

        text.textContent += messages[messageIndex][characterIndex];

        characterIndex++;

        setTimeout(typeMessage, 65);

    } else {

        messageIndex++;

        if (messageIndex < messages.length) {

            setTimeout(() => {

                text.textContent = "";
                characterIndex = 0;

                typeMessage();

            }, 2000);

        } else {

            setTimeout(() => {

                button.classList.add("show");

            }, 2000);
        }
    }
}



/* ABRIR EL LIBRO */

button.addEventListener("click", () => {

    intro.classList.add("hideIntro");

    setTimeout(() => {

        intro.style.display = "none";
        bookPage.classList.add("showBook");

        setTimeout(() => {

            const cover = document.getElementById("cover");

            cover.classList.add("open");

            setTimeout(() => {
                showPage();
            }, 1800);

        }, 500);

    }, 1500);

});


/* PÁGINAS */

const pages = document.querySelectorAll(".page");
const next = document.getElementById("next");

let currentPage = 0;
let startX = 0;

function updatePages() {

    pages.forEach((page, index) => {

        page.classList.remove("turned");

        if (index < currentPage) {
            page.classList.add("turned");
        }

    });

    next.textContent =
        currentPage === pages.length - 1 ? "❤️" : "›";
}

function nextPage() {

    if (currentPage < pages.length - 1) {

        pages[currentPage].classList.add("turned");

        currentPage++;

        updatePages();

    } else {

        openEnding();

    }
}

function previousPage() {

    if (currentPage > 0) {

        currentPage--;

        pages[currentPage].classList.remove("turned");

        updatePages();
    }
}

function openEnding() {

    const ending = document.getElementById("ending");

    ending.classList.add("show-ending");
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
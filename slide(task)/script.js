const images = [
    "images/images1.jpg",
    "images/images2.jpg",
    "images/images3.jpg",
    "images/images4.jpg"
];

let currentIndex = 0;
let intervalId;
const sliderImage = document.getElementById("sliderImage");
const dotscontainer = document.getElementById("dotscontainer");

images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => {
        currentIndex = i;
        showImage(currentIndex);
        resetInterval();
    });
    dotscontainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showImage(index) {
    sliderImage.style.opacity = 0;
    setTimeout(() => {
        sliderImage.src = images[index];
        sliderImage.style.opacity = 1;
        updateDots();
    },200);
}

function updateDots() {
    dots.forEach((dot, i) =>{
        dot.classList.toogle("active", i=== currentIndex);
});
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex -1 + images.length) % images.length;
    showImage(currentIndex);
}

function startSlider() {
    intervalId = setInterval(nextImage, 2000);
}

function pauseSlider() {
    clearInterval(intervalId);
}

function resumeSlider() {
    startSlider();
}

function resetInterval() {
    pauseSlider();
    resumeSlider();
}

window.onload = () => {
    showImage(currentIndex);
    startSlider();
};

// // // //
// Selecting elements
// // // //
const slideShowImages = document.querySelectorAll('.slideshow__image');
const slideshowContainer = document.querySelector('.slideshow__images');
const buttonLeft = document.querySelector('.slideshow__button-left');
const buttonRight = document.querySelector('.slideshow__button-right');
const buttonsBelow = document.querySelectorAll('.slideshow__button');
const imageDescription = document.querySelectorAll('.slideshow__text');
const imageDescriptionCopy = document.querySelector('.slideshow__text-copy');

// // // //
// Variables
// // // //
let currentIndex = 0;
const maxIndex = slideShowImages.length - 1;
const minIndex = 0;

// // // //
// Debouncer
// // // //
// https://www.youtube.com/watch?v=B1P3GFa7jVc
const debounce = (fn, delay) => {
	let timeOutId;

	return function(...args) {
		if(timeOutId) {
			clearTimeout(timeOutId);
		}

		timeOutId = setTimeout( () => {
			fn(...args);
		}, delay)
	}
}

// // // //
// Event Listeners
// // // //
buttonRight.addEventListener('click', handleButtonRightClick);
buttonLeft.addEventListener('click', handleButtonLeftClick);
window.addEventListener('keydown', handleWindowKeyDown);
slideshowContainer.addEventListener('scroll', debounce(handleSlideShowContainerScroll, 200));

function currentImageGivesCurrentIndex() {
	const currentImageIndex = Math.ceil(slideshowContainer.scrollLeft / slideshowContainer.offsetWidth);
	currentIndex = currentImageIndex;
}

for(let index = 0; index < slideShowImages.length; index += 1) {
	buttonsBelow[index].addEventListener('click', handleButtonsBelowClick);
}

// // // //
// Handlers
// // // //
function handleButtonRightClick() {
	increaseCurrentIndex();
}

function handleButtonLeftClick() {
	decreaseCurrentIndex();
}

function handleButtonsBelowClick(event) {
	goToSpecificImage(event)
}

function handleWindowKeyDown(event) {
	const key = event.key;

	if (key === 'ArrowRight') {
		increaseCurrentIndex();
	} else if (key === 'ArrowLeft') {
		decreaseCurrentIndex();
	}
}

function handleSlideShowContainerScroll() {
	currentImageGivesCurrentIndex();
	updateImageButtonsAndText();
}

// // // //
// Functions
// // // //
function displayImageTextToCopy() {
	imageDescriptionCopy.innerHTML = imageDescription[currentIndex].innerHTML;
}

function increaseCurrentIndex() {
	if (currentIndex < maxIndex) {
		currentIndex += 1;
		updateImageButtonsAndText();
	} 
}

function decreaseCurrentIndex() {
	if (currentIndex > minIndex) {
		currentIndex -= 1;
		updateImageButtonsAndText();
	}
}

function updateImageButtonsAndText() {
	slideToImage();
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

function goToSpecificImage(event) {
	indexOfButton = Number(event.currentTarget.dataset.index);
	currentIndex = indexOfButton;
	updateImageButtonsAndText();
}

function slideToImage() {
	slideShowImages[currentIndex].scrollIntoView({
		behavior: "smooth"
	});
}

function hideArrowsAtEnd() {
	if (currentIndex === minIndex) {
		buttonLeft.classList.add('slideshow__button--hidden');
	} else {
		buttonLeft.classList.remove('slideshow__button--hidden');
	}

	if (currentIndex === maxIndex) {
		buttonRight.classList.add('slideshow__button--hidden');
	}	else {
		buttonRight.classList.remove('slideshow__button--hidden');
	}
}

function giveButtonBelowActiveClass() {
	for(let index = 0; index < slideShowImages.length; index += 1) {
		buttonsBelow[index].classList.remove('slideshow__button--active');
	}

	buttonsBelow[currentIndex].classList.add('slideshow__button--active');
}

function giveButtonIndexInHtml() {
	for(let index = 0; index < slideShowImages.length; index += 1) {
		buttonsBelow[index].dataset.index = index;
	}

	buttonsBelow[currentIndex].classList.add('slideshow__button--active')
}

// // // //
// Called functions 
// // // //
hideArrowsAtEnd();
giveButtonIndexInHtml();
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
let disableScrollListenerFunction = false;

// // // //
// Event Listeners
// // // //
buttonRight.addEventListener('click', handleButtonRightClick);
buttonLeft.addEventListener('click', handleButtonLeftClick);
window.addEventListener('keydown', handleWindowKeyDown);
slideshowContainer.addEventListener('scroll', handleSlideShowContainerScroll);

for(let index = 0; index < slideShowImages.length; index += 1) {
	buttonsBelow[index].addEventListener('click', handleButtonsBelowClick);
}

// // // //
// Handlers
// // // //
function handleButtonRightClick() {
	disableScrollListenerFunction = true;
	increaseCurrentIndex();
	slideToImage();
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

function handleButtonLeftClick() {
	disableScrollListenerFunction = true;
	decreaseCurrentIndex();
	slideToImage();
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

function handleButtonsBelowClick(event) {
	disableScrollListenerFunction = true;
	goToSpecificImage(event);
	slideToImage();
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

function handleWindowKeyDown(event) {
	disableScrollListenerFunction = true;
	const key = event.key;

	if (key === 'ArrowRight') {
		increaseCurrentIndex();
	} else if (key === 'ArrowLeft') {
		decreaseCurrentIndex();
	}

	slideToImage();
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

function handleSlideShowContainerScroll() {
	if (disableScrollListenerFunction === false) {
		getCurrentIndexOfImage();
		giveButtonBelowActiveClass();
		hideArrowsAtEnd();
		displayImageTextToCopy();
	}

	disableScrollListenerFunction = false;
}

// // // //
// Functions
// // // //
function getCurrentIndexOfImage() {
	const currentImageIndex = Math.round(slideshowContainer.scrollLeft / slideshowContainer.offsetWidth);
	currentIndex = currentImageIndex;
}

function displayImageTextToCopy() {
	imageDescriptionCopy.innerHTML = imageDescription[currentIndex].innerHTML;
}

function increaseCurrentIndex() {
	if (currentIndex < maxIndex) {
		currentIndex += 1;
	} 
}

function decreaseCurrentIndex() {
	if (currentIndex > minIndex) {
		currentIndex -= 1;
	}
}

function goToSpecificImage(event) {
	indexOfButton = Number(event.currentTarget.dataset.index);
	currentIndex = indexOfButton;
}

function slideToImage() {
	slideshowContainer.scrollLeft = currentIndex * slideshowContainer.offsetWidth;
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
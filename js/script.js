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

for(let index = 0; index < slideShowImages.length; index += 1) {
	buttonsBelow[index].addEventListener('click', handleButtonsBelowClick);
}

// For Mouse
slideshowContainer.addEventListener('mouseenter', () => {
	slideshowContainer.addEventListener('scroll', debounce(handleSlideShowContainerScroll, 20));
})

slideshowContainer.addEventListener('mouseleave', () => {
	slideshowContainer.removeEventListener('scroll', debounce(handleSlideShowContainerScroll, 20));
})

// For Touch
slideshowContainer.addEventListener('touchstart', () => {
	slideshowContainer.addEventListener('scroll', debounce(handleSlideShowContainerScroll, 20));
})

slideshowContainer.addEventListener('touchend', () => {
	slideshowContainer.removeEventListener('scroll', debounce(handleSlideShowContainerScroll, 20));
})

// // // //
// Handlers
// // // //
function handleButtonRightClick() {
	increaseCurrentIndex();
	slideToImage();
	updateButtonsArrowsAndText();
}

function handleButtonLeftClick() {
	decreaseCurrentIndex();
	slideToImage();
	updateButtonsArrowsAndText();
}

function handleButtonsBelowClick(event) {
	goToSpecificImage(event);
	slideToImage();
	updateButtonsArrowsAndText();
}

function handleWindowKeyDown(event) {
	const key = event.key;

	if (key === 'ArrowRight') {
		increaseCurrentIndex();
		slideToImage();
		updateButtonsArrowsAndText();

	} else if (key === 'ArrowLeft') {
		decreaseCurrentIndex();
		slideToImage();
		updateButtonsArrowsAndText();
	}
}

function handleSlideShowContainerScroll() {
	getCIndexOfImage();
	updateButtonsArrowsAndText();
}

// // // //
// Functions
// // // //
function getCIndexOfImage() {
	const imageIndex = Math.round(slideshowContainer.scrollLeft / slideshowContainer.offsetWidth);
	currentIndex = imageIndex;
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

function updateButtonsArrowsAndText() {
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

// // // //
// Called functions 
// // // //
hideArrowsAtEnd();
giveButtonIndexInHtml();
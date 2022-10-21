// // // //
// Selecting elements
// // // //
const slideShowImages = document.querySelectorAll('.slideshow__image');
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
// Event Listeners
// // // //
buttonRight.addEventListener('click', handleButtonRightClick);
buttonLeft.addEventListener('click', handleButtonLeftClick);
window.addEventListener('keydown', handleWindowKeyDown);

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

// // // //
// Functions
// // // //
function displayImageTextToCopy() {
	imageDescriptionCopy.innerHTML = imageDescription[currentIndex].innerHTML;
	animateText();
}

function increaseCurrentIndex() {
	const oldIndex = currentIndex
	if (currentIndex < maxIndex) {
		currentIndex += 1;
		updateImageAndButtons(oldIndex);
	} 
}

function decreaseCurrentIndex() {
	const oldIndex = currentIndex
	if (currentIndex > minIndex) {
		currentIndex -= 1;
		updateImageAndButtons(oldIndex);
	}
}

function updateImageAndButtons(oldIndex) {
	showSlide(oldIndex);
	giveButtonBelowActiveClass();
	hideArrowsAtEnd();
	displayImageTextToCopy();
}

function goToSpecificImage(event) {
	const oldIndex = currentIndex;
	indexOfButton = Number(event.currentTarget.dataset.index);
	currentIndex = indexOfButton;
	updateImageAndButtons(oldIndex);
}

function showSlide(oldIndex) {
	for (let index = 0; index < slideShowImages.length; index += 1) {
		slideShowImages[index].classList.remove('slideshow__image--visible');
	}

	slideShowImages[currentIndex].classList.add('slideshow__image--visible');
}

function hideArrowsAtEnd() {
	if (currentIndex === minIndex) {
		buttonLeft.classList.add('slideshow__button--hidden');
	} else if (currentIndex === minIndex + 1){
		buttonLeft.classList.remove('slideshow__button--hidden');
	}

	if (currentIndex === maxIndex) {
		buttonRight.classList.add('slideshow__button--hidden');
	}	else if (currentIndex === maxIndex - 1){
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
// Functions For Animations
// // // //
function animateText() {
	imageDescriptionCopy.classList.remove('slide-text')
	const milliseconds = 1;

	setTimeout(addClassName, milliseconds)

	function addClassName() {
		imageDescriptionCopy.classList.add('slide-text')
	}
}
// // // //
// Called functions 
// // // //
hideArrowsAtEnd();
giveButtonIndexInHtml();
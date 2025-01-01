// make navbar well formatted
const navbarInteractions = (burgerIcon, navBar) => {
	const headerContainer = document.querySelector('#myTopnav');
	const linksFromNavBar = document.querySelectorAll('.main-navbar > a');

	const resizeHeader = () => {
		const windowWidth = window.innerWidth;
		const responsivBreakPoint = 1024;
		if (windowWidth > responsivBreakPoint) {
			navBar.style.marginTop = '0px';
		} else {
			navBar.style.marginTop = '55px';
		}
	};

	if (headerContainer.className === 'topnav') {
		headerContainer.className += ' responsive';
		headerContainer.appendChild(burgerIcon);
		navBar.style.marginTop = '55px';

		for (const link of linksFromNavBar) {
			link.style.border = '1px solid black';
			link.style.borderRadius = '16px';
		}

		burgerIcon.style.border = 'none';

		window.addEventListener('resize', resizeHeader);
	} else {
		headerContainer.className = 'topnav';
		navBar.style.marginTop = '0px';

		for (const link of linksFromNavBar) {
			link.style.border = 'none';
		}

		window.removeEventListener('resize', resizeHeader);
	}
};

// Show the modal and lock background
const launchModal = (leadAcceptModal, confirmationModal) => {
	const body = document.querySelector('body');
	leadAcceptModal.style.display = 'block';
	confirmationModal.style.display = 'none';
	body.style.overflow = 'hidden';
};

// Hide the modal and unlock background
const closeModal = (leadAcceptModal) => {
	const body = document.querySelector('body');
	leadAcceptModal.style.display = 'none';
	body.style.overflow = 'initial';
};

// Hide the modal and unlock background and reset form
const resetModal = (leadAcceptModal, confirmationModal, subscriptionForm) => {
	const body = document.querySelector('body');
	leadAcceptModal.style.display = 'none';
	confirmationModal.style.display = 'none';
	subscriptionForm.reset();
	body.style.overflow = 'initial';
};

// Display errors from Form
const evalSubscriptionForm = (event, confirmationModal) => {
	event.preventDefault();

	const alertMessage = document.querySelectorAll('.alert-message');
	if (alertMessage[0]) {
		alertMessage.forEach((singleMessage) => {
			singleMessage.remove();
		});
	}

	const displayFormErrorMessage = (index, className, alertMsg) => {
		const formDataContainer = document.querySelectorAll(className);
		const textContainer = document.createElement('p');
		textContainer.textContent = alertMsg;
		textContainer.style.color = 'red';
		textContainer.style.fontSize = '14px';
		textContainer.classList.add('alert-message');
		formDataContainer[index].appendChild(textContainer);
	};

	const checkBirthDate = () => {
		const birthdateDOM = document.querySelector('#birthdate').value;
		const birthdate = new Date(birthdateDOM);
		const birthYear = birthdate.getFullYear();
	
		const actualDate = new Date();
		const actualYear = actualDate.getFullYear();
		const actualMonth = actualDate.getMonth();
		const actualDay = actualDate.getDate();
	
		const min16 = new Date(actualYear - 16, actualMonth, actualDay + 1);

		if (actualYear - birthYear > 100 || birthdate >= min16) {
			return false;
		}
	
		return true;
	};
	

	const checkRadioTournament = () => {
		const placeRadioInput = document.querySelectorAll('.checkbox-input');
		for (let i = 0; i < 6; i++) {
			if (placeRadioInput[i].checked) {
				return true;
			}
		}
		return false;
	};

	const checkFormError = () => {
		let state = true;
		const firstNameInput = document.querySelector('#first');
		const lastNameInput = document.querySelector('#last');
		const emailInput = document.querySelector('#email');
		const birthdateInput = document.querySelector('#birthdate');
		const gameOnNumberTournament = document.querySelector('#quantity');
		const acceptRules = document.querySelector('#checkbox1');
		const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/;

		if (firstNameInput.value.length <= 2 || firstNameInput.value === '' || /\d/.test(firstNameInput.value)) {
			displayFormErrorMessage(0, '.formData', 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
			state = false;
		}

		if (lastNameInput.value.length <= 2 || lastNameInput.value === '' || /\d/.test(lastNameInput.value)) {
			displayFormErrorMessage(1, '.formData', 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
			state = false;
		}

		if (!regexEmail.test(emailInput.value)) {
			displayFormErrorMessage(2, '.formData', 'Vous devez entrer une adresse email valide');
			state = false;
		}

		if (birthdateInput.value === '') {
			displayFormErrorMessage(3, '.formData', 'Veuillez entrer votre date de naissance.');
			state = false;
		}

		if (checkBirthDate() === false) {
			displayFormErrorMessage(3, '.formData', 'Veuillez entrer une date de naissance valide.');
			state = false;
		}

		if (checkRadioTournament() === false) {
			displayFormErrorMessage(5, '.formData', 'Vous devez choisir une option.');
			state = false;
		}

		if (gameOnNumberTournament.value === '') {
			displayFormErrorMessage(4, '.formData', 'Veuillez entrer votre nombre de participation');
			state = false;
		}

		if (gameOnNumberTournament.valueAsNumber < 0) {
			displayFormErrorMessage(4, '.formData', 'Vous devez déjà avoir participé à des tournois');
			state = false;
		}

		if (acceptRules.checked === false) {
			displayFormErrorMessage(0, '.checkbox2-label', 'Vous devez vérifier que vous acceptez les termes et conditions.');
			state = false;
		}

		return state;
	};

	if (checkFormError() === true) {
		confirmationModal.style.display = 'flex';
	}
};

// Create confirmation modal element
const insertConfirmationModal = (confirmationModal, leadAcceptModal) => {
	confirmationModal.className = 'inscription-accepted';
	confirmationModal.innerHTML = `
	<i class="fa-solid fa-xmark"></i>
	<p>Merci pour votre inscription</p>
	<button>Fermer</button>
	`;
	leadAcceptModal.appendChild(confirmationModal);
};

// Start main steps
const main = () => {
	const burgerIcon = document.querySelector('.icon');
	const navBar = document.querySelector('.main-navbar');

	burgerIcon.addEventListener('click', () => {
		navbarInteractions(burgerIcon, navBar);
	});

	const confirmationModal = document.createElement('div');
	confirmationModal.id = '#modal-container';
	const leadAcceptModal = document.querySelector('.bground');
	insertConfirmationModal(confirmationModal, leadAcceptModal);

	const modalButton = document.querySelectorAll('.modal-btn');
	modalButton.forEach((btn) =>
		btn.addEventListener('click', () => {
			launchModal(leadAcceptModal, confirmationModal);
		})
	);

	const closeButton = document.querySelector('.close');
	const subscriptionForm = document.querySelector('form[name="reserve"');
	closeButton.addEventListener('click', () => {
		closeModal(leadAcceptModal);
	});
	subscriptionForm.addEventListener('submit', (event) => evalSubscriptionForm(event, confirmationModal));

	const confirmationModalBtn = document.querySelector('.inscription-accepted > button');
	confirmationModalBtn.addEventListener('click', () => {
		resetModal(leadAcceptModal, confirmationModal, subscriptionForm);
	});
	const confirmationModalXmark = document.querySelector('.fa-solid.fa-xmark');
	confirmationModalXmark.addEventListener('click', () => {
		resetModal(leadAcceptModal, confirmationModal, subscriptionForm);
	});
};

main();

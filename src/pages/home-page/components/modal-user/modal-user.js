import Swal from 'sweetalert2';

export const UserFeedbackModal = () => {
  let modalTimestamp = localStorage.getItem('modalTimestamp');

  if (modalTimestamp) {
    const timeToCountInMiliseconds = 2 * 60 * 1000; // 2 minutes
    const currentDate = new Date();

    const timeToCount = currentDate.getTime() - timeToCountInMiliseconds;

    if (modalTimestamp >= timeToCount) return;
  }

  Swal.fire({
    template: '#user-feedback-modal',
    showConfirmButton: false,
    width: '492px',
    padding: 0,
    customClass: {
      container: 'user-feedback-modal',
    },
    background: 'var(--color-background-500)',
    color: 'var(--color-white)',
    showCloseButton: true,
    allowEnterKey: false,
    closeButtonHtml: '<img src="/assets/icons/close-icon.png" alt="X" />',
    didClose: () => {
      localStorage.setItem('modalTimestamp', Date.now());
    },
  });

  UserFeedbackComponent();
};

const UserFeedbackComponent = () => {
  const userFeedbackComponent = document.querySelector(
    '.user-feedback-component'
  );
  const allRatesTiles = userFeedbackComponent.querySelectorAll(
    '.user-feedback-component__single-rate-tile'
  );
  const confirmButton = document.querySelector(
    '.user-feedback-component__confirm-button'
  );

  addListenersToAllRatesTiles(allRatesTiles, confirmButton);
};

const addListenersToAllRatesTiles = (arr, btn) => {
  arr.forEach((singleRateTile) => {
    singleRateTile.addEventListener('click', () => {
      singleRateTile.toggleAttribute('data-selected');
      getRatingValue(singleRateTile, btn);
      disselectOtherRatings(arr, singleRateTile);
    });
  });
};

const disselectOtherRatings = (arr, clickedTile) => {
  arr.forEach((singleRateTile) => {
    if (singleRateTile != clickedTile) {
      singleRateTile.removeAttribute('data-selected');
    }
  });
};

const getRatingValue = (el, btn) => {
  let ratingValue = null;
  if (el.hasAttribute('data-selected'))
    ratingValue = el.getAttribute('data-rate');

  console.log(`Rating value: ${ratingValue}`);
  updateButtonState(ratingValue, btn);
};

const updateButtonState = (ratingValue, btn) => {
  if (ratingValue) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', true);
  }
};

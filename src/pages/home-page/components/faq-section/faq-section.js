export const manageAccordion = () => {
  const questions = document.querySelectorAll('.faq__item');

  questions.forEach((question) => {
    question.addEventListener('click', () =>
      toggleAccordion(question, questions)
    );
    new ResizeObserver(calcSize).observe(question);
  });
};

const toggleAccordion = (clickedEl, arrOfElements) => {
  closeElements(clickedEl, arrOfElements);
  clickedEl.toggleAttribute('data-question-expanded');
};

const closeElements = (clickedEl, arrOfElements) => {
  arrOfElements.forEach((el) => {
    if (el !== clickedEl) el.removeAttribute('data-question-expanded');
  });
};

const calcSize = (question) => {
  const faqQuestion = question[0].target;
  const faqAnswer = question[0].target.querySelector('.faq__body');

  faqQuestion.style.setProperty(
    '--answer-height',
    `${faqAnswer.scrollHeight}px`
  );
};

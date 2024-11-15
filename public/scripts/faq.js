function toggleAnswer(questionId) {
    const question = document.getElementById(questionId);
    const plusIcon = question.querySelector('.fa-plus');
    const minusIcon = question.querySelector('.fa-minus');
    const answer = question.querySelector('.answer-data');

    if (plusIcon.style.display !== 'none') {
        plusIcon.style.display = 'none';
        minusIcon.style.display = 'inline-block';
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        plusIcon.style.display = 'inline-block';
        minusIcon.style.display = 'none';
        answer.style.maxHeight = null;
    }
}

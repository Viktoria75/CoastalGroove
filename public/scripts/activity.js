document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const messageDisplay = document.getElementById('message-display');
    const resetButton = document.getElementById('reset-button');
    let matchedPairs = 0;


    let firstCard = null;
    let secondCard = null;

    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'brown', 'orange', 'pink'];
    let shuffledColors = shuffle([...colors, ...colors]);

    function createCard(color) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundColor = 'white';
        card.textContent = '?';
        card.addEventListener('click', flipCard);
        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard() {
        if (!firstCard) {
            firstCard = this;
            revealCard(firstCard);
        } else if (!secondCard && this !== firstCard) {
            secondCard = this;
            revealCard(secondCard);
            checkMatch();
        }
    }



    function revealCard(card) {
        card.textContent = shuffledColors[parseInt(card.dataset.index)];
        const colorName = shuffledColors[parseInt(card.dataset.index)];
        card.style.backgroundColor = colorName;
        card.setAttribute('data-color-name', colorName); // Set data attribute for color name

        // Adjust vibrancy for red and blue cards
        if (colorName === 'red') {
            card.style.background= '#ff4a4a';
        }
        else if(colorName === 'blue') {
            card.style.background= '#5454ff';

        }else if(colorName === 'purple') {
            card.style.background= '#b92cbd';

        }
    }

    function checkMatch() {
        if (firstCard.textContent === secondCard.textContent) {
            messageDisplay.textContent = 'Match!';
            disableCards();
        } else {
            messageDisplay.textContent = 'Try again!';
            resetCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetGame();
    }

    function resetCards() {
        setTimeout(() => {
            hideCard(firstCard);
            hideCard(secondCard);
            resetGame();
        }, 500);
    }

    function hideCard(card) {
        card.style.backgroundColor = 'white';
        card.textContent = '?';
    }

    function resetGame() {
        firstCard = null;
        secondCard = null;
    }

    function resetBoard() {
        gameBoard.innerHTML = '';
        shuffledColors = shuffle([...colors, ...colors]);
        shuffledColors.forEach((color, index) => {
            const card = createCard(color);
            card.dataset.index = index;
            gameBoard.appendChild(card);
        });
        messageDisplay.textContent = '';
        resetGame();
    }

    function checkMatch() {
        if (firstCard.textContent === secondCard.textContent) {
            messageDisplay.textContent = 'Match!';
            disableCards();
            matchedPairs++;
    
            // Check if all pairs are matched
            if (matchedPairs === colors.length) {
                displayWinMessage();
            }
        } else {
            messageDisplay.textContent = 'Try again!';
            resetCards();
        }
    }
    
    function displayWinMessage() {
        messageDisplay.textContent = 'Congratulations! You win!';
    }
    
    // Initial setup
    resetButton.addEventListener('click', resetBoard);
    resetBoard();


});

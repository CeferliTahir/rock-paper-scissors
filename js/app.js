const data = [
    {
        name: 'rock',
        beats: ['scissors']
    },
    {
        name: 'paper',
        beats: ['rock']
    },
    {
        name: 'scissors',
        beats: ['paper']
    }
];

const buttons = document.querySelectorAll('.main .btn-item');
const result = document.querySelector("#result");
const main = document.querySelector('.main');
const selected = document.querySelector('.selection');
const playAgain = document.querySelector('#playAgain');

let score = 0;
let user;

function computerRandomSelect() {
    return data[Math.floor(Math.random() * data.length)];
}

function checkWinner(user, computer) {
    if (user.beats.includes(computer.name)) {
        result.textContent = "Win";
        score++;
    } else if (user.name === computer.name) {
        result.textContent = "Select Same";
    } else {
        result.textContent = "Lost";
        score--;
    }

    updateScore(score)
    showSelection(user, computer);
}

function showSelection(user, computer) {
    main.style.display = 'none';
    selected.style.display = 'flex';

    const selections = document.querySelectorAll('.selection .btn-item');

    selections.forEach(button => {
        const selection = button.parentElement.classList.contains('user-selection') ? user : computer;
        const className = `btn-${selection.name}`;
        const imagePath = `images/icon-${selection.name}.svg`;

        button.classList.replace(button.classList[1], className);
        button.querySelector('img').src = imagePath;
    });
}

function updateScore(value) {
    score = Math.max(value, 0)
    document.querySelector('#score').innerText = score;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        user = button.dataset.selection;

        const userSelect = data.find(item => item.name === user);

        const computerSelect = computerRandomSelect();
        checkWinner(userSelect, computerSelect);
    });
});

playAgain.addEventListener('click', () => {
    main.style.display = 'flex';
    selected.style.display = 'none';
})
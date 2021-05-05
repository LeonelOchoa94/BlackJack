/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const regular = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    computerPoints = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divPlayerCards = document.querySelector('#player-card');
const divComputerCards = document.querySelector('#computer-card');

const pointsHTML = document.querySelectorAll('small');

// Esta función crea un nuevo deck
const createDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let type of regular) {
            deck.push(i + type);
        }
    }

    for (let type of regular) {
        for (let esp of specials) {
            deck.push(esp + type);
        }
    }
    // console.log( deck );
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();


// Esta función me permite tomar una carta
const askCard = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop();
    return card;
}

// pedirCarta();
const cartValue = (carta) => {

    const value = carta.substring(0, carta.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10 :
        value * 1;
}

// turno de la computadora
const computerShift = (minimunPoints) => {

    do {
        const card = askCard();

        computerPoints = computerPoints + cartValue(card);
        pointsHTML[1].innerText = computerPoints;

        // <img class="carta" src="assets/cartas/2C.png">
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${ card }.png`; //3H, JD
        imgCard.classList.add('carta');
        divComputerCards.append(imgCard);

        if (minimunPoints > 21) {
            break;
        }

    } while ((computerPoints < minimunPoints) && (minimunPoints <= 21));

    setTimeout(() => {
        if (computerPoints === minimunPoints) {
            alert('Nadie gana :(');
        } else if (minimunPoints > 21) {
            alert('Computadora gana')
        } else if (computerPoints > 21) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100);
}



// Eventos
btnPedir.addEventListener('click', () => {

    const carta = askCard();

    playerPoints = playerPoints + cartValue(carta);
    pointsHTML[0].innerText = playerPoints;

    // <img class="carta" src="assets/cartas/2C.png">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCard.classList.add('carta');
    divPlayerCards.append(imgCard);

    if (playerPoints > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        computerShift(playerPoints);

    } else if (playerPoints === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        computerShift(playerPoints);
    }

});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    computerShift(playerPoints);
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = createDeck();

    playerPoints = 0;
    computerPoints = 0;

    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});
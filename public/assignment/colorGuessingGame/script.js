(function () {
    var numberOfSquares;
    var colors;
    var pickedColor;

    var squares = document.querySelectorAll('.square');
    var colorDisplay = document.querySelector('#colorDisplay');
    var message = document.querySelector('#message');
    var info = document.querySelector('#info');
    var resetButton = document.querySelector('#reset');
    var modeBtns = document.querySelectorAll('.mode');
    colorDisplay.innerText = pickedColor;

    function init() {
        numberOfSquares = 6;
        reset();
    }

    init();
    //squares click event
    Array.prototype.forEach.call(squares, function (square, i) {
            //change each square background color to a random color
            square.style.background = colors[i];
            //add click event to each square
            square.addEventListener('click', function () {
                if (this.style.background === pickedColor) {
                    message.innerText = 'Correct';
                    changeAllSquares(pickedColor);
                    info.style.background = pickedColor;
                    resetButton.innerText = 'Play Again?';
                } else {
                    this.style.background = '#232323';
                    message.innerText = 'Try Again';
                }
            })
        })
        //reset btn click event
    resetButton.addEventListener('click', function () {
        reset();
    })

    //mode btns click event
    Array.prototype.forEach.call(modeBtns, function (btn, idx) {
        btn.addEventListener('click', function () {
            if (idx === 0) {
                numberOfSquares = 3;
            } else {
                numberOfSquares = 6;
            }
            Array.prototype.forEach.call(modeBtns, function (eachModebtn) {
                eachModebtn.classList.remove('selected');
            });
            this.classList.add('selected');
            reset();
        })
    });

    function reset() {
        colors = generateRandomColors(numberOfSquares);
        pickedColor = pickColor();
        colorDisplay.innerText = pickedColor;
        Array.prototype.forEach.call(squares, function (square, i) {
            if (colors[i]) {
                square.style.display = '';
                square.style.background = colors[i];
            } else {
                square.style.display = 'none';
            }

        });
        info.style.background = 'steelblue';
        resetButton.innerText = 'New Colors';
        message.innerText = '';
    }

    //change all squares background color to the picked color
    function changeAllSquares(color) {
        Array.prototype.forEach.call(squares, function (square) {
            square.style.background = color;
        });
    }

    //fick a random color from colors
    function pickColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    //generate an array of random colors
    function generateRandomColors(num) {
        var colors = [];
        for (var i = 0; i < num; i++) {
            var color = 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
            colors.push(color);
        }
        return colors;
    }
})();
var numOne = document.getElementById('num-one');
var numTwo = document.getElementById('num-two');
var addSum = document.getElementById('add-sum');

numOne.addEventListener('input', add);
numTwo.addEventListener('input', add);


function add(){
    var one = parseFloat(numOne.value) || 0;
    var two = parseFloat(numTwo.value) || 0;
    var sum = one + two;
    addSum.innerHTML = "your sum is: " + sum;
}

var apple = document.getElementById("apple");
var pear = document.getElementById("pear");
var orange = document.getElementById("orange");

apple.addEventListener('click', picLink);
pear.addEventListener('click', picLink);
orange.addEventListener('click', picLink);

function picLink () {
    var pics = document.querySelectorAll("img");
    pics.forEach(function(pic){
        pic.className = 'hide';
    });

    var picId = this.attributes["data-img"].value;
    var pic = document.getElementById(picId);

    if(pic.className === 'hide') {
        pic.className = "";
    } else {
        pic.className = 'hide'
    }
}

var checklist = document.getElementById("checklist");
var items = checklist.querySelectorAll("li");
var inputs = checklist.querySelectorAll("input");

items.forEach(function(item, idx) {
    item.addEventListener('click', editItem);
    inputs[idx].addEventListener('blur', updateItem);
    inputs[idx].addEventListener('keypress', itemKeypress);
})

function editItem(){
    this.className = 'edit';
    var input = this.querySelector('input');
    input.focus();
    input.setSelectionRange(0, input.value.length);
}

function updateItem(){
    this.previousElementSibling.innerHTML = this.value;
    this.parentNode.className = "";
}

function itemKeypress(event) {
    if(event.which === 13) {
        updateItem.call(this);
    }
}




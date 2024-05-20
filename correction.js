var stack = [];
var child = 0;
var postfix = '';
var se = document.getElementsByClassName('stack')[0];
var display = document.getElementsByClassName('actions')[0];
var inputbox = document.getElementById('inputbox');
var inchild = 0;

function auto() {
  setInterval(next,2000);
}

function next() {
  var char = inputbox.children[inchild].value;
  inchild++;
  infixToPostfix(char);
  document.getElementById('exp').innerHTML = postfix;
}
function reset() {
  location.reload();
}
function addParagraph(theValue) {
  var paragraph = document.createElement("div");
  paragraph.classList.add('textstyle')
  if (theValue === ''){
    ;
  }
  else{
  paragraph.textContent = theValue;
  display.appendChild(paragraph);
  }
}
function precedence(operator) {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    case '^':
      return 3;
    default:
      return 0;
  }
}

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function infixToPostfix(char) {
  if (char.match(/[a-zA-Z0-9]/)) {
    postfix += char;
    setTimeout(addParagraph, 1, `operand ${char} added to postfix`);
  } 
  else if (char === '(') {
    stack.push(char);
    se.children[child].innerHTML = char;
    child = child + 1;
    setTimeout(addParagraph, 10, `operator ${char} pushed to stack`);
  } 
  else if (char === ')') {
    while (stack.length > 0 && stack[stack.length - 1] != '(') {
      var pop = stack.pop();
      postfix += pop;
      se.children[child - 1].innerHTML = '';
      child = child - 1;
      setTimeout(addParagraph, 10, `operator ${pop} poped from stack`);
    }
    if (stack[stack.length - 1] === '(') {
      var pop = stack.pop();
      se.children[child - 1].innerHTML = '';
      child = child - 1;
      setTimeout(addParagraph, 1, `operator ${pop} poped from stack`);
    }
  } 
  else {
    while (
      stack.length > 0 &&
      isOperator(stack[stack.length - 1]) &&
      precedence(char) <= precedence(stack[stack.length - 1])
    ) {
      var pop = stack.pop();
      postfix += pop;
      se.children[child - 1].innerHTML = '';
      child = child - 1;
      setTimeout(addParagraph, 10, `operator ${pop} poped from stack`);
    }
    if(char != ''){
      stack.push(char);
      se.children[child].innerHTML = char;
      child = child + 1;
      setTimeout(addParagraph, 10, `operator ${char} pushed to stack`);
    }
  } 
}
function jumpToNextTextBox(currentTextBox, nextTextBoxId) {
  var nextTextBox = document.getElementById(nextTextBoxId);

  if (event.key === 'Enter') {
    event.preventDefault();
    nextTextBox.focus();
  }
}

var playerOne = prompt('player one input your name');
var playerOneColor = 'rgb(86, 151, 255)';

var playerTwo = prompt('player two input your name');
var playerTwoColor = 'rgb(237, 45, 73)';
var gameOn = true;

var table = $('table tr');

function returnColor(row, col){
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}

function getBottom(col) {
  for (var i = table.length - 1; i >=0 ; i--) {
    if (returnColor(i, col) === 'rgb(128, 128, 128)') {
      return i
    }
  }
}

function verticalWinCheck(row, col, color) {
  var count = 0
  for (var i = 0; i < table.length; i++) {
    thisColor = table.eq(i).find('td').eq(col).find('button').css('background-color');
    if (thisColor == color) {
      count++;
    } else{
      count = 0
    }
    if (count >= 4){
      return true;
    }
  }
  return false;
}

function horizontalWinCheck(row, col, color) {
  var count = 0
  currenRow = table.eq(row).find('td');

  for (var i = 0; i < currenRow.length; i++) {
    thisColor = table.eq(row).find('td').eq(i).find('button').css('background-color');
    if (thisColor == color) {
      count++;
    } else{
      count = 0
    }
    if (count >= 4){
      return true;
    }
  }
  return false;
}

function diagonalWinCheck(row, col, color) {
  var count = 1;
  var keepCounting1 = true;
  var keepCounting2 = true;

  console.log("diagnoal 1");
  for (var i = 1; i < 7; i++) {
    var thisColor1 = table.eq(row + i).find('td').eq(col + i).find('button').css('background-color');
    var thisColor2 = table.eq(row - i).find('td').eq(col - i).find('button').css('background-color');
    if (thisColor1 == color && keepCounting1) {
      count++;
    } else{
      keepCounting1 = false;
    }
    if (thisColor2 == color && keepCounting2) {
      count++;
    } else{
      keepCounting2 = false;
    }

    if (count >= 4) {
      console.log(count);
      return true;
    }
  }

  count = 1;
  keepCounting1 = true;
  keepCounting2 = true;

  for (var i = 1; i < 7; i++) {
    thisColor1 = table.eq(row + i).find('td').eq(col - i).find('button').css('background-color');
    thisColor2 = table.eq(row - i).find('td').eq(col + i).find('button').css('background-color');
    if (thisColor1 == color && keepCounting1) {
      count++;
    } else{
      keepCounting1 = false;
    }
    if (thisColor2 == color && keepCounting2) {
      count++;
    } else{
      keepCounting2 = false;
    }

    if (count >= 4) {
      return true;
    }
  }
  return false;
}

function winCheck(row, col, color) {
  if (horizontalWinCheck(row, col, color) || verticalWinCheck(row, col, color) || diagonalWinCheck(row, col, color)){
      gameOn = false;
      return true;
  }
}

function changeColor(row, col, color){
  return table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}

var currentPlayer = playerOne;
var currentColor = playerOneColor;
var totalCount = 0;

$('h3').text(currentPlayer + ' it is your turn');

$('button').on('click', function() {

  if (!gameOn) {
    console.log("Game Over! Please refresh!");
    return;
  }

  var col = $(this).closest('td').index();
  var row = getBottom(col);

  if (row == undefined) {
    $('h3').text('Cant choose this column, already full! ' + currentPlayer + ' must select other columns' );
    return;
  }

  totalCount++;
  changeColor(row, col, currentColor);

  if (winCheck(row, col, currentColor)) {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(currentPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px")
    return;
  }

  if (totalCount >= 42) {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text("Tie! No more empty space! Please refresh your browser to play again!").css("fontSize", "50px")

  }

  if (currentColor == playerOneColor){
    currentColor = playerTwoColor;
  } else{
    currentColor = playerOneColor;
  }

  if (currentPlayer == playerOne){
    currentPlayer = playerTwo;
  } else{
    currentPlayer = playerOne;
  }



  $('h3').text(currentPlayer + ' it is your turn');
})

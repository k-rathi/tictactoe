const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    this.isComplete = false;
    this.player1 = new Player(1);
    this.player2 = new Player(2);
    this.round();

  }
  round() {
    this.printBoard(1);
    this.placePiece = this.placePiece.bind(this);
    this.checkIfWon = this.checkIfWon.bind(this);
    this.printBoard = this.printBoard.bind(this);
    this.player1.makeMove((player, row, column) => {
      this.placePiece(player, row, column);
      this.checkIfWon(player);
      this.printBoard(2);
      this.player2.makeMove((player, row, column) => {
        this.placePiece(player, row, column);
        this.checkIfWon(player);
        this.round();
      });
    });
  }
  printBoard(player) {
    if(player.number === 1) {
      for(var i = 0; i < this.board.length; i++) {
        console.log(this.board[i]);
      }
    } else {
      for(var i = this.board.length - 1; i >= 0; i--) {
        console.log(this.board[i]);
      }
    }
  }
  placePiece(player, row, column) {
    if(player.number === 1) {
      if(this.board[row - 1][column - 1] === ' ') {
        this.board[row - 1][column - 1] = player.piece;
        return;
      }
      else {
        console.log('invalid piece position, try again');
        player.makeMove(this.placePiece.bind(this));
      }

    } else {
      if(this.board[2 - (row - 1)][2 - (column - 1)] === ' ') {
        this.board[2 - (row - 1)][2 - (column - 1)] = player.piece;
        return;
      }
      else {
        console.log('invalid piece position, try again');
        player.makeMove(this.placePiece.bind(this));
      }
    }
  }

  checkIfWon(player) {
    for(var i = 0; i < this.board.length; i++) {
      if(this.board[i][0] === player.piece && this.board[i][1] === player.piece && this.board[i][2] === player.piece) {
        this.isComplete = true;
        rl.question('Looks like you won! would you like to play again? y/n', (answer) => {
          if(answer === 'y') {
            this.startNewGame();
          } else {
            return;
          }
          rl.close();
        });
      }
    }
  }
}




class Player {
  constructor(number) {
    this.number = number;
    this.piece = this.number === 1 ? 'X' : 'O';
  }

  makeMove(cb) {
    rl.question('Give me the row from the top to place your ' + this.piece, (row) => {
      rl.close();
      rl.question('Give me the column from the left to place your ' + this.piece, (column) => {
        cb(this, row, column);
        rl.close();
      });
    });
  }
}

var game = new Game();

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = (Math.random() + 0.25) * 300;                                  // speed in [pixel per second], between 75 and 375
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    if (this.x > 505) {
    this.x = -500;                                                              // setting bugs back left off the "canvas"
    }
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
}
Player.prototype.update = function() {
  if (this.y === -11) {                                                         // @ -11 Player reached the "water"
    this.y = 404;
    this.x = 202;
    window.alert("You did win, if you want to play again press 'OK'");
  }
  for (i = 0; i < 7; i++) {                                                     // "Distance-logig" for Bug <--> Player from here on
    if (this.y == allEnemies[i].y + 10 && Math.abs(allEnemies[i].x - this.x) < 80 ) {
        location.reload(true);
    };
  }
}
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {                                  // moving the player around, but not out of "canvas"
  if (key === 'right' && this.x < 404) {
    this.x += 101;
  }
  if (key === 'left' && this.x > 0) {
    this.x -= 101;
  }
  if (key === 'up' && this.y > 0) {
    this.y -= 83;
  }
  if (key === 'down' && this.y < 404) {
    this.y += 83;
  }
};
// Now instantiate your objects.
var enemy1 = new Enemy(-50 ,62);
var enemy2 = new Enemy(80 ,145);
var enemy3 = new Enemy(380 ,228);
var enemy1b = new Enemy(-750 ,62);
var enemy2b = new Enemy(-620 ,145);
var enemy3b = new Enemy(-320 ,228);
var enemy3c = new Enemy(-920 ,228);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy1b, enemy2b, enemy3b, enemy3c];
// Place the player object in a variable called player
var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

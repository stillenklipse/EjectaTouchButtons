EjectaTouchButtons
==================

This is similar to the other touch button plugins except it allows you to drag touch across the buttons to fire their events instead of having to stop touching the screen to start a new touch start event.  I also removed the support for other browser touch events to keep this small and focused on ejecta builds.


##Usage As A Plugin:


Based off:
https://gist.github.com/phoboslab/3773386

Require in main.js or game instance
```
.requires(
    'plugins.ejectatouchbutton' 
)
```
Add to games init
```
image: new ig.Image( 'media/buttons.jpg' ),
touchbuttons: null,
init: function() {
ig.input.bind( ig.KEY.MOUSE1, 'touch');	
this.touchbuttons = new ig.EjectaTouchButtonCollection([
    new ig.EjectaTouchButton( 'right', {left: 0, bottom: 0}, 100, 100, this.image, 1,0 ),
    new ig.EjectaTouchButton( 'click', {right: 0, bottom: 0}, 100, 100, this.image, 1,0 )
]);
```

Draw buttons when needed
```
draw:function(){
	this.parent();
	if( window.ejecta ){
		this.touchbuttons.align(); 
		this.touchbuttons.draw(); 
	}
}
```


##Usage as Entity

Require in main.js or game instance or place in level during level creation in Weltmeister
```
.requires(
    'game.entities.touchbutton'
)
```

Add to init if not set in Weltmeister
```
init: function() {
    ig.input.bind( ig.KEY.MOUSE1, 'touch');
    this.image = new ig.Image( 'media/proptile.jpg' );
    ig.game.spawnEntity(EntityTouchbutton, 0,0,{action:'left', image:this.image, defaultTile:1, actionTile:0});
}
```

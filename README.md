EjectaTouchButtons
==================

#Ejecta Touch Button Examples as a plugin and as an Entity

Usage As A Plugin:

Based off:
https://gist.github.com/phoboslab/3773386

Example Usage:

- Require in main.js or game instance
```
.requires(
    'plugins.ejectatouchbutton' 
)
```
....
- Add to games init
```
image: new ig.Image( 'media/buttons.jpg' ),
touchbuttons: null,
init: function() {
ig.input.bind( ig.KEY.MOUSE1, 'touch');	
this.touchbuttons = new ig.EjectaTouchButtonCollection([
    new ig.EjectaTouchButton( 'right', {left: 0, bottom: 0}, 100, 100, this.image, 1,0 ),
    new ig.EjectaTouchButton( 'click', {right: 0, bottom: 0}, 100, 100, this.image, 1,0 )
]);

.....
```
- Draw buttons when needed
```
draw:function(){
	this.parent();
	if( window.ejecta ){
		this.touchbuttons.align(); 
		this.touchbuttons.draw(); 
	}
}
```

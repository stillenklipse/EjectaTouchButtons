/*
Based off:
https://gist.github.com/phoboslab/3773386

Example Usage:

- Require in main.js or game instance
.requires(
    'plugins.ejectatouchbutton' 
)

....
- Add to games init
image: new ig.Image( 'media/buttons.jpg' ),
touchbuttons: null,
init: function() {
ig.input.bind( ig.KEY.MOUSE1, 'touch');	
this.touchbuttons = new ig.EjectaTouchButtonCollection([
    new ig.EjectaTouchButton( 'right', {left: 0, bottom: 0}, 100, 100, this.image, 1,0 ),
    new ig.EjectaTouchButton( 'click', {right: 0, bottom: 0}, 100, 100, this.image, 1,0 )
]);

.....

- Draw buttons when needed
draw:function(){
	this.parent();
	if( window.ejecta ){
		this.touchbuttons.align(); 
		this.touchbuttons.draw(); 
	}
}
*/

ig.module(
	'plugins.ejectatouchbutton'
	)
.requires(
	'impact.system',
	'impact.input',
	'impact.image'
	)
.defines(function(){ "use strict";
	ig.EjectaTouchButton = ig.Class.extend({	
		action: 'undefined',
		image: null,
		tileDefault: 0,
		tileAction: 0,
		pos: {x: 0, y: 0},
		size: {x: 0, y: 0},
		area: {x1: 0, y1:0, x2: 0, y2:0},
		pressed: false,	
		touchId: 0,
		anchor: null,
		init: function( action, anchor, width, height, image, tileDefault, tileAction ) {
			this.action = action;
			this.anchor = anchor;
			this.size = {x: width, y: height};
			this.image = image || null;
			this.tileDefault = tileDefault || 0;
			this.tileAction = tileAction || 0;
		},
		align: function( w, h ) {
			if( 'left' in this.anchor ) {
				this.pos.x = this.anchor.left;
			}
			else if( 'right' in this.anchor ) {
				this.pos.x = w - this.anchor.right - this.size.x;
			}
			if( 'top' in this.anchor ) {
				this.pos.y = this.anchor.top;
			}
			else if( 'bottom' in this.anchor ) {
				this.pos.y = h - this.anchor.bottom - this.size.y;
			}
			var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
			var s = ig.system.scale * (internalWidth / ig.system.realWidth);
			this.area = {
				x1: this.pos.x * s, y1: this.pos.y * s,
				x2: (this.pos.x + this.size.x) * s, y2: (this.pos.y + this.size.y) *s};
			},
		inFocus: function() {
            return (
                (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
                (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
            );
        },
		draw: function() {
			if( this.image ) {
				if (this.inFocus() && ig.input.state('touch')) {
	                    ig.input.actions[this.action] = true;
        				this.image.drawTile( this.pos.x, this.pos.y, this.tileAction, this.size.x, this.size.y );
	                }else{
						ig.input.actions[this.action] = false;
						this.image.drawTile( this.pos.x, this.pos.y, this.tileDefault, this.size.x, this.size.y );

	            }
			}
		}
	});

	ig.EjectaTouchButtonCollection = ig.Class.extend({
		buttons: [],
		init: function( buttons ) {
			this.buttons = buttons;
		},
		align: function() {
			var w = ig.system.width || window.innerWidth;
			var h = ig.system.height || window.innerHeight;
			for( var i = 0; i < this.buttons.length; i++ ) {
				this.buttons[i].align( w, h );
			}
		},
		draw: function() {
			for( var i = 0; i < this.buttons.length; i++ ) {
				this.buttons[i].draw();
			}
		}
	});
});

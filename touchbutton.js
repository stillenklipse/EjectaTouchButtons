/*
.requires(
    'game.entities.touchbutton'
)
init: function() {
    ig.input.bind( ig.KEY.MOUSE1, 'touch');
    this.image = new ig.Image( 'media/proptile.jpg' );
    ig.game.spawnEntity(EntityTouchbutton, 0,0,{action:'left', image:this.image, defaultTile:1, actionTile:0});
}
*/
ig.module(
    'game.entities.touchbutton'
)
.requires(
    'impact.entity'
)
.defines(
    function(){
        EntityTouchbutton= ig.Entity.extend({
            size: {x: 100, y: 100},
            offset:{x:0,y:0},
            maxVel:{x:0, y:0},
            zIndex:0,
            gravityFactor:0,
            action:null,
            image:null,
            defaultTile:0,
            actionTile:1,
            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },
            inFocus: function() {
                return (
                    (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
                    ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
                    (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
                    ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
                );
            },
            update: function(){
                if (ig.input.state('touch') && this.inFocus()) {
                    ig.input.actions[this.action] = true;
                    this.tile=this.actionTile;
                }else{
                   ig.input.actions[this.action] = false;
                   this.tile=this.defaultTile;
               }
           },
           draw:function(){
           if( this.image ) {
                this.image.drawTile( this.pos.x, this.pos.y, this.tile, this.size.x, this.size.y );
           }
        }
    });
});

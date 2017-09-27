/// <reference path="pixi.js" />

var fx = {
    
    ERR_TICKER_NOT_INITIALIED: "Ticker was not initialized in base fx",
    
    state:{
        UNINITIALIZED : "UNINITIALIZED",
        PLAYING: "PLAYING",
        PAUSED: "PAUSED",
        FINNISHED: "FINNISHED"
    },

    ticker: null,
    
    init: function(ticker){
        fx.ticker = ticker
    },

    /* base constructor */
    base: function(sprite, onstart){
        var self = this;
        this.sprite = sprite
        this.state = fx.state.UNINITIALIZED

        this.pause = function(){
            self.state = fx.state.PAUSED
        }

        this.start = function(){
            console.assert(fx.ticker != null, fx.ERR_TICKER_NOT_INITIALIED)
            self.state = fx.state.PLAYING
            if (self.onstart) 
                self.onstart()
        }

        this.stop = function(){
            self.state = fx.state.FINNISHED
        }
    },
    
    
    /* effects */
    fadeState: {
        UNINITIALIZED: "UNINITIALIZED",
        WAITING_DELAY : "WAITING_DELAY",
        FADING : "FADING"
    },    
    FadeIn: function(sprite, start_delay, duration){        
        
        this.onstart = function(){
            this.elapsedMS = 0
            this.sprite.alpha = 0
            this.anim_state = fx.fadeState.WAITING_DELAY            
        }

        fx.base.call(this, sprite, this.onstart);

        this.params = {
            start_delay: 0,
            duration: 5.0
        }
        if (start_delay) this.params.start_delay = start_delay
        if (duration) this.params.duration = duration

        this.anim_state = fx.fadeState.UNINITIALIZED
        this.elapsedMS = 0
                
        
        this.update = function(){            
            switch(this.state){
                case fx.state.PLAYING:
                    this.elapsedMS += fx.ticker.elapsedMS                    
                    switch (this.anim_state){
                        case fx.fadeState.WAITING_DELAY:                            
                            if (this.elapsedMS >= (this.params.start_delay * 1000)){
                                this.anim_state = fx.fadeState.FADING
                            }
                        break

                        //fps independent fade in time ( MAX_ALPHA = 1 )     
                        case fx.fadeState.FADING:                                                   
                            this.sprite.alpha += (1/this.params.duration/1000) * fx.ticker.elapsedMS
                            if(this.sprite.falda >= 1.0){
                                debugger
                                this.stop()
                            }
                        break
                    }                    
                break;
            }
        }
        return this;
    }
    
    
    


    
    
};

    

    
    


    fx.lighting = function(ticker){

    
        this.update = function(ticker){

        }

    }


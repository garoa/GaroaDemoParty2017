/// <reference path="pixi.js" />
/// <reference path="fx.js" />


/* array extensions */
Array.prototype.byKey = function(key){    
    for(i =0; i< this.length; i++)
        if (this[i].key == key)
            return this[i]
    return null
}

var DEBUG = true
var renderer
var scene
var sprites = []
var gui

//Common PXIjs Aliases
var ticker = PIXI.ticker.shared;
var textureCache = PIXI.utils.TextureCache
var autoDetectRenderer = PIXI.autoDetectRenderer
var loader = PIXI.loader
var resources = PIXI.loader.resources
var Sprite = PIXI.Sprite
var Container = PIXI.Container

function logInfo(t){ if (DEBUG) console.log(t) }
function logWarn(t){ if (DEBUG) console.warn(t) }

window.onload = function(){    
    logInfo('window.onload...')
    loader.add([
        "assets/sprites/party-logo.png",
        "assets/sprites/lighting.png",
        "assets/sprites/circle-w.png" ]
    )
    .on("progress", loadProgressHandler)
    .load(setup)
    PIXI.utils.sayHello()          
}

function setup() {
    logInfo('setup...')    

    renderer = PIXI.autoDetectRenderer(
        1280, 720, {antialias: true, transparent: false, resolution: 1}
    )
    renderer.backgroundColor = 0x004425
    renderer.view.id = "view"       
    if (DEBUG){
        renderer.view.style.border = "1px solid #fff"
        gui = gui = new dat.GUI()
        gui.useLocalStorage = false
    }
    renderer.view.style.position = 'absolute';
    renderer.view.style.left = '50%';
    renderer.view.style.top = '50%';
    renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
    document.getElementById('view-container').appendChild(renderer.view)    

    var party_logo =  new Sprite(resources["assets/sprites/party-logo.png"].texture);    
    party_logo.anchor.set(0.5, 0.5) 
    party_logo.position.set( renderer.view.width/2.0, renderer.view.height/2.0) 
    party_logo.fx = [ new fx.FadeIn(party_logo, 0, 5) ]
    party_logo.alpha = 0;
    sprites.push({key: "party_logo", instance: party_logo})
        
    // sprites.push({key: "party_logo", instance: new Sprite(resources["assets/sprites/party-logo.png"].texture)})    
    // sprites.push({key: "lighting", instance: new Sprite(resources["assets/sprites/lighting.png"].texture) })
    
    createScene()
}

function loadProgressHandler(loader, resource){    
    logInfo("loading " + loader.progress + "% \t" + resource.url)
}

function createScene(){
    logInfo('creatingScene...')    

    if (DEBUG) 
        createDebugUI()    

    scene = new Container()    
    scene.addChild(sprites[0].instance)
    
    ticker.add(updateAndRender)
    ticker.start()
    fx.init(ticker)
    logInfo("Playing!");
}

function createDebugUI(){
/*
     sprites.party_logo.fade_in_time = 5; //seconds
     sprites.party_logo.alpha = 0;    
    folder = gui.addFolder('1. Logo fadein');
        folder.add(sprites.party_logo, 'fade_in_time', 1, 15)
        folder.add(sprites.party_logo, 'alpha', 0, 1)
        folder.add(displacementFilter, 'enabled').onChange(trackEvent.bind(folder));
        folder.add(displacementFilter.scale, 'x', 1, 200).name('scale.x');
        folder.add(displacementFilter.scale, 'y', 1, 200).name('scale.y');
    */
    
    var party_logo = sprites.byKey('party_logo').instance
    folder = gui.addFolder('Logo FadeIn')
        folder.add(party_logo.fx[0].params, 'start_delay').min(0)
        folder.add(party_logo.fx[0].params, 'duration')
        folder.add(party_logo.fx[0], 'start');
        folder.open()
}


function updateAndRender(){    
    
    for(i=0; i< sprites.length; i++)
        if (sprites[i].instance.fx){            
            for (f = 0; f < sprites[i].instance.fx.length; f++)
                sprites[i].instance.fx[f].update()
        }
      
    renderer.render(scene)    
}


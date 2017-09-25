/// <reference path="pixi.js" />

var DEBUG = true

var renderer
var scene
var sprites = {}

//Common PXIjs Aliases
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
        "assets/sprites/lighting.png" ]
    )
    .on("progress", loadProgressHandler)
    .load(setup)
    PIXI.utils.sayHello()          
}

function setup() {
    logInfo('setup...')    
    sprites.party_logo = new Sprite(resources["assets/sprites/party-logo.png"].texture)
    sprites.lighting = new Sprite(resources["assets/sprites/lighting.png"].texture)
    createScene()
}

function loadProgressHandler(loader, resource){    
    logInfo("loading " + loader.progress + "% \t" + resource.url)
}

function createScene(){
    logInfo('creatingScene...')
    renderer = PIXI.autoDetectRenderer(
        1280, 720, {antialias: true, transparent: false, resolution: 1}
    )
    renderer.backgroundColor = 0x004425
    renderer.view.id = "view"       
    if (DEBUG)
        renderer.view.style.border = "1px solid #fff"
    renderer.view.style.position = 'absolute';
    renderer.view.style.left = '50%';
    renderer.view.style.top = '50%';
    renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
     document.getElementById('view-container').appendChild(renderer.view)

    scene = new Container()    
    sprites.party_logo.anchor.set(0.5, 0.5)    
    sprites.party_logo.position.set( renderer.view.width/2.0, renderer.view.height/2.0)
    scene.addChild(sprites.party_logo);

    sprites.lighting.visible = false;
    scene.addChild(sprites.lighting);

    //start scene
    logInfo("Playing!");
    sceneLoop()
}


function updateState(){    
    
}


function sceneLoop() {
    requestAnimationFrame(sceneLoop);
    updateState();
    renderer.render(scene)
}


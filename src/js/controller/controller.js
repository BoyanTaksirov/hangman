const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const START_SCREEN_TYPE = require("../model/globals").START_SCREEN_TYPE;
const GAME_SCREEN_TYPE = require("../model/globals").GAME_SCREEN_TYPE;
const StartScreen = require("../screens/start_screen");
const GameScreen = require("../screens/game_screen");
const GameModel = require("../model/game_model");
const ALL_ASSETS_PATHS = require("../model/globals").ALL_ASSETS_PATHS;
const IMAGE_PATHS = require("../model/globals").IMAGE_PATHS;
const ADDITIONAL_IMAGE_ASSETS_PATHS = require("../model/globals").ADDITIONAL_IMAGE_ASSETS_PATHS;
const IMAGE_PANEL_ELEMENTS_PERCENT_DIMENSONS = require("../model/globals").IMAGE_PANEL_ELEMENTS_PERCENT_DIMENSONS;
const SOUNDS_PATHS = require("../model/globals").SOUNDS_PATHS;
const Preloader = require("../components/preloader");
const SoundManager = require("../sound/sound_manager");

const IMAGE_PANEL_ASSET = "IMAGE_PANEL_ASSET";
const ADDITIONAL_IMAGE_ASSET = "ADDITIONAL_IMAGE_ASSET";
const SOUND_ASSET = "SOUND_ASSET";
const SOUND_CLICK_PATH = require("../model/globals").SOUND_CLICK_PATH;
const SOUND_LOSE_PATH = require("../model/globals").SOUND_LOSE_PATH;
const SOUND_GUESSED_PATH = require("../model/globals").SOUND_GUESSED_PATH;
const SOUND_LEVEL_UP_PATH = require("../model/globals").SOUND_LEVEL_UP_PATH;
const SOUND_GAME_LOSE_PATH = require("../model/globals").SOUND_GAME_LOSE_PATH;

let instance;

module.exports = class Controller     //controls assets and switching between screens and resizing
{
    constructor()
    {
        if (instance)
        {
            return instance;
        }

        instance = this;

        this.onWindowResize = this.onWindowResize.bind(this);
        this.startApp = this.startApp.bind(this);
        this.exitScreenHandler = this.exitScreenHandler.bind(this);

        //----------------------Get screen dimensions--------------------------------------------------------------------------
        this.ratio = window.devicePixelRatio || 1;

        this.screenResolutionX = window.screen.width * this.ratio;
        this.screenResolutionY = window.screen.height * this.ratio;

        //-------------------------------------------------------------------------------------------------------------------------

        this.gameModel = new GameModel();

        this.resourcesLoaded = 0;
        this.graphicAssets = [];
        this.additionalGraphicAssets = [];
        this.soundAssets = [];
     
        this.globalContainer;
        this.preloader;
        this.soundManager;

        this.screensObject = {
            startScreen: null,
            gameScreen: null,
        }

        this.createConstantElements();
        this.loadAssets(this.startApp);

        window.addEventListener("resize", this.onWindowResize);
    }

    createConstantElements()
    {
        this.globalContainer = $("<div/>").addClass(CLASS_NAMES.GlobalContainer);
        document.body.appendChild(this.globalContainer[0]);

        this.preloader = new Preloader();
        this.preloader.addToContainer(this.globalContainer);
        this.onWindowResize(null);
    }

    //---------------------------------loading assets, needed for preloader functionality------------------------
    loadAssets(startGameCallback)
    {
        var thisInstance = this;

        this.loaders = [];
        for (var i = 0; i < ALL_ASSETS_PATHS.length; i++)
        {
            var xmlHttp;
            if (window.XMLHttpRequest)
            {
                xmlHttp = new XMLHttpRequest();
            }
            else
            {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlHttp.index = i;
            xmlHttp.currentProgress = 0;

            var assetType = null;
            var originalImageLink = null;
            var soundType = null
            if (IMAGE_PATHS.indexOf(ALL_ASSETS_PATHS[i]) != -1)
            {
                assetType = IMAGE_PANEL_ASSET;
            }
            else if (ADDITIONAL_IMAGE_ASSETS_PATHS.indexOf(ALL_ASSETS_PATHS[i]) != -1)
            {
                assetType = ADDITIONAL_IMAGE_ASSET;
                originalImageLink = ALL_ASSETS_PATHS[i];
            }
            else if (SOUNDS_PATHS.indexOf(ALL_ASSETS_PATHS[i]) != -1)                          
            {
                assetType = SOUND_ASSET;
                if (ALL_ASSETS_PATHS[i] === SOUND_CLICK_PATH)
                {
                    soundType = SOUND_CLICK_PATH;
                }
                else if (ALL_ASSETS_PATHS[i] === SOUND_GUESSED_PATH)
                {
                    soundType = SOUND_GUESSED_PATH;
                }
                else if (ALL_ASSETS_PATHS[i] === SOUND_LOSE_PATH)
                {
                    soundType = SOUND_LOSE_PATH;
                }
                else if (ALL_ASSETS_PATHS[i] === SOUND_LEVEL_UP_PATH)
                {
                    soundType = SOUND_LEVEL_UP_PATH;
                }
                else if (ALL_ASSETS_PATHS[i] === SOUND_GAME_LOSE_PATH)
                {
                    soundType = SOUND_GAME_LOSE_PATH;
                }
            }
            
            xmlHttp.assetType = assetType;
            xmlHttp.soundType = soundType;
            xmlHttp.originalImageLink = originalImageLink;

            xmlHttp.open('GET', ALL_ASSETS_PATHS[i], true);
            xmlHttp.responseType = 'arraybuffer';

            xmlHttp.onprogress = function (e)
            {
                if (e.lengthComputable)
                {
                    this.currentProgress = e.loaded / e.total;
                    thisInstance.updateLoadingProgress();
                }
            };

            xmlHttp.onload = function (e)
            {
                var blob = new Blob([this.response]);
                var blobLink = window.URL.createObjectURL(blob);

                if (this.assetType === IMAGE_PANEL_ASSET)
                {
                    thisInstance.graphicAssets.push({ blob: blob, blobLink: blobLink, index: this.index });

                    if (thisInstance.graphicAssets.length >= IMAGE_PATHS.length)  // if loading of all gallows images is finished sort them and set their predefined percent widths
                    {
                        thisInstance.graphicAssets.sort((a, b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0));
                        for(var i = 0; i < thisInstance.graphicAssets.length; i++)
                        {
                            thisInstance.graphicAssets[i].widthPercent = IMAGE_PANEL_ELEMENTS_PERCENT_DIMENSONS[i];
                        }
                    }
                }
                else if (this.assetType === ADDITIONAL_IMAGE_ASSET)
                {
                    thisInstance.additionalGraphicAssets.push({ blob: blob, blobLink: blobLink, index: this.index, originalLink: this.originalImageLink });
                }
                else if (this.assetType === SOUND_ASSET)
                {
                    thisInstance.soundAssets.push({ blob: blob, blobLink: blobLink, index: this.index, soundType: this.soundType });
                }

                thisInstance.resourcesLoaded++;
                if (thisInstance.resourcesLoaded >= ALL_ASSETS_PATHS.length)
                {
                    startGameCallback();
                }
            };

            this.loaders.push(xmlHttp);

            xmlHttp.send();
        }
    }

    updateLoadingProgress()
    {
        var imagesLoadingProgress = 0;
        for (var i = 0; i < this.loaders.length; i++)
        {
            imagesLoadingProgress += this.loaders[i].currentProgress * 100;
        }

        imagesLoadingProgress /= this.loaders.length;

        this.preloader.updatePreloader(imagesLoadingProgress);
    }

    startApp()
    {
        this.soundManager = new SoundManager(this.soundAssets);

        this.preloader.clear();
        this.preloader = null;
      
        this.setScreen(START_SCREEN_TYPE);
    }

    setScreen(screenType) // here screens are switched, they are not kept in memory, but destroyed and later recreated
    {
        this.clearScreens();

        if (screenType === START_SCREEN_TYPE)
        {
            this.screensObject.startScreen = new StartScreen(this.globalContainer, this.exitScreenHandler, this.soundManager, this.additionalGraphicAssets);
        }
        else if (screenType === GAME_SCREEN_TYPE)
        {
            var scrDimensions = { resX: this.screenResolutionX, resY: this.screenResolutionY };
            this.screensObject.gameScreen = new GameScreen(this.globalContainer, this.exitScreenHandler, this.graphicAssets, this.additionalGraphicAssets,
                this.soundManager, this.gameModel, scrDimensions);
        }

        this.onWindowResize(null);
    }

    clearScreens()
    {
        for (var currentScreen in this.screensObject)
        {
            if (this.screensObject.hasOwnProperty(currentScreen))
            {
                if (this.screensObject[currentScreen])
                {
                    this.screensObject[currentScreen].clear();
                    this.screensObject[currentScreen] = null;
                }
            }
        }
    }

    exitScreenHandler(screenType) // handler given to screen objects
    {
        if (screenType === START_SCREEN_TYPE)
        {
            this.setScreen(GAME_SCREEN_TYPE);
        }
        else if (screenType === GAME_SCREEN_TYPE)
        {
            this.setScreen(START_SCREEN_TYPE);
        }
    }

    onWindowResize(e) // values are taken only here, then propagaded along objects, so this is the place to control game dimensions
    {
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if(this.preloader)
        {
            this.preloader.resize(this.windowWidth, this.windowHeight)
        }

        for (var currentScreen in this.screensObject)
        {
            if (this.screensObject[currentScreen] && this.screensObject.hasOwnProperty(currentScreen))
            {            
                this.screensObject[currentScreen].resize(this.windowWidth, this.windowHeight);                             
            }
        }
    }
}

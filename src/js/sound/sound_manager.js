const SOUND_CLICK_PATH = require("../model/globals").SOUND_CLICK_PATH;
const SOUND_LOSE_PATH = require("../model/globals").SOUND_LOSE_PATH;
const SOUND_GUESSED_PATH = require("../model/globals").SOUND_GUESSED_PATH;
const SOUND_LEVEL_UP_PATH = require("../model/globals").SOUND_LEVEL_UP_PATH;
const SOUND_GAME_LOSE_PATH = require("../model/globals").SOUND_GAME_LOSE_PATH;

const SOUND_GUESSED_ID = require("../model/globals").SOUND_GUESSED_ID;
const SOUND_LOSE_ID = require("../model/globals").SOUND_LOSE_ID;
const SOUND_CLICK_ID = require("../model/globals").SOUND_CLICK_ID;
const SOUND_LEVEL_UP_ID = require("../model/globals").SOUND_LEVEL_UP_ID;
const SOUND_GAME_LOSE_ID = require("../model/globals").SOUND_GAME_LOSE_ID;

let instance;

module.exports = class SoundManager
{
    constructor(soundAssets)
    {
        if (instance)
        {
            return instance;
        }

        instance = this;

        this.playClickSound = this.playClickSound.bind(this);

        this.soundAssets = soundAssets;
        this.soundWin;
        this.soundLose;
        this.soundClick;
        this.soundLevelUp;
        this.soundGameLose;

        for(var i = 0; i < this.soundAssets.length; i++)
        {
            if(this.soundAssets[i].soundType === SOUND_GUESSED_PATH)
            {
                this.soundWin = this.createSound(this.soundAssets[i].blobLink);
                this.soundWin.volume = 0.5;
            }
            else if(this.soundAssets[i].soundType === SOUND_LOSE_PATH)
            {
                this.soundLose = this.createSound(this.soundAssets[i].blobLink);
                this.soundLose.volume = 0.3;
            }
            else if(this.soundAssets[i].soundType === SOUND_CLICK_PATH)
            {
                this.soundClick = this.createSound(this.soundAssets[i].blobLink);
                this.soundClick.volume = 0.7;
            }
            else if(this.soundAssets[i].soundType === SOUND_LEVEL_UP_PATH)
            {
                this.soundLevelUp = this.createSound(this.soundAssets[i].blobLink);
                this.soundLevelUp.volume = 0.7;
            }
            else if(this.soundAssets[i].soundType === SOUND_GAME_LOSE_PATH)
            {
                this.soundGameLose = this.createSound(this.soundAssets[i].blobLink);
                this.soundGameLose.volume = 0.7;
            }
        }
    }

    playClickSound()
    {
        this.soundClick.play();
    }

    playSound(soundID)
    {
        switch(soundID)
        {
            case SOUND_GUESSED_ID:
                this.soundWin.play();
                break;

            case SOUND_LOSE_ID:
                this.soundLose.play();
                break;

            case SOUND_CLICK_ID:
                this.soundClick.play();
                break;

            case SOUND_LEVEL_UP_ID:
                this.soundLevelUp.play();
                break;

            case SOUND_GAME_LOSE_ID:
                this.soundGameLose.play();
                break;
        }
    }

    createSound(src) {
        var sound = document.createElement("audio");
        sound.src = src;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        
        return(sound);
      }

      clear()
      {
        Sound.removeAllSounds();
      }
}
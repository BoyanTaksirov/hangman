const Controller = require("./controller/controller");
const css  = require("../styles/hangman_styles.css");
const FontTrashhand = require("../fonts/trashhand.woff");

var controller;

window.onload = () => { initApp() }

function initApp()
{
    //screen.orientation.lock('landscape-primary');

    createController();
}

function createController()
{
    controller = new Controller();
}
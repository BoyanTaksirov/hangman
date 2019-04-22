const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const ProgressBar = require("./progress_bar");

module.exports = class Preloader{
    constructor()
    {      
        this.resize = this.resize.bind(this);

        this.container = $("<div/>").addClass(CLASS_NAMES.PreloaderBkg);
        this.label = $("<div/>").addClass(CLASS_NAMES.PreloaderLabel);
        this.container.append(this.label);

        this.progressBar = new ProgressBar(this.container);

        this.updatePreloader(0);
    }

    resize(windowWidth, windowHeight)
    {
        this.container.css({width: windowWidth, height: windowHeight});
    }

    updatePreloader(progress)
    {
        var progresRounded = Math.round(progress);
        this.label.text("loaded: " + progresRounded + "%");
        this.progressBar.updateProgressBar(progress);
    }

    addToContainer(parentContainer)
    {
        this.parentContainer = parentContainer;
        this.parentContainer.append(this.container);
    }

    clear()
    {
        window.removeEventListener("resize", this.resize);
        this.container.remove();
        this.container.empty();
        this.progressBar.clear();
    }
}
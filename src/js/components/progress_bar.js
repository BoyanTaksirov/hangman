const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;

module.exports = class ProgressBar
{
    constructor(parentContainer)
    {
        this.outerDiv = $("<div/>").addClass(CLASS_NAMES.PreloaderOuterPB);
        this.innerDiv = $("<div/>").addClass(CLASS_NAMES.PreloaderInnerPB);

        this.outerDiv.append(this.innerDiv);

        parentContainer.append(this.outerDiv);
    }

    updateProgressBar(progress)
    {
        this.innerDiv.css({width: progress + "%"});
    }

    clear()
    {
        this.outerDiv.empty();
        this.outerDiv.remove();
    }
}
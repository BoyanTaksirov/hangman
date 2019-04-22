module.exports = class ImageButtonStateData
{
    constructor(buttonLabel, stateHandler = null, buttonCSSData = null, imageSource = null, inactive = null)
    {
        this.buttonLabel = buttonLabel;
        this.stateHandler = stateHandler;
        this.buttonCSSData = buttonCSSData;
        this.imageSource = imageSource;
        this.inactive = inactive;
    }
}
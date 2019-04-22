module.exports = class ButtonStateData
{
    constructor(buttonLabel, stateHandler = null, buttonClassName = null)
    {
        this.buttonLabel = buttonLabel;
        this.stateHandler = stateHandler;
        this.buttonClassName = buttonClassName;
    }
}
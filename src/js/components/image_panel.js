const $ = require("jquery");
const ImageElement = require("./image_element");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;

module.exports = class ImagePanel
{
    constructor(imageAssets, scrDimensions)
    {
        this.imageAssets = imageAssets;
        this.screenDimensions = scrDimensions;
        this.container = $("<div/>").addClass(CLASS_NAMES.ImagePanel);
        this.imageParts = [];
        this.panelHeight = scrDimensions.resY*0.5;
        this.panelWidth = this.panelHeight;
        this.createElements();
        this.arrangeElements();
    }

    addToContainer(parentContainer)
    {
        this.parentContainer = parentContainer;
        this.parentContainer.append(this.container);
    }

    createElements()
    {
        for(var i = 0; i < this.imageAssets.length; i++)
        {
            var imgElem = new ImageElement(this.container, i, this.imageAssets[i].blobLink, this.imageAssets[i].widthPercent, this.panelHeight);
            this.imageParts.push(imgElem);
        }
    }

    arrangeElements()
    {
        this.imageParts[0].setCoordinates(0.09*this.panelWidth, 0.82*this.panelHeight);
        this.imageParts[1].setCoordinates(0.55*this.panelWidth, 0.82*this.panelHeight);
        this.imageParts[2].setCoordinates(0.20*this.panelWidth, 0.04*this.panelHeight);
        this.imageParts[3].setCoordinates(0.19*this.panelWidth, 0.1*this.panelHeight);
        this.imageParts[4].setCoordinates(0.18*this.panelWidth, 0.05*this.panelHeight);
        this.imageParts[5].setCoordinates(0.67*this.panelWidth, 0.11*this.panelHeight);
        this.imageParts[6].setCoordinates(0.64*this.panelWidth, 0.30*this.panelHeight);
    }

    resetPanel()
    {
        for(var i = 0; i < this.imageParts.length; i++)
        {
            this.imageParts[i].hide();
            this.imageParts[i].restoreState();
        }
    }

    hideElements()
    {
        for(var i = 0; i < this.imageParts.length; i++)
        {
            this.imageParts[i].hide();
        }
    }

    showElements()
    {
        for(var i = 0; i < this.imageParts.length; i++)
        {
            this.imageParts[i].show();
        }
    }

    showElement(elementIndex)
    {
        this.imageParts[elementIndex].show();
    }

    startEndingAnimation()
    {
        this.imageParts[1].startAnimation();
        this.imageParts[6].startSwingingAnimation();
    }

    resize(containerHeight)
    {
        this.panelHeight = containerHeight;
        this.panelWidth = this.panelHeight; 
        
        this.container.css({
            width: this.panelWidth + "px", 
            height: this.panelHeight + "px",
        });

        for(var i = 0; i < this.imageParts.length; i++)
        {
            this.imageParts[i].resize(this.panelHeight);
        }
    }

    clear()
    {
        for(var i = 0; i < this.imageParts.length; i++)
        {
            this.imageParts[i].clear();
        }

        this.imageParts = null;
    }
}
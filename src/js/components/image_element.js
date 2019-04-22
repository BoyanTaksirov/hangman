const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;

module.exports = class ImageElement
{
    constructor(parentContainer, ID, src, imagePercentWidth, parentWidth)
    {
        this.parentContainer = parentContainer;
        this.ID = ID;

        this.onImageLoad = this.onImageLoad.bind(this);

        this.image = $("<img/>").addClass(CLASS_NAMES.ImageElement);
        this.image.on("load", this.onImageLoad);
        this.parentContainer.append(this.image);
        this.imagePercentWidth = imagePercentWidth;
        this.parentWidth = parentWidth;

        this.displaced = false;

        this.currentCoordinates = { left: 0, top: 0 };

        this.hide();

        this.setImageSrc(src);
    }

    setImageSrc(src)
    {
        this.image.attr("src", src);
    }

    onImageLoad(e)
    {
        this.setDimensions();
    }

    setDimensions()
    {
        this.image[0].width = this.parentWidth * this.imagePercentWidth;
    }

    setCoordinates(left, top)
    {
        this.currentCoordinates = { left: left, top: top };
        this.image.css({ "left": left, "top": top });
    }

    restoreState()
    {
        this.image.css({ "left": this.currentCoordinates.left, "top": this.currentCoordinates.top });
        this.image[0].style.animation = "";
        this.displaced = false;
    }

    startAnimation()
    {
        this.image.animate({ left: "+=50%" }, 300);
        this.displaced = true;
    }

    startSwingingAnimation()
    {
        this.image.css("transform-origin", "top center");
        this.image[0].style.animation = "swingAnim 1.5s linear 0s infinite normal";
    }

    startIntroAnimation()
    {
        this.image.css("transform-origin", "bottom center");
        this.image[0].style.animation = "introAnim 0.1s ease-out 0s 1 normal";
    }

    getCoords()
    {
        return this.image.position();
    }

    show()
    {
        this.image.show();
        this.startIntroAnimation();
    }

    hide()
    {
        this.image.hide();
    }

    resize(newParentWidth)
    {
        var newLeft = this.currentCoordinates.left *= (newParentWidth / this.parentWidth);
        var newTop = this.currentCoordinates.top *= (newParentWidth / this.parentWidth);
        this.parentWidth = newParentWidth;
        this.setDimensions();
        if (!this.displaced)
        {
            this.setCoordinates(newLeft, newTop);
        }
    }

    clear()
    {
        this.image.off();
        this.image.remove();
    }
}
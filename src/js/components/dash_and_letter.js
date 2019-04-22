const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;

module.exports = class DashAndLetter
{
    constructor(letterSymbol, lineLink, parentContainer)
    {
        this.letterSymbol = letterSymbol;
        this.container = $("<div/>").addClass(CLASS_NAMES.DashAndLetterContainer);
        this.letter = $("<div/>").addClass(CLASS_NAMES.Letter);
        this.letter.text(this.letterSymbol);

        this.lineLink = lineLink;
        
        this.dash = $("<img/>").addClass(CLASS_NAMES.Dash);
        this.dash.attr("src",  this.lineLink);

        this.container.append(this.letter);
        this.container.append(this.dash);

        this.VISIBLE = false;

        if(this.letter.text() === " ")
        {
            this.dash.css("visibility", "hidden");
        }

        this.toggleLetterVisibility(false);

        this.addToContainer(parentContainer);
    }

    addToContainer(parentContainer)
    {
        this.parentContainer = parentContainer;
        this.parentContainer.append(this.container);
    }

    toggleLetterVisibility(isVisible)
    {
        if(isVisible)
        {
            this.letter.css("visibility", "visible");
            this.VISIBLE = true;
        }
        else
        {
            this.letter.css("visibility", "hidden");
            this.VISIBLE = false;
        }
    }

    changeLetterColor(color)
    {
        this.letter.css("color", color);
    }

    resize(newWidth)
    {
        var containerHeight = newWidth*1.15
        var containerWidth = newWidth

        var letterWidth = containerWidth;
        var letterHeight = containerHeight*0.87;

        var dashHeight = (containerHeight - letterHeight);

        this.container.css({width: containerWidth,
                            height: containerHeight});

        this.letter.css({width: letterWidth,
                         height: letterHeight,
                         fontSize: letterHeight*1.1 + "px"});

        this.dash.css({height: dashHeight});
    }

    clear()
    {
        this.container.remove();
        this.container.empty();
    }
}
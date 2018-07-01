// call writeFile from somewhere in your plugin code
function caaRenditions(selection, canvas) {

    console.log("CAA Renditions plugin executed");
    console.log("edit context: ");
    console.log(selection.editContext);

    console.log("Selected items count: " + selection.items.length)
};

return {
    commands: {
        "CAARenditionsCommnad": caaRenditions
    }
};
/*
*   selectParent
*
*   Recursive function to select each parent up to the document canvas
*/
function selectParent(node, selection) {
    if (node.parent && ! (node instanceof sg.Artboard)) {
        if (node.parent === gEditContextNode) {
            console.log("selectParent reached the editContext");
            console.log(node.parent);
        }
        console.log("Try to select the node parent: " + node.parent.name);
        //console.log(node.parent);
        try {
            selection.items = [node.parent];
            console.log("Assigned parent node as the selection");
            selectParent(node.parent, selection);
        } catch(err) {
            console.log("Failed to assign parent node as the selection: " + err);
        }
    } else {
        console.log(node.name + " doesn't have a parent");
    }
}

/*
*   editParent
*
*   Recursive function to edit each parent up to the document canvas
*/
function editParent(node, editFunction = undefined) {
    if (node.parent && !(node instanceof sg.Artboard)) {
        console.log("Try to edit the node parent: " + node.parent.name);
        //console.log(node.parent);
        try {
            if (editFunction) {
                editFunction(node);
            }
            node.fill = new sg.Color("#115588");
            node.fill = new sg.Color("#885511");
            console.log("Assigned node stroke and fill");
            editParent(node.parent);
        } catch(err) {
            console.log("Failed to edit parent node: " + err);
        }
    } else {
        console.log(node.name + " doesn't have a parent");
    }
}

/*
*   selectChildren
*
*   Recursive function to select each child until we reach the last node of the hiararchy
*/
function selectChildren(node, selection) {
    if (node.children) {
        console.log("Try to select the node children of: " + node.name);
        try {
            // node.children is not an array
            var childNodes = [];
            node.children.forEach(function(childNode) {
                childNodes.push(childNode);
            })
            selection.items = childNodes;
            console.log("Assigned child nodes as the selection");
            node.children.forEach(function(childNode) {
                selectChildren(node, selection);
            });
        } catch(err) {
            console.log("Failed to set selection to node children: " + err);
        }
    } else {
        console.log(node.name + " doesn't have children");
    }
}

/*
*   editChildren
*
*   Recursive function to edit each child until we reach the last node of the hiararchy
*/
function editChildren(node) {
    if (node.children) {
        console.log("Try to edit the node children of: " + node.name);
        try {
            node.children.forEach(function(childNode) {
                try {
                    childNode.fill = new sg.Color("#115588");
                    childNode.fill = new sg.Color("#885511");
                    console.log("Assigned stroke and fill to childNode: " + childNode.name);    
                } catch (err) {
                    console.log("Failed to edit childNode: " + childNode.name + " Error: " + err);
                }
               editChildren(childNode);
            });
        } catch(err) {
            console.log("Failed to edit node children: " + err);
        }
    } else {
        console.log(node.name + " doesn't have children");
    }
}

/*
*   selectSiblings
*
*   Function to select each node with the same parent of the provided node
*/
function selectSiblings(node, selection) {
    if (node.parent && !(node instanceof sg.Artboard)) {
        var siblingNodes = [];
        node.parent.children.forEach(function(siblingNode) {
            if (siblingNode != node) {
                siblingNodes.push(siblingNode);
            }
        });
        if (siblingNodes.length) {
            try {
                selection.items = siblingNodes;
                console.log("Selected siblings of " + node.name);
            } catch (err) {
                console.log("Failed to select siblings of " + node.name + " Error: " + err);
            }
        } else {
            console.log("No sublings for " + node.name);
        }
    }
}

/*
*   editSiblings
*
*   Function to edit each node with the same parent of the provided node
*/
function editSiblings(node) {
    if (node.parent && !(node instanceof sg.Artboard)) {
        node.parent.children.forEach(function(siblingNode) {
            if (siblingNode != node) {
                try {
                    siblingNode.fill = new sg.Color("#115588");
                    siblingNode.fill = new sg.Color("#885511");
                    console.log("Assigned stroke and fill to siblingNode: " + siblingNode.name);    
                } catch (err) {
                    console.log("Failed to edit siblingNode: " + siblingNode.name + " Error: " + err);
                }
            }
        });
    }
}


function validateEditContext(editContextNode) {
    // valiodate you can select/edit any child within the edit context hierarchy
    // excpet for children of containers
    
}

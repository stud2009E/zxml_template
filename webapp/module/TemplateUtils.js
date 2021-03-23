sap.ui.define([], function(){
    "use strict";

    function exampleFormatter(oDataField){
        var sPath = oDataField.Value && oDataField.Value.Path;

        return "{" + sPath + "}";
    }

    function getNavigationPath(){

    }

    return {
        exampleFormatter: exampleFormatter,
        getNavigationPath: getNavigationPath
    };

}, true);
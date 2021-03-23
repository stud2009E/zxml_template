sap.ui.define([
    "sap/ui/core/UIComponent",
	"sap/m/VBox",
	"sap/ui/core/mvc/View",
	"sap/ui/core/mvc/ViewType",
	"z/xml/tmpl/module/TemplateUtils"
], function (
    UIComponent,
	VBox,
	View,
	ViewType,
	TemplateUtils
) {
	"use strict";

	return UIComponent.extend("z.xml.tmpl.Component", {

		metadata : {
			manifest : "json"
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
		},

		createContent: function(){
			var oContainer = new VBox();
			var oModel = this.getModel();
			var oMetaModel = oModel.getMetaModel();
			var sPath = null;

			oMetaModel.loaded().then(function(){
				return oModel.annotationsLoaded();
			}).then(function(){

				sPath = oModel.createKey("/TestDataSet", {
					Guid: "1f707e91-0fef-4c88-ade1-65e932921a25"
				});

				return View.create({
					type: ViewType.XML,
					viewName: "z.xml.tmpl.view.Template",
					preprocessors: {
						xml: {
							bindingContexts:{
								meta: oMetaModel.getMetaContext(sPath)
							},
							models: {
								meta: oMetaModel
							}
						}
					}
				});
			}).then(function(oView){
				oView.bindElement({
					path: sPath
				});
				oContainer.addItem(oView);
			});

			return oContainer;
		}


	});
});
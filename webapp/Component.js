sap.ui.define([
    "sap/ui/core/UIComponent",
	"sap/m/Page",
	"sap/ui/core/mvc/View",
	"sap/ui/core/mvc/ViewType",
	"z/xml/tmpl/module/TemplateUtils",
	"z/xml/tmpl/module/Models"
], function (
    UIComponent,
	Page,
	View,
	ViewType,
	TemplateUtils,
	Models
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
			var oContainer = new Page();
			var oModel = this.getModel();
			var oMetaModel = oModel.getMetaModel();
			var sPath = null;

			var oDeviceModel = Models.createDeviceModel();
			this.setModel(oDeviceModel, "device");

			oMetaModel.loaded().then(function(){
				return oModel.annotationsLoaded();
			}).then(function(){

				sPath = oModel.createKey("/HeaderSet", {
					Guid: "1f707e91-0fef-4c88-ade1-65e932921a25"
				});

				return View.create({
					type: ViewType.XML,
					viewName: "z.xml.tmpl.view.Template",
					preprocessors: {
						xml: {
							bindingContexts:{
								meta: oMetaModel.getMetaContext(sPath),
								device: oDeviceModel.createBindingContext("/system")
							},
							models: {
								meta: oMetaModel,
								device: oDeviceModel
							}
						}
					}
				});
			}).then(function(oView){
				oView.bindElement({
					path: sPath
				});
				oContainer.addContent(oView);
			});

			return oContainer;
		}


	});
});
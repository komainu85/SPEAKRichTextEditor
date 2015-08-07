require.config({
    paths: {
        "Quill": "/sitecore/shell/client/MikeRobbins/Components/RichTextEditor/quill/dist/quill"
    }
});

define(["sitecore", "jquery", "Quill"], function (Sitecore, jQuery, Quill) {

    var model = Sitecore.Definitions.Models.ControlModel.extend({
        initialize: function (options) {
            this._super();

            this.set("width", null);
            this.set("height", null);

        }
 
    });


    var view = Sitecore.Definitions.Views.ControlView.extend({
        initialize: function (options) {
            this._super();

            this.model.set("width", this.$el.data("sc-width"));
            this.model.set("height", this.$el.data("sc-height"));

            var fullEditor = new Quill('#full-editor', {
                theme: 'snow'
            });

            fullEditor.addModule('toolbar', {
                container: '#toolbar'     // Selector for toolbar container
            });

        }
    });

    Sitecore.Factories.createComponent("RichTextEditor", model, view, ".sc-RichTextEditor");
});
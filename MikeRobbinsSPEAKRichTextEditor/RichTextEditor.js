require.config({
    paths: {
        "tinymce": "/sitecore/shell/client/MikeRobbins/Components/RichTextEditor/tinymce/tinymce.min"
    }
});

define(["sitecore", "jquery", "tinymce"], function (Sitecore, jQuery, tinymce) {

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
            this.model.set("text", this.$el.val());
            this.model.set("width", this.$el.data("sc-width"));
            this.model.set("height", this.$el.data("sc-height"));

            tinyMCE.init({
                selector: "#mytextarea",
                height: this.model.viewModel.height,
                width: this.model.viewModel.width
            });

        }
    });

    Sitecore.Factories.createComponent("RichTextEditor", model, view, ".sc-RichTextEditor");
});
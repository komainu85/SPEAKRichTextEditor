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
            this.set("browsers", "msie,gecko,safari,opera");
            this.set("language", "en");

            this.set("browserspellcheck", null);
            this.on("change:text", this.UpdateRichText, this);
        },

        UpdateRichText: function (context) {
            if (context.viewModel.text != null) {
                tinyMCE.get(context.id).setContent(context.viewModel.text())
            }
        },

        UpdateText: function (content) {
            this.viewModel.text(content);
        }
    });

    var view = Sitecore.Definitions.Views.ControlView.extend({
        initialize: function (options) {
            this._super();
            this.model.set("text", this.$el.val());
            this.model.set("width", this.$el.data("sc-width"));
            this.model.set("height", this.$el.data("sc-height"));
            this.model.set("id", this.$el.data("sc-id"));

            var spell = this.$el.data("sc-browser-spellcheck") == "0";

            this.model.set("browserspellcheck", spell);

            this.model.set("browsers", this.$el.data("sc-browsers"));
            this.model.set("language", this.$el.data("sc-language"));

            var id = "#" + this.model.viewModel.id();

            tinyMCE.init({
                selector: id,
                height: this.model.viewModel.height(),
                width: this.model.viewModel.width(),
                browser_spellcheck: this.model.viewModel.browserspellcheck(),
                speakContext: this,
                setup: function (ed) {
                    ed.on('change', function (e, that) {
                        e.target.settings.speakContext.model.UpdateText(e.target.getContent());
                    })
                }
            });

        }


    });

    Sitecore.Factories.createComponent("RichTextEditor", model, view, ".sc-RichTextEditor");
});
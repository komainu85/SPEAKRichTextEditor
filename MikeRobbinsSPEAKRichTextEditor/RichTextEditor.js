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
            this.set("browserspellcheck", null);
            this.set("resize", null);
            this.on("change:text", this.UpdateRichText, this);
        },

        UpdateRichText: function (context) {
            if (context.viewModel.text != null) {
                tinyMCE.get(context.id).setContent(context.viewModel.text());
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
            this.model.set("resize", this.$el.data("sc-resize"));
            this.model.set("id", this.$el.data("sc-id"));

            var spell = this.$el.data("sc-browser-spellcheck") == "0";

            this.model.set("browserspellcheck", spell);

            var id = "#" + this.model.viewModel.id();

            tinyMCE.init({
                selector: id,
                height: this.model.viewModel.height(),
                width: this.model.viewModel.width(),
                resize: this.model.viewModel.resize(),
                browser_spellcheck: this.model.viewModel.browserspellcheck(),
                speakContext: this,
                plugins: 'code',
                setup: function (ed) {
                    ed.on('change', function(e) {
                        e.target.settings.speakContext.model.UpdateText(e.target.getContent());
                    });
                }
            });

        }


    });

    Sitecore.Factories.createComponent("RichTextEditor", model, view, ".sc-RichTextEditor");
});
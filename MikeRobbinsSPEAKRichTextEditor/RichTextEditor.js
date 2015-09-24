(function (Speak) {
    require.config({
        paths: {
            "tinyMCE": "/sitecore/shell/client/MikeRobbins/Components/RichTextEditor/tinymce/tinymce.min"
        }
    });

    Speak.component(["tinyMCE"], function (tinyMCE) {
        return Speak.extend({}, Collection.prototype, {
            initialize: function (options) {
                this._super();
                this.defineProperty("width", null);
                this.defineProperty("height", null);
                this.defineProperty("browserspellcheck", null);
                this.defineProperty("resize", null);
                this.defineProperty("plugins", null);
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
    }, "RichTextEditor");
})(Sitecore.Speak);


//    var view = Sitecore.Definitions.Views.ControlView.extend({
//        initialize: function (options) {
//            this._super();
//            this.model.set("text", this.$el.val());
//            this.model.set("width", this.$el.data("sc-width"));
//            this.model.set("height", this.$el.data("sc-height"));
//            this.model.set("resize", this.$el.data("sc-resize"));
//            this.model.set("id", this.$el.data("sc-id"));
//            this.model.set("plugins", this.$el.data("sc-plugins"));

//            var spell = this.$el.data("sc-browser-spellcheck") == "0";

//            this.model.set("browserspellcheck", spell);

//            var id = "#" + this.model.viewModel.id();

//            tinyMCE.init({
//                selector: id,
//                height: this.model.viewModel.height(),
//                width: this.model.viewModel.width(),
//                resize: this.model.viewModel.resize(),
//                browser_spellcheck: this.model.viewModel.browserspellcheck(),
//                speakContext: this,
//                plugins: this.model.viewModel.plugins(),
//                setup: function (ed) {
//                    ed.on('change', function (e) {
//                        e.target.settings.speakContext.model.UpdateText(e.target.getContent());
//                    });
//                }
//            });

//        }


//    });

//    Sitecore.Factories.createComponent("RichTextEditor", model, view, ".sc-RichTextEditor");
//});
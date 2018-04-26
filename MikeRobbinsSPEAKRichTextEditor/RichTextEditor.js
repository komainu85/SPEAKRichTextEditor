(function (Speak) {
    require.config({
        paths: {
            tinyMCE: "/sitecore/shell/client/MikeRobbins/Components/RichTextEditor/tinymce/tinymce.min",
            bclCollection: "/sitecore/shell/client/Business Component Library/version 2/Layouts/Renderings/Mixins/Collection"
        }
    });

    Speak.component(["bclCollection", "tinyMCE"], function (Collection, tinyMCE) {
        return Speak.extend({}, Collection.prototype, {
            initialized: function () {
                this.on("change:text", this.UpdateRichText);

                var spell = this.Browserspellcheck == "0";

                tinymce.init({
                    selector: "#" + this.id,
                    height: this.Height,
                    width: this.Width,
                    resize: this.Resize,
                    browser_spellcheck: spell,
                    speakContext: this,
                    plugins: this.Plugins,
                    setup: function (ed) {
                        ed.on('change', function (e) {
                            e.target.settings.speakContext.UpdateText(e.target.getContent());
                        });
                    }
                });
            },

            UpdateRichText: function () {
                tinymce.get(this.id).setContent(this.Text);
            },

            UpdateText: function (content) {
                this.Text = content;
            }
        });
    }, "RichTextEditor");
})(Sitecore.Speak);

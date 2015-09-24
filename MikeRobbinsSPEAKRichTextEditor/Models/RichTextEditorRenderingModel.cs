using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Speak.Components.Models;

namespace MikeRobbinsSPEAKRichTextEditor.Models
{
    public class RichTextEditorRenderingModel : CollectionBaseRenderingModel
    {
        public string Width { get; set; }

        public string Height { get; set; }

        public string Resize { get; set; }

        public string Plugins { get; set; }
    }
}
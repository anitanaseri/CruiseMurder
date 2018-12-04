using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SceneItem
    {
        public string SceneContent { get; set; }
<<<<<<< HEAD
        public string SceneImage { get; set; }
        public string EndingType { get; set; }
        public int SceneId { get; set; }
=======
        public int SceneId { get; set; }
        public string SceneImage { get; set; }
        public string EndingType { get; set; }
>>>>>>> with_text_image
        public List<ChoiceItem> Choices { get; set; }
    }
}

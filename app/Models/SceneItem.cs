using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SceneItem
    {
        public string SceneContent { get; set; }
        public string SceneImage { get; set; }
        public string EndingType { get; set; }
        public string SceneLocation { get; set; }
        public int SceneId { get; set; }
        public List<ChoiceItem> Choices { get; set; }
    }
}

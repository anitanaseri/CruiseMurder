using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SceneItem
    {
        public string SceneContent { get; set; }
        public List<string> Choices { get; set; }
    }
}

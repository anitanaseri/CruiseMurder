using System;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using WebApplication1.Controllers;

namespace backend.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            int sample_id = 1;
            var sample_scenecontroller = new ScenesController();
            string sample_result = sample_scenecontroller.Get(sample_id).ToString();
            //need to validate if get() actually return a json string
            //
            //SceneItem sample_item = Newtonsoft.Json.JsonConvert.DeserializeObject<SceneItem>(sample_result);
            string scene_content = sample_result;
            string sample_scene_content = " ";
            Assert.Equal(sample_scene_content, scene_content);
        }
        [Fact]
        public void Test2()
        { 
        }
    }
}

using Newtonsoft.Json;
using System;

namespace SignalR.ChatHub
{
	public class MessageObject
	{
		[JsonProperty("userId")]
		public string UserId { get; set; }

        [JsonProperty("prevX")]
        public int PrevX { get; set; }

        [JsonProperty("prevY")]
        public int PrevY { get; set; }

        [JsonProperty("currentX")]
        public int CurrentX { get; set; }

        [JsonProperty("currentY")]
        public int CurrentY { get; set; }

        [JsonProperty("color")]
        public string Color { get; set; }
    }
}
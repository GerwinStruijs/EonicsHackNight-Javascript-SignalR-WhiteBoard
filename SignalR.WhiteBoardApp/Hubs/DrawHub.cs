using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WhiteBoard.Hubs
{
    public class DrawHub : Hub
    {
        public Task Draw(int prevX, int prevY, int currentX, int currentY, string color)
        {
            return Clients.All.SendAsync("draw", prevX, prevY, currentX, currentY, color);
        }
    }
}

using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using WhiteBoard.Hubs;

namespace WhiteBoard
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR().AddAzureSignalR(options =>
            {
                options.ConnectionString = "Endpoint=https://eonicshacknight-classic.service.signalr.net;AccessKey=YUfMYMQGcGw09fAadfGEmWUnUNT2hNdwd1IQ9uDAFiQ=;Version=1.0";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            app.UseFileServer();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<DrawHub>("/draw");
            });
        }
    }
}

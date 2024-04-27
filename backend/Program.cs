using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebSockets;
using WebSocketManager;
using ElephantSQL_example;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SignalR;
using websockets;
using ElephantSQL_example.Controllers;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ElephantSQL_example.utilities;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var isDevelopment = builder.Environment.IsDevelopment();

var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile(isDevelopment ?"appsettings.Development.json" : "appsettings.json")
    .Build();



builder.Services.AddControllers();
builder.Services.AddScoped<PersonController>();
builder.Services.AddEndpointsApiExplorer();

//Add caching
// string redisCacheUrl = configuration["RedisCacheUrl"];
// ConfigurationOptions redisConfig = ConfigurationOptions.Parse(redisCacheUrl);
// redisConfig.AbortOnConnectFail = false;


builder.Services.AddStackExchangeRedisCache(options => { options.ConfigurationOptions = redisConfig; });

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
});


//Add websockets
builder.Services.AddSignalR();
builder.Services.AddDbContext<MyDbContext>(options =>
{
    // var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    var connectionString = configuration["DefaultConnection"];
    options.UseNpgsql(connectionString);
}).AddMvc();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();;
                      });
});


//Add webtoken
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
    {
        RequireExpirationTime = true,
        ValidIssuer = "https://localhost:5050/",
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Secret")))

    };
});

builder.Services.AddSingleton<IConfiguration>(configuration);
var app = builder.Build();

if (isDevelopment)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseAuthentication();

// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapHub<SocketHandler>("/chatHub", options =>{
//         options.Transports = HttpTransportType.WebSockets;
//     });
// });

//app.MapHub<ChatHub>("/chatHub");

app.MapControllers();

app.Run();

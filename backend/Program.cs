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

var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.Development.json")
    .Build();



builder.Services.AddControllers();
builder.Services.AddScoped<PersonController>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });


});

builder.Services.AddSignalR();

builder.Services.AddDbContext<MyDbContext>().AddMvc();

string redisCacheUrl = configuration["RedisCacheUrl"];
ConfigurationOptions redisConfig = ConfigurationOptions.Parse(redisCacheUrl);
redisConfig.AbortOnConnectFail = false;

builder.Services.AddStackExchangeRedisCache(options => { options.ConfigurationOptions = redisConfig;});


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();;
                      });
});

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<MyDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    var secret = builder.Configuration.GetValue<string>("Secret");
    var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidAudience = "https://localhost:5050",
        ValidIssuer = "https://localhost:5050/",
        IssuerSigningKey = key,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});




var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SocketHandler>("/chatHub", options =>{
        options.Transports = HttpTransportType.WebSockets;
    });
});

//app.MapHub<ChatHub>("/chatHub");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
using (var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>())
using (var db = scope.ServiceProvider.GetRequiredService<MyDbContext>())
{
   // db.Database.Migrate();
    var user = await userManager.FindByNameAsync(Consts.UserName);

    if (user == null)
    {
        user = new IdentityUser(Consts.UserName);
        await userManager.CreateAsync(user, Consts.Password);
    }
}


app.Run();

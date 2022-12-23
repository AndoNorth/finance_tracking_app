// build and run application
var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);

var app = builder.Build();
startup.Configure(app, app.Environment);

app.MapGet("/api/test", () => "secret").RequireAuthorization();

app.MapPost("/api/login", async context =>
{
    await context.SignInAsync("def", new ClaimsPrincipal(
        new ClaimsIdentity(
                new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString()),
                },
                "def"
            )
        ),
        new AuthenticationProperties()
        {
            IsPersistent = true
        });
});

app.Run();

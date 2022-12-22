using Microsoft.EntityFrameworkCore;
using Backend.Data;

string frontendUrl = "http://localhost:5173";

// define builder services
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add SQL server
builder.Services.AddDbContext<TransactionDbContext>
    (obj => obj.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins(frontendUrl).AllowAnyMethod().AllowAnyHeader();
}));*/

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "dist";
});

// Create app instance
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapDefaultControllerRoute();
});

app.UseSpaStaticFiles();
app.UseSpa(spa =>
{
    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer(frontendUrl);
    }
});

app.Run();

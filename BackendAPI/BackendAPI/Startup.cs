using Microsoft.EntityFrameworkCore;
using Backend.Data;
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        // Add services to the container.
        services.AddControllers();

        // Add SQL server
        services.AddDbContext<TransactionDbContext>
            (obj => obj.UseSqlServer(Configuration.GetConnectionString("SqlServer")));

        // Add CORS
        services.AddCors(options =>
        {
            options.AddPolicy("fe", pb => pb.WithOrigins(Configuration.GetValue<string>("frontendUrl")).AllowCredentials().AllowAnyMethod().AllowAnyHeader());
        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        // use auth
        services.AddAuthentication("def").AddCookie("def");
        services.AddAuthorization();

        // direct to production ready spa static files
        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "dist";
        });
    }
    public void Configure(WebApplication app, IWebHostEnvironment env)
    {
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("fe");

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        });

        app.UseSpaStaticFiles();
        app.UseSpa(spa =>
        {
            if (app.Environment.IsDevelopment())
            {
                spa.UseProxyToSpaDevelopmentServer(Configuration.GetValue<string>("frontendUrl"));
            }
        });
    }
}

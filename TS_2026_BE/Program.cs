using HealthCareInnovation_Services.Healthcare_Automation;

var builder = WebApplication.CreateBuilder(args);

// Force Development environment so Swagger and detailed errors are always available
builder.Environment.EnvironmentName = "Development";

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register application services
builder.Services.AddScoped<IAccountService, AccountService>();

// CORS - allow Angular frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Swagger always enabled (not restricted to Development only)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "HealthCare API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors();
app.UseAuthorization();
app.MapControllers();

app.Run();

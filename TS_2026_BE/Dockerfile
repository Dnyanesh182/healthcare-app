FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["HealthCareInnovation-Services.csproj", "./"]
RUN dotnet restore "HealthCareInnovation-Services.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "HealthCareInnovation-Services.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HealthCareInnovation-Services.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HealthCareInnovation-Services.dll"]

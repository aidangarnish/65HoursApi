using _65Hours.Services.Interfaces;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace _65HoursApi.Controllers
{
    [RoutePrefix("api/Cors")]
    public class ConfigCorsController : ApiController
    {
        private IFileStorageService _fileStorageService;
        public ConfigCorsController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpGet]
        [Route("Config")]
        public IHttpActionResult Config()
        {
            var account = CloudStorageAccount.Parse(
             ConfigurationManager.ConnectionStrings["StorageConnectionString"].ConnectionString);
            var client = account.CreateCloudBlobClient();
            var serviceProperties = client.GetServiceProperties();

            //Configure CORS
            serviceProperties.Cors = new CorsProperties();
            serviceProperties.Cors.CorsRules.Add(new CorsRule()
            {
                AllowedHeaders = new List<string>() { "*" },
                AllowedMethods = CorsHttpMethods.Put | CorsHttpMethods.Get | CorsHttpMethods.Head | CorsHttpMethods.Post,
                AllowedOrigins = new List<string>() { "*" },
                ExposedHeaders = new List<string>() { "*" },
                MaxAgeInSeconds = 3600 // 60 minutes
            });

            client.SetServicePropertiesAsync(serviceProperties);

            return Ok();
        }

    }
}

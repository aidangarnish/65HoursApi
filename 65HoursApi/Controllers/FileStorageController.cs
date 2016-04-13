using _65Hours.Models;
using _65Hours.Services.Interfaces;
using System;
using System.Configuration;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Description;

namespace _65HoursApi.Controllers
{
    //[Authorize]
    [RoutePrefix("api/FileStorage")]
    public class FileStorageController : ApiController
    {
        private IFileStorageService _fileStorageService;
        public FileStorageController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [ResponseType(typeof(StorageResponse))]
        [HttpGet]
        [Route("ClientFileUploadParams")]
        public IHttpActionResult ClientFileUploadParams(string extension)
        {
            Regex rg = new Regex(@"^[a-zA-Z0-9]{1,3}$");
            if (!rg.IsMatch(extension))
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest);
            }

            string profileImageContainer = ConfigurationManager.AppSettings["ProfileImageContainer"];
            
            //Get the SAS token for the container.
            var sasToken = _fileStorageService.GetBlobContainerSasToken(profileImageContainer, true).Data;

            //Get the blob so we can get the full path including container name
            var id = Guid.NewGuid().ToString();
            var newFileName = id + "." + extension;

            string blobURL = _fileStorageService.GetBlobFileUri(profileImageContainer, newFileName).Data.ToString();

            var response = new StorageResponse
            {
                ID = id,
                StorageAccountName = ConfigurationManager.AppSettings["StorageAccountName"],
                BlobURL = blobURL,
                BlobSASToken = sasToken,
                ServerFileName = newFileName
            };

            return Ok(response);

        }
    }
}

using _65Hours.Models.Results;
using _65Hours.Repository.Interfaces;
using _65Hours.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.IO;

namespace _65Hours.Services
{
    public class FileStorageService : IFileStorageService
    {
        private IFileStorageRepository _fileStorageRepository;
        public FileStorageService(IFileStorageRepository fileStorageRepository)
        {
            _fileStorageRepository = fileStorageRepository;
        }

        public ResultT<string> GetBlobContainerSasToken(string container, bool allowWrite = false)
        {
            ResultT<string> result = new ResultT<string> { Status = ResultStatus.Success };

            if (string.IsNullOrEmpty(container))
            {
                result.Status = ResultStatus.InvalidParameter;
                return result;
            }

            result = _fileStorageRepository.GetBlobContainerSasToken(container, allowWrite);

            return result;
        }

       
        public ResultT<string> GetBlobFileSasUri(string container, string fileName, bool allowWrite = false)
        {
            ResultT<string> result = new ResultT<string> { Status = ResultStatus.Success };

            if (string.IsNullOrEmpty(container) || string.IsNullOrEmpty(fileName))
            {
                result.Status = ResultStatus.InvalidParameter;
                return result;
            }

            result = _fileStorageRepository.GetBlobFileSasUri(container, fileName, allowWrite);

            return result;
        }

        public ResultT<Uri> GetBlobFileUri(string containerName, string fileName)
        {
           return _fileStorageRepository.GetBlobFileUri(containerName, fileName);
        }

        public Result UploadFile(string containerName, string fileName, Stream fileStream)
        {
            throw new NotImplementedException();
        }

        public Result UploadFile(string container, string fileName, HttpPostedFileBase file)
        {
            Result result = new Result { Status = ResultStatus.Success };

            if (string.IsNullOrEmpty(container) || string.IsNullOrEmpty(fileName) || file == null)
            {
                result.Status = ResultStatus.InvalidParameter;
                return result;
            }

            result = _fileStorageRepository.UploadFile(container, fileName, file.InputStream);

            return result;
        }
    }
}

using _65Hours.Models.Results;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Repository.Interfaces
{
    public interface IFileStorageRepository
    {
        ResultT<string> GetBlobFileSasUri(string containerName, string fileName, bool allowWrite = false);
        ResultT<string> GetBlobContainerSasUri(string containerName, bool allowWrite = false);
        Result UploadFile(string containerName, string fileName, Stream fileStream);
    }
}

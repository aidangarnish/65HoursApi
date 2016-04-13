using _65Hours.Models.Results;
using System;
using System.IO;

namespace _65Hours.Services.Interfaces
{
    public interface IFileStorageService
    {
        ResultT<string> GetBlobFileSasUri(string containerName, string fileName, bool allowWrite = false);
        ResultT<Uri> GetBlobFileUri(string containerName, string fileName);
        ResultT<string> GetBlobContainerSasToken(string containerName, bool allowWrite = false);
        Result UploadFile(string containerName, string fileName, Stream fileStream);
    }
}

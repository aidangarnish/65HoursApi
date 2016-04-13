using _65Hours.Models.Results;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _65Hours.Repository
{
    public class AzureFileStorageRepository
    {
        CloudStorageAccount _storageAccount;
        CloudBlobClient _blobClient;

        public AzureFileStorageRepository()
        {
            _storageAccount = CloudStorageAccount.Parse(
             ConfigurationManager.ConnectionStrings["StorageConnectionString"].ConnectionString);

            _blobClient = _storageAccount.CreateCloudBlobClient();
        }
        public ResultT<string> GetBlobFileSasUri(string containerName, string fileName, bool allowWrite = false)
        {
            ResultT<string> result = new ResultT<string>();

            try
            {
                //Get a reference to a container to use for the sample code, and create it if it does not exist.
                CloudBlobContainer container = _blobClient.GetContainerReference(containerName);
                container.CreateIfNotExists();

                //Get a reference to a blob within the container.
                CloudBlockBlob blob = container.GetBlockBlobReference(fileName);

                //Set the expiry time and permissions for the blob.
                //In this case the start time is specified as a few minutes in the past, to mitigate clock skew.
                //The shared access signature will be valid immediately.
                SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy();
                sasConstraints.SharedAccessStartTime = DateTime.UtcNow.AddMinutes(-5);
                sasConstraints.SharedAccessExpiryTime = DateTime.UtcNow.AddMinutes(10);
                sasConstraints.Permissions = allowWrite ? SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.Write : SharedAccessBlobPermissions.Read;

                //Generate the shared access signature on the blob, setting the constraints directly on the signature.
                string sasBlobToken = blob.GetSharedAccessSignature(sasConstraints);

                //Return the URI string for the container, including the SAS token.
                result.Data = blob.Uri + sasBlobToken;
                result.Status = ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Status = ResultStatus.Failed;
                result.Exceptions.Value.Add(ex);
            }

            return result;
        }

        public ResultT<string> GetBlobContainerSasToken(string containerName, bool allowWrite = false)
        {
            ResultT<string> result = new ResultT<string>();

            try
            {
                //Get a reference to a container to use for the sample code, and create it if it does not exist.
                CloudBlobContainer container = _blobClient.GetContainerReference(containerName);
                container.CreateIfNotExists();

                //Set the expiry time and permissions for the blob.
                //In this case the start time is specified as a few minutes in the past, to mitigate clock skew.
                //The shared access signature will be valid immediately.
                SharedAccessBlobPolicy sasConstraints = new SharedAccessBlobPolicy();
                sasConstraints.SharedAccessStartTime = DateTime.UtcNow.AddMinutes(-5);
                sasConstraints.SharedAccessExpiryTime = DateTime.UtcNow.AddMinutes(10);
                sasConstraints.Permissions = allowWrite ? SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.Write : SharedAccessBlobPermissions.Read;

                //Generate the shared access signature on the blob, setting the constraints directly on the signature.
                string sasToken = container.GetSharedAccessSignature(sasConstraints);

                //Return the URI string for the container, including the SAS token.
                result.Data = sasToken;
                result.Status = ResultStatus.Success;
            }
            catch (Exception ex)
            {
                result.Status = ResultStatus.Failed;
                result.Exceptions.Value.Add(ex);
            }

            return result;
        }

        public Result UploadFile(string containerName, string fileName, Stream fileStream)
        {
            Result result = new Result { Status = ResultStatus.Success };

            try
            {
                //Get a reference to a container 
                CloudBlobContainer container = _blobClient.GetContainerReference(containerName);

                // Retrieve reference to a blob
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

                // Create or overwrite the blob with contents from a local file.
                blockBlob.UploadFromStream(fileStream);
            }
            catch (Exception ex)
            {
                result.Exceptions.Value.Add(ex);
                result.Status = ResultStatus.Failed;
            }

            return result;
        }
    }
}

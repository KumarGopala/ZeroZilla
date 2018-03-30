using Spire.Doc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ZeroZilla.API.Extension;
using ZeroZilla.API.Models;
using ZeroZilla.API.Repository;

namespace ZeroZilla.API.Controllers
{
    [RoutePrefix("api/PriceQuote")]
    public class PriceQuoteController : ApiController
    {
        private PriceQuoteRepository _repo = null;

        public PriceQuoteController()
        {
            _repo = new PriceQuoteRepository();
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("price/{wordCount}/{deliveryType}/{currency}")]
        public async Task<IHttpActionResult> Get(int wordCount, string deliveryType, string currency="USD")
        {
            if (wordCount < 0 || string.IsNullOrWhiteSpace(deliveryType))
            {
                return BadRequest("Invalid Word Count or Delivery Type");
            }
            var response = await _repo.GetPriceQuote(wordCount, deliveryType, currency);
            return Ok(response);
        }



        private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Uploads";

        /// <summary>
        ///   Get all docs
        /// </summary>
        /// <returns></returns>
        public async Task<IHttpActionResult> Get()
        {
            var docs = new List<DocViewModel>();

            var docFolder = new DirectoryInfo(workingFolder);

            await Task.Factory.StartNew(() =>
            {
                docs = docFolder.EnumerateFiles()
                    .Where(fi => new[] { ".jpeg", ".jpg", ".bmp", ".png", ".gif", ".tiff" }
                        .Contains(fi.Extension.ToLower()))
                    .Select(fi => new DocViewModel
                    {
                        Name = fi.Name,
                        Created = fi.CreationTime,
                        Modified = fi.LastWriteTime,
                        Size = fi.Length / 1024
                    })
                    .ToList();
            });

            return Ok(new { docs = docs });
        }

        /// <summary>
        ///   Delete doc
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string fileName)
        {
            if (!FileExists(fileName))
            {
                return NotFound();
            }

            try
            {
                var filePath = Directory.GetFiles(workingFolder, fileName)
                    .FirstOrDefault();

                await Task.Factory.StartNew(() =>
                {
                    if (filePath != null)
                        File.Delete(filePath);
                });

                var result = new DocActionResult
                {
                    Successful = true,
                    Message = fileName + "deleted successfully"
                };
                return Ok(new { message = result.Message });
            }
            catch (Exception ex)
            {
                var result = new DocActionResult
                {
                    Successful = false,
                    Message = "error deleting fileName " + ex.GetBaseException().Message
                };
                return BadRequest(result.Message);
            }
        }


        [Route("files")]
        public async Task<IHttpActionResult> Add()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                return BadRequest("Unsupported media type");
            }
            try
            {
                var provider = new CustomMultipartFormDataStreamProvider(workingFolder);
                //await Request.Content.ReadAsMultipartAsync(provider);
                await Task.Run(async () => await Request.Content.ReadAsMultipartAsync(provider));

                var docs = new List<DocViewModel>();
                int count = 0;
                foreach (var file in provider.FileData)
                {
                    var fileInfo = new FileInfo(file.LocalFileName);

                    docs.Add(new DocViewModel
                    {
                        Name = fileInfo.Name,
                        Created = fileInfo.CreationTime,
                        Modified = fileInfo.LastWriteTime,
                        Size = fileInfo.Length / 1024
                    });


                    Document doc = new Document();
                    doc.LoadFromFile(file.LocalFileName, FileFormat.Docx2010);
                    count = doc.BuiltinDocumentProperties.WordCount;
                    string displayFileName = file.Headers.ContentDisposition.FileName.ToString().Replace("\"", "");


                    // post displayfilename and filename to db
                }

                

                //return Ok(count);

                return Ok(new { Message = "Doc uploaded ok", docs = docs, counts = count });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }

        /// <summary>
        ///   Check if file exists on disk
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public bool FileExists(string fileName)
        {
            var file = Directory.GetFiles(workingFolder, fileName)
                .FirstOrDefault();

            return file != null;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
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
        [Route("price/{wordCount}/{deliveryType}")]
        public async Task<IHttpActionResult> Get(int wordCount, string deliveryType)
        {
            if (wordCount < 0 || string.IsNullOrWhiteSpace(deliveryType))
            {
                return BadRequest("Invalid Word Count or Delivery Type");
            }           
           var response= await _repo.GetPriceQuote(wordCount, deliveryType);
            return Ok(response);
        }
    }
}

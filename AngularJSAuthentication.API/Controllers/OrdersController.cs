using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using ZeroZilla.API.Models;
using ZeroZilla.API.Repository;

namespace ZeroZilla.API.Controllers
{
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        private OrderRepository _orderRepository;
        public OrdersController()
        {
            _orderRepository = new OrderRepository();
        }

        [Authorize]
        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> CreateOrder(Order order)
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var user = ClaimsPrincipal.Current.Identity.Name;
            order.UserName = user;
            var result = await _orderRepository.CreateOrder(order);
            return Ok();
        }




        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetOrder()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var user = ClaimsPrincipal.Current.Identity.Name;
            List<OrderDetail> orders = new List<OrderDetail>();
            orders.Add(new OrderDetail() { OrderDate = "2018-03-17 09:24", OrderDetailID = 5233, DisplayFileName = "testDoc.doc", StoredFileName = "testDoc-20180317121755.doc", PriceQuote = "500", PaymentStatus = "Pending", JobStatus = "In Process" });
            orders.Add(new OrderDetail() { OrderDate = "2018-03-17 09:24", OrderDetailID = 4125, DisplayFileName = "testDoc.doc", StoredFileName = "testDoc-20180317121755.doc", PriceQuote = "500", PaymentStatus = "Pending", JobStatus = "In Process" });
            //orders.Add(new Order() { DocumentType = "Academic", OrderID = 1, SubCategory = "Essay", EnglishStyle = "US English", Referencing = "IEEE", Requirments = "My First Order", UserName = "kumar" });
            //orders.Add(new Order() { DocumentType = "Business", OrderID = 2, SubCategory = "Report", EnglishStyle = "UK English", Referencing = "", Requirments = "Business need", UserName = "kumar" });
            return Ok(orders);
        }
    }


    #region Helpers



    #endregion
}

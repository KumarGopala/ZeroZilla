using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Stripe;
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

        [HttpPost]
        [Route("Charge")]
        public IHttpActionResult Charge(Payment payment)
        {
            var customers = new StripeCustomerService();
            var charges = new StripeChargeService();

            var customer = customers.Create(new StripeCustomerCreateOptions
            {
                Email = payment.StripeEmail,
                SourceToken = payment.Token
            });

            var charge = charges.Create(new StripeChargeCreateOptions
            {
                Amount = 500,
                Description = "Sample Charge",
                Currency = "usd",
                CustomerId = customer.Id
            });

            return Ok();
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
            List<Order> orders = new List<Order>();
            orders.Add(new Order() { DocumentType = "Academic", OrderID = 1, SubCategory = "Essay", EnglishStyle = "US English", Referencing = "IEEE", Requirments = "My First Order", UserName = "kumar" });
            orders.Add(new Order() { DocumentType = "Business", OrderID = 2, SubCategory = "Report", EnglishStyle = "UK English", Referencing = "", Requirments = "Business need", UserName = "kumar" });
            //order.UserName = user;
            //var result = await _orderRepository.CreateOrder(order);
            return Ok(orders);
        }
    }


    #region Helpers



    #endregion
}

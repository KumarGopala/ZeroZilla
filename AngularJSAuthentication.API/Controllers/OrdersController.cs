using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using Stripe;
using ZeroZilla.API.Models;
using ZeroZilla.API.Repository;
using ZeroZilla.API.Utility;

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
                Amount = payment.Price,
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
        [Route("all")]
        public async Task<IHttpActionResult> GetOrders()
        {
            return Ok();
        }




        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetOrder()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var user = ClaimsPrincipal.Current.Identity.Name;

            var result = _orderRepository.GetOrder(user.ToString());

            List<OrderDetail> orderdetail = result.Tables[0].DataTableToList<OrderDetail>();
 
            return Ok(orderdetail);
        }




        [Authorize]
        [HttpGet]
        [Route("Admin")]
        public async Task<IHttpActionResult> GetOrderAdmin()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var user = ClaimsPrincipal.Current.Identity.Name;
            var result = _orderRepository.GetOrderAdmin( );
            List<Order> orderdetail = result.Tables[0].DataTableToList<Order>();
            return Ok(orderdetail);
        }



        [Authorize]
        [HttpGet]
        [Route("OrderDetail/{ID}")]
        public async Task<IHttpActionResult> GetAdminOrderDetail(int ID)
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var user = ClaimsPrincipal.Current.Identity.Name;
            var result = _orderRepository.GetOrderAdmin(ID);
            List<Order> orderdetail = result.Tables[0].DataTableToList<Order>();
            return Ok(orderdetail);

        }


        [Authorize]
        [HttpPut]
        [Route("")]
        public async Task<IHttpActionResult> UpdateOrderStatus(Order order)
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var user = ClaimsPrincipal.Current.Identity.Name;
            var result = _orderRepository.UpdateOrderStatus(order);
            return Ok();

        }




    }


    #region Helpers



    #endregion
}

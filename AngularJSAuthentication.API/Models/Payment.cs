using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZeroZilla.API.Models
{
    public class Payment
    {
        public string StripeEmail { get; set; }

        public string Token { get; set; }
    }
}
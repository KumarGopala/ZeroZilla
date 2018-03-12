using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZeroZilla.API.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public string UserName { get; set; }
        public string DocumentType { get; set; }
        public string SubCategory { get; set; }
        public string EnglishStyle { get; set; }
        public string Referencing { get; set; }
        public string Requirments { get; set; }

    }
}
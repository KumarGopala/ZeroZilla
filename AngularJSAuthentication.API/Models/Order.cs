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
        public string StoredFilename { get; set; }
        public string PaymentStatus { get; set; }
        public decimal PriceQuoted { get; set; }
        public int WordCount { get; set; }
        public string DeliveryType { get; set; }
        public string OrderDate { get; set; }
        public string JobStatus { get; set; }

        public string Currency { get; set; }
        public string ReferenceStoredFilename { get; set; }
        public string ReferenceDisplayFilename { get; set; }
        public string DisplayFilename { get; set; }


    }


    public class OrderDetail
    {
        public int OrderDetailID { get; set; }
        public string OrderDate { get; set; }
        public string DisplayFileName { get; set; }
        public string StoredFileName { get; set; }
        public string PriceQuote { get; set; }
        public string PaymentStatus{ get; set; }
        public string JobStatus{ get; set; }
        public string Action { get; set; }
        public string Currency { get; set; }

    }
}
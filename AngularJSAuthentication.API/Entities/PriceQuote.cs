using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularJSAuthentication.API.Entities
{
    public class PriceQuote
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int WordCount { get; set; }

        [Required]
        [MaxLength(50)]
        public int DeliveryId { get; set; }

        [Required]
        public decimal Price { get; set; }
        
    }
}
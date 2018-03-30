using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Dapper;

namespace ZeroZilla.API.Repository
{
    public class PriceQuoteRepository
    {
        private static string ConnectionString = ConfigurationManager.ConnectionStrings["AuthContext"].ToString();

        public async Task<decimal> GetPriceQuote(int wordcount, string deliverytype, string currency)
        {
            try
            {
                decimal price;
                object[] param = new object[3];
                param[0] = wordcount;
                param[1] = deliverytype;
                param[2] = currency;
                var result = SqlHelper.ExecuteScalar(ConnectionString, "SP_GetPriceQuote", param);
                decimal.TryParse(result.ToString(), out price);
                return price;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
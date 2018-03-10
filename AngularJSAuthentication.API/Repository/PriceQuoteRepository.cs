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

namespace AngularJSAuthentication.API.Repository
{
    public class PriceQuoteRepository
    {
        private static string ConnectionString = ConfigurationManager.ConnectionStrings["AuthContext"].ToString();

        public async Task<decimal> GetPriceQuote(int wordcount, string deliverytype)
        {
            decimal price;
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ToString()))
            {
                SqlCommand sqlCommand = new SqlCommand("SP_GetPriceQuote", con);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@WordCount", wordcount));
                sqlCommand.Parameters.Add(new SqlParameter("@DeliveryType", deliverytype));
                con.Open();
                var result = await sqlCommand.ExecuteScalarAsync();
                con.Close();
                Decimal.TryParse(result.ToString(), out price);
            }
            return price;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ZeroZilla.API.Models;

namespace ZeroZilla.API.Repository
{
    public class OrderRepository
    {
        private static string ConnectionString = ConfigurationManager.ConnectionStrings["AuthContext"].ToString();

        public async Task<int> CreateOrder(Order order)
        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["AuthContext"].ToString()))
            {
                SqlCommand cmd = new SqlCommand("[dbo].[InsertOrder]", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@UserName", order.UserName));
                cmd.Parameters.Add(new SqlParameter("@DocumentType", order.DocumentType));
                cmd.Parameters.Add(new SqlParameter("@SubCategory", order.SubCategory));
                cmd.Parameters.Add(new SqlParameter("@EnglishStyle", order.EnglishStyle));
                cmd.Parameters.Add(new SqlParameter("@Referencing", order.Referencing));
                cmd.Parameters.Add(new SqlParameter("@Requirments", order.Requirments));
                con.Open();
                var result = await cmd.ExecuteNonQueryAsync();
                return result;
            }
        }
        
    }
}
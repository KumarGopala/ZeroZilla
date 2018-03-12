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
            var param = new object[6];
            param[0] = order.UserName;
            param[1] = order.DocumentType;
            param[2] = order.SubCategory;
            param[3] = order.EnglishStyle;
            param[4] = order.Referencing;
            param[5] = order.Requirments;
            return SqlHelper.ExecuteNonQuery(ConnectionString, "[dbo].[InsertOrder]", param);
           
        }
        
    }
}
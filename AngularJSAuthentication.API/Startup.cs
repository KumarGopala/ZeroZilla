using ZeroZilla.API.Models;
using ZeroZilla.API.Providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using Stripe;
using System.Configuration;

[assembly: OwinStartup(typeof(ZeroZilla.API.Startup))]

namespace ZeroZilla.API
{
    public class Startup
    {
		
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static GoogleOAuth2AuthenticationOptions googleAuthOptions { get; private set; }
        public static FacebookAuthenticationOptions facebookAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            
            //LogWriter.WriteLog("Startup - Configuration");
            //LogWriter.WriteLog("tests");

            HttpConfiguration config = new HttpConfiguration();
            
            ConfigureOAuth(app);
            WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<AuthContext, ZeroZilla.API.Migrations.Configuration>());
            Database.SetInitializer<AuthContext>(null);
            //var key = ConfigurationManager.ConnectionStrings["SecretKey"].ToString();
            StripeConfiguration.SetApiKey("sk_test_tRL3xG1liOrdbwAN84da1mWF");
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<AuthContext, ZeroZilla.API.Migrations.Configuration>());
           

        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            //use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);
            OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions() {
            
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new SimpleAuthorizationServerProvider(),
                RefreshTokenProvider = new SimpleRefreshTokenProvider()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);

            //Configure Google External Login
            googleAuthOptions = new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = ConfigurationManager.AppSettings["Google_clientId"],
            //"844579736688-uhlg0h18699hujgcolf16muqg5npnpos.apps.googleusercontent.com",
                ClientSecret = ConfigurationManager.AppSettings["Google_secret"],//"zqal48trv0woW34Junlhg7kp",
                Provider = new GoogleAuthProvider()
            };
            app.UseGoogleAuthentication(googleAuthOptions);

            //Configure Facebook External Login
            facebookAuthOptions = new FacebookAuthenticationOptions()
            {
                AppId = "xxxxxx",
                AppSecret = "xxxxxx",
                Provider = new FacebookAuthProvider()
            };
            app.UseFacebookAuthentication(facebookAuthOptions);

        }
    }

}
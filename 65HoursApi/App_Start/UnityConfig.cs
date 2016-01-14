using Microsoft.Practices.Unity;
using System.Web.Http;
using Unity.WebApi;

namespace _65HoursApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = _65Hours.DependencyInjection.UnityConfig.GetConfiguredContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}
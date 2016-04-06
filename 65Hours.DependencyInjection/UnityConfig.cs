using _65Hours.Models;
using _65Hours.Repository;
using _65Hours.Repository.Interfaces;
using _65Hours.Services;
using _65Hours.Services.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.DataHandler.Serializer;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.Practices.Unity;
using System;
using System.Data.Entity;
using System.Web;

namespace _65Hours.DependencyInjection
{
    public class UnityConfig
    {
        #region Unity Container
        private static Lazy<IUnityContainer> container = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static IUnityContainer GetConfiguredContainer()
        {
            return container.Value;
        }
        #endregion

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>There is no need to register concrete types such as controllers or API controllers (unless you want to 
        /// change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.</remarks>
        public static void RegisterTypes(IUnityContainer container)
        {
            //repositories
            container.RegisterType<IHoursRepository<Skill>, HoursRepository<Skill>>();
            container.RegisterType<IHoursRepository<UserSkill>, HoursRepository<UserSkill>>();
            container.RegisterType<IHoursRepository<UserRequest>, HoursRepository<UserRequest>>();

            //services
            container.RegisterType<ISkillService, SkillService>();
            container.RegisterType<IUserSkillService, UserSkillService>();
            container.RegisterType<IUserRequestService, UserRequestService>();

            //ASP.Net identity
            
            container.RegisterType<UserManager<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<RoleManager<IdentityRole>>(new HierarchicalLifetimeManager());
            container.RegisterType<DbContext, HoursDbContext>(new HierarchicalLifetimeManager());
            container.RegisterType<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>(new HierarchicalLifetimeManager());
            container.RegisterType<IRoleStore<IdentityRole, string>, RoleStore<IdentityRole>>(new HierarchicalLifetimeManager());
            container.RegisterType<IAuthenticationManager>(new InjectionFactory(c => HttpContext.Current.GetOwinContext().Authentication));
            container.RegisterType<ISecureDataFormat<AuthenticationTicket>, SecureDataFormat<AuthenticationTicket>>();

            container.RegisterType<ITextEncoder, Base64UrlTextEncoder>();
            container.RegisterType<IDataSerializer<AuthenticationTicket>, TicketSerializer>();
            container.RegisterType<IDataProtector>(new InjectionFactory(d => new DpapiDataProtectionProvider().Create("ASP.NET Identity")));
        }
    }
}

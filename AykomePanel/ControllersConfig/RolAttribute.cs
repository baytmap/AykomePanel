using AykomePanel.ClassHome._Home;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace AykomePanel.ControllersConfig
{

    public interface IRolAttribute : IAsyncActionFilter
    {
        UserRolOut[] UserRoles { get; set; }
    }


    public class RolAttribute : ActionFilterAttribute, IRolAttribute
    {
        private readonly IApiRequest _request;
        public UserRolOut[] UserRoles { get; set; }

        public RolAttribute(IApiRequest request)
        {
            _request = request;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var jsonData = await _request.GetAsync("api/Genel/UserRol/");
            UserRolOut[]? parseModel = JsonSerializer.Deserialize<UserRolOut[]>(jsonData);
            bool hasRole = parseModel.Any(q => UserRoles.Contains(q));
            if (!hasRole)
                context.Result = new RedirectToActionResult("ErisimYok", "Genel", null);
            else
                await next();
        }
    }

    public class RolAttributeFactory : IFilterFactory
    {
        private readonly IApiRequest _request;
        private readonly UserRolOut[] _userRoles;

        public RolAttributeFactory(IApiRequest request, params UserRolOut[] userRoles)
        {
            _request = request;
            _userRoles = userRoles;
        }

        public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
        {
            var filter = new RolAttribute(_request)
            {
                UserRoles = _userRoles
            };
            return filter;
        }

        public bool IsReusable => false;
    }


}

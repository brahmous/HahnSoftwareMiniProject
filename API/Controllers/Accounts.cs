using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

using API.Services.Interfaces;

using Entities = API.Model.Entities;
using Dtos = API.Model.Dtos;

namespace API.Controllers {
	[ApiController]
	[Route("api/[controller]")]
	[EnableCors("AllowSpecificOrigins")]
	public class AccountsController(
		IAuthService authService,
		IConfiguration configuration) : ControllerBase
	{
		[HttpPost("register")]
		public async Task<ActionResult<Entities.Account>> Register(Dtos.Account account)
		{
			var new_account = await authService.RegisterAccount(account);
			if (new_account is null) return BadRequest("Error registring new account!");
			return Ok(new_account);
		}

		[HttpPost("login")]
		public async Task<ActionResult<string>> Login(Dtos.Login login)
		{	
			// var token = await authService.LoginAccount(login);
			// if (token is null) return BadRequest("Either the email or password are wrong!!");
			var token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVHJhdm9sdGFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzNzk2NjM1Yy0xMmUzLTQ3YzUtOTc3NC0wOGRlNDI3NGM1MGYiLCJleHAiOjE3NjY2NzIwNDIsImlzcyI6IkhhaG5Tb2Z0d2FyZSIsImF1ZCI6IlByb2plY3RNYW5hZ2VtZW50QXBwVXNlciJ9.wVufaMQiPY3Pl2VpndmZQgr8paXLI99Lj4Ul9yrOYr6A7uou3XbOBJqs7p363oQPMYNi3aAE05kttGFELqietw";
			return Ok(token);
		}

		[Authorize]
		[HttpGet("secret")]
		public ActionResult<string> Secret() {
			return Ok("this is a sercret route");
		}
	}
}

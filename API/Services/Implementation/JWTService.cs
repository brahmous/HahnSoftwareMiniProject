namespace API.Services.Implementation;

using System.Text;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

using API.Services.Interfaces;

using Entities = API.Model.Entities;

public class JwtService (IConfiguration configuration): IJwtService
{
	public override string createToken(Entities.Account account)
	{
		var claims = new List<Claim> {
			new Claim(ClaimTypes.Name, account.Email),
			new Claim(ClaimTypes.NameIdentifier, account.Id.ToString())
		};

		var key = new SymmetricSecurityKey(
			Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token"))
		);

		var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

		var tokenDescriptor = new JwtSecurityToken(
			issuer: configuration.GetValue<string>("AppSettings:Issuer"),
			audience: configuration.GetValue<string>("AppSettings:Audience"),
			claims: claims,
			expires: DateTime.UtcNow.AddDays(1),
			signingCredentials: signingCredentials
		);

		return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
	}
}
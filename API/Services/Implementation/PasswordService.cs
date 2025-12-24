namespace API.Services.Implementation;

using Microsoft.AspNetCore.Identity;

using API.Services.Interfaces;
using Entities = API.Model.Entities;
using Dtos     = API.Model.Dtos;

public class PasswordService: IPasswordService
{
	public override string hashPassword(Dtos.Account account)
	{
		return new PasswordHasher<Dtos.Account>().HashPassword(account, account.PlainTextPassword);	
	}


	public override bool isPasswordMatch(Entities.Account account, string plainTextPassword)
	{
		if (new PasswordHasher<Entities.Account>().VerifyHashedPassword(account, account.PasswordHash, plainTextPassword) == PasswordVerificationResult.Success)
		{
			return true;
		} else {
			return false;
		}
	}
}
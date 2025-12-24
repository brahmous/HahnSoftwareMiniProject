namespace API.Services.Implementation;

using System;
using API.Model;
using API.Services.Interfaces;
using API.Services.Implementation;
using Microsoft.EntityFrameworkCore;

using Entities = API.Model.Entities;
using Dtos = API.Model.Dtos;

public class AuthService (
	ApplicationDbContext DB,
	IPasswordService passwordService,
	IJwtService jwtService) : IAuthService
{
	// Register the user or return null (could return JWT token, not in this case).
	// for now we don't need to know the reason server side.
	// true registered
	// false not registered
	public override async Task<Entities.Account?> RegisterAccount(Dtos.Account account)
	{
		bool emailExists = await DB.Accounts.AnyAsync(a => a.Email == account.Email);
		if (emailExists) return null;

		Entities.Account newAccount = new(){
			FirstName = account.FirstName,
			LastName = account.LastName,
			Email = account.Email,
			PasswordHash = passwordService.hashPassword(account)
		};

		DB.Accounts.Add(newAccount);

		await DB.SaveChangesAsync();

		return newAccount;
	}
	// Log user in (this works because i don't need a reason)
	// true, user logged in and token returned
	// false, use not logged in and no token returned
	public override async Task<string?> LoginAccount(Dtos.Login login)
	{
		Console.WriteLine($"Login Email: {login.Email}");
		Console.WriteLine($"Login PlainTextPassword: {login.PlainTextPassword}");
		var user = await DB.Accounts.Where(a => a.Email == login.Email).FirstOrDefaultAsync();
		
		if (user is null) return null;

		if (!passwordService.isPasswordMatch(user, login.PlainTextPassword)) 
		{
			return null;
		}

		string token = jwtService.createToken(user);

		return token;
	}

}
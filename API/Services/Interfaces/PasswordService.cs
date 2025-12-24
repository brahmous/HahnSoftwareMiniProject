namespace API.Services.Interfaces;

using Entities = API.Model.Entities;
using Dtos = API.Model.Dtos;

public abstract class IPasswordService 
{
	public abstract string hashPassword(Dtos.Account account);	
	public abstract bool isPasswordMatch(Entities.Account account, string plainTextPassword);	
}
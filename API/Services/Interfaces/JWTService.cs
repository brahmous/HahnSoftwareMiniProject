namespace API.Services.Interfaces;

using Entities = API.Model.Entities;

public abstract class IJwtService 
{
	public abstract string createToken(Entities.Account account);
}
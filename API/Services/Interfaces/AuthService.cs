namespace API.Services.Interfaces;

using Entities = API.Model.Entities;
using Dtos = API.Model.Dtos;

public abstract class IAuthService 
{
	// Register the user or return null (could return JWT token, not in this case).
	// for now we don't need to know the reason server side.
	// true registered
	// false not registered
	public abstract Task<Entities.Account?> RegisterAccount(Dtos.Account account);
	// Log user in (this works because i don't need a reason)
	// true, user logged in and token returned
	// false, use not logged in and no token returned
	public abstract Task<string?> LoginAccount(Dtos.Login login);

}
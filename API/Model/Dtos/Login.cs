namespace API.Model.Dtos;

public class Login 
{
	public string Email { get; set; }             = string.Empty;
	public string PlainTextPassword { get; set; } = string.Empty;
}

namespace API.Model.Entities; 
using System;
using System.Collections.Generic;

public class Account 
{
	public Guid Id { get; set; }
	public string FirstName { get; set; }    = string.Empty;	
	public string LastName { get; set; }     = string.Empty;
	public string Email { get; set; }        = string.Empty;
	public string PasswordHash { get; set; } = string.Empty; 
	public ICollection<Project> Projects { get; }
}



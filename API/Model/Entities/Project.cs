namespace API.Model.Entities; 
using System.Collections.Generic;

public class Project
{
	public int Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public string? Description { get; set; }
	public Account Account { get; set; }
	public ICollection<Task> tasks { get; set; }
}
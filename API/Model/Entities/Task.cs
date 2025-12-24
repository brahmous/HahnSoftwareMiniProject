namespace API.Model.Entities; 

public class Task 
{
	public int Id { get; set; }
	public string Description { get; set; } = string.Empty;
	public DateTime DueDate { get; set; }
	public bool Completed { get; set; }= false;
	public Project Project { get; set; }
}
namespace API.Model.Dtos;

public class TaskResponseDto
{
	public int Id { get; set; }
	public string Description { get; set; } = string.Empty;
	public DateTime DueDate { get; set; }
	public bool Completed { get; set; } = false;
	public int ProjectId { get; set; }
}
namespace API.Model.Dtos;

using System.Collections.Generic;

public class ProjectResponseDto
{
	public int Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public string? Description { get; set; }	
	public List<TaskResponseDto> Tasks { get; set; }
}
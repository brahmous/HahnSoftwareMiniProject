namespace API.Controllers;
using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using API.Model;
using Entities = API.Model.Entities;
using Dtos = API.Model.Dtos;


// TODO: Move the logic out of the controller into ProjectService and inject it using DI.
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowSpecificOrigins")]
public class Projects (ApplicationDbContext DB) : ControllerBase
{
	[Authorize]
	[HttpGet]
	public async Task<ActionResult<List<Dtos.ProjectResponseDto>>> GetAllProjects()
	//public async Task<ActionResult<string>> GetAllProjects()
	{
		string accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		var projects = await DB.Projects.Where(p => p.Account.Id.ToString() == accountId).Include(p => p.tasks).ToListAsync();

		List<Dtos.ProjectResponseDto> ResponseBody = new ();	

		foreach (var project in projects) {
			Dtos.ProjectResponseDto newObject = new() {
				Id = project.Id,
				Title = project.Title,
				Description = project.Description,
				Tasks = []
			};
			foreach (var task in project.tasks) {
				newObject.Tasks.Add(new Dtos.TaskResponseDto() {
					Id = task.Id,
					Description = task.Description,
					DueDate = task.DueDate,
					Completed = task.Completed,
					ProjectId = project.Id
				}); 
			}
			ResponseBody.Add(newObject);
		}	

		return Ok(ResponseBody);
	}

	[Authorize]
	[HttpPost("create")]
	public async Task<ActionResult<Dtos.ProjectResponseDto>> CreateProject(Dtos.Project project)
	// public async Task<ActionResult<string>> CreateProject(Entities.Project project)
	{
		string accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

		var Account = await DB.Accounts.Include(a => a.Projects).SingleAsync(a => a.Id.ToString() == accountId);

		Entities.Project newProject = new() {
			Title = project.Title,
			Description = project.Description,
		};

		Account.Projects.Add(newProject);
		await DB.SaveChangesAsync();

		Dtos.ProjectResponseDto newProjectCopy = new (){
			Id = newProject.Id,
			Title = newProject.Title,
			Description = newProject.Description,
			Tasks = []
		};

		return Ok(newProjectCopy);
	}
}
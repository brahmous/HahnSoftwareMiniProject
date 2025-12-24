namespace API.Controllers;

using System;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Model;

using Entities = API.Model.Entities;
using Dtos = API.Model.Dtos;
// TODO: Move the logic to Tasks service and inject using DI.
[ApiController]
[Route("api/[controller]")]
[EnableCors("AllowSpecificOrigins")]
public class Tasks(ApplicationDbContext DB): ControllerBase 
{

	[Authorize]
	[HttpPost("create")]
	public async Task<ActionResult<Dtos.TaskResponseDto>> CreateTask(Dtos.Task task)
	{
		string accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		var project = await DB.Projects.Where(p => p.Account.Id.ToString() == accountId && p.Id == task.ProjectId).SingleAsync();
		Entities.Task newTask = new () {
			Description = task.Description,
			DueDate = task.DueDate,
			Completed = task.Completed,
			Project = project
		};		
		DB.Tasks.Add(newTask);
		await DB.SaveChangesAsync();
		Dtos.TaskResponseDto newTaskResponseCopy = new (){
			Id = newTask.Id,
			Description = newTask.Description,
			DueDate = newTask.DueDate,
			Completed = newTask.Completed,
			ProjectId = newTask.Project.Id	
		};
		return newTaskResponseCopy;
	}

	[Authorize]
	[HttpPost("complete/{id}")]
	public async Task<ActionResult<Entities.Task>> CompleteTask(int id)
	{
		string accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		var task = await DB.Tasks.Include(t => t.Project).ThenInclude(p => p.Account).SingleAsync(t => t.Id == id);
		// TODO: Clean this up give a proper response.
		if (task.Project.Account.Id.ToString() == accountId) {
			Console.WriteLine("valid!!");
		} else {
			Console.WriteLine("Invalid!!");
		}
		task.Completed = true;
		await DB.SaveChangesAsync();
		task.Project = null;
		return task;
	}

}
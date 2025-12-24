namespace API.Model;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using API.Model.Entities;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): DbContext (options)
{
	public DbSet<Account> Accounts { get; set; }
	public DbSet<Project> Projects { get; set; }
	public DbSet<Task> Tasks       { get; set; }
}



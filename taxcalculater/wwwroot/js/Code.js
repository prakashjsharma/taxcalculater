//--###################################### Nu get Packages ############################################3

//Dapper
//Microsoft.Data.SqlClient



//--####################################### Controllers > EmployeeController.cs ####################################################

//using System.Linq;
//using taxcalculater.Models;
//using Microsoft.AspNetCore.Mvc;
//using taxcalculater.Models.Repository;

//namespace taxcalculater.Controllers
//{
//    public class EmployeeController : Controller
//    {
//        private readonly EmployeeRepository _repository;

//        public EmployeeController(EmployeeRepository repository)
//        {
//            _repository = repository;
//        }

//        public IActionResult Index()
//        {
//            var employees = _repository.GetEmployeesWithTax();
//            return View(employees);
//        }
//        // GET: Employee/Create
//        public IActionResult Create()
//        {
//            return View();
//        }

//        // POST: Employee/Create
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public IActionResult Create(Employee employee)
//        {
//            if (ModelState.IsValid)
//            {
//                _repository.AddEmployee(employee);
//                return RedirectToAction(nameof(Index));
//            }
//            return View(employee);
//        }

//        // GET: Employee/Edit/5
//        public IActionResult Edit(int id)
//        {
//            // Fetch the employee to edit
//            var employees = _repository.GetEmployeesWithTax();
//            var employee = employees.FirstOrDefault(e => e.EmpCode == id);
//            if (employee == null)
//            {
//                return NotFound();
//            }
//            return View(employee);
//        }

//        // POST: Employee/Edit/5
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public IActionResult Edit(int id, Employee employee)
//        {
//            if (id != employee.EmpCode)
//            {
//                return NotFound();
//            }

//            if (ModelState.IsValid)
//            {
//                // Update the employee's information
//                _repository.UpdateEmployee(employee);

//                // Redirect to Index to see the updated list with recalculated tax
//                return RedirectToAction(nameof(Index));
//            }
//            return View(employee);
//        }
//    }
//}


//--####################################### Controllers > HomeController.cs ####################################################

//using Microsoft.AspNetCore.Mvc;
//using System.Diagnostics;
//using taxcalculater.Models;

//namespace taxcalculater.Controllers
//{
//    public class HomeController : Controller
//    {
//        private readonly ILogger<HomeController> _logger;

//        public HomeController(ILogger<HomeController> logger)
//        {
//            _logger = logger;
//        }

//        public IActionResult Index()
//        {
//            return View();
//        }

//        public IActionResult Privacy()
//        {
//            return View();
//        }

//        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
//        public IActionResult Error()
//        {
//            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
//        }
//    }
//}



//--####################################### Models > Repository > EmployeeRepository.cs ####################################################

//using Dapper;
//using taxcalculater.Models;
//using Microsoft.Data.SqlClient;
//using System.Data;


//namespace taxcalculater.Models.Repository
//{
//    public class EmployeeRepository
//    {
//        private readonly string _connectionString;

//        public EmployeeRepository(string connectionString)
//        {
//            _connectionString = connectionString;
//        }

//        public IEnumerable<Employee> GetEmployeesWithTax()
//        {
//            using (IDbConnection db = new SqlConnection(_connectionString))
//            {
//                return db.Query<Employee>("CalculateTaxResult", commandType: CommandType.StoredProcedure);
//                //return result ?? new List<Employee>();
//            }
//        }
//        public void AddEmployee(Employee employee)
//        {
//            using (IDbConnection db = new SqlConnection(_connectionString))
//            {
//                // Insert the employee data into the Employees2510 table
//                db.Execute("INSERT INTO Employees2510 ( Name, Designation, Salary) VALUES ( @Name, @Designation, @Salary)", employee);
//            }
//        }

//        public void UpdateEmployee(Employee employee)
//        {
//            using (IDbConnection db = new SqlConnection(_connectionString))
//            {
//                // Update the employee data and calculate new tax
//                IDbConnection db1 = db;
//                db.Execute("UPDATE Employees2510 SET Name = @Name, Designation = @Designation, Salary = @Salary WHERE EmpCode = @EmpCode", employee);
//                //db.Execute("Update Employees2510 Set Name= @Name,Desiganation=@Desiganation, Salary=@Salary where EmpCode=@EmpCode", employee);
//            }
//        }
//    }
//}



//--####################################### Models > Employee.cs ####################################################


//using System.ComponentModel.DataAnnotations;

//namespace taxcalculater.Models
//{
//    public class Employee
//    {
//        [Key]
//        public int EmpCode { get; set; }
//        public string Name { get; set; }
//        public string Designation { get; set; }
//        public decimal Salary { get; set; }
//        public decimal Tax { get; set; }

//    }
//}


//--####################################### Views > Employee > Create.cshtml ####################################################

//@model taxcalculater.Models.Employee

//<form asp-action="Create" method="post">
//    @Html.AntiForgeryToken()
//    <div class="form-group">
//        <label asp-for="Name" class="control-label"></label>
//        <input asp-for="Name" class="form-control" />
//        <span asp-validation-for="Name" class="text-danger"></span>
//    </div>
//    <div class="form-group">
//        <label asp-for="Designation" class="control-label"></label>
//        <input asp-for="Designation" class="form-control" />
//        <span asp-validation-for="Designation" class="text-danger"></span>
//    </div>
//    <div class="form-group">
//        <label asp-for="Salary" class="control-label"></label>
//        <input asp-for="Salary" class="form-control" />
//        <span asp-validation-for="Salary" class="text-danger"></span>
//    </div>
//    <div class="form-group">
//        <input type="submit" value="Create" class="btn btn-primary" />
//    </div>
//</form>


//--####################################### Views > Employee > Edit.cshtml ####################################################


//@model taxcalculater.Models.Employee

//<form asp-action="Edit" method="post">
//    @Html.AntiForgeryToken()
//    <input type="hidden" asp-for="EmpCode" />
//    <div class="form-group">
//        <label asp-for="Name" class="control-label"></label>
//        <input asp-for="Name" class="form-control" />
//        <span asp-validation-for="Name" class="text-danger"></span>
//    </div>
//    <div class="form-group">
//        <label asp-for="Designation" class="control-label"></label>
//        <input asp-for="Designation" class="form-control" />
//        <span asp-validation-for="Designation" class="text-danger"></span>
//    </div>
//    <div class="form-group">
//        <label asp-for="Salary" class="control-label"></label>
//        <input asp-for="Salary" class="form-control" />
//        <span asp-validation-for="Salary" class="text-danger"></span>
//    </div>
//    <div class="form-group">
//        <input type="submit" value="Save" class="btn btn-primary" />
//    </div>
//</form>


//--####################################### Views > Employee > Edit.cshtml ####################################################

//@model IEnumerable<taxcalculater.Models.Employee>

//<table class="table">
//    <thead>
//        <tr>
//            <th>EmpCode</th>
//            <th>Name</th>
//            <th>Designation</th>
//            <th>Salary</th>
//            <th>Tax</th>
//            <th></th>
//        </tr>
//    </thead>
//    <tbody>
//        @foreach (var employee in Model)
//        {
//            <tr>
//                <td>@employee.EmpCode</td>
//                <td>@employee.Name</td>
//                <td>@employee.Designation</td>
//                <td>@employee.Salary</td>
//                <td>@employee.Tax</td>
//                <td>
//                    <a asp-action="Edit" asp-route-id="@employee.EmpCode">Edit</a>
//                </td>
//            </tr>
//        }
//    </tbody>
//</table>



//--####################################### appsettings.json ####################################################

//{
//  "Logging": {
//    "LogLevel": {
//      "Default": "Information",
//      "Microsoft.AspNetCore": "Warning"
//    }
//  },
//  "AllowedHosts": "*",
//  "ConnectionStrings": {
//    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TaxCalculator;Trusted_Connection=True;"
//  }

//}



//--####################################### Program.cs ####################################################


//using taxcalculater.Models.Repository;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllersWithViews();

//builder.Services.AddScoped<EmployeeRepository>(provider =>
//    new EmployeeRepository(
//        builder.Configuration.GetConnectionString("DefaultConnection")
//    )
//);


//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();

//app.UseRouting();

//app.UseAuthorization();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Employee}/{action=Index}/{id?}");

//app.Run();


//--################################################# SQL Script #################################################

//USE [master]
//GO
///****** Object:  Database [TaxCalculator]    Script Date: 18-12-2025 23:06:42 ******/
//CREATE DATABASE [TaxCalculator]
// CONTAINMENT = NONE
// ON  PRIMARY 
//( NAME = N'TaxCalculator', FILENAME = N'C:\Users\FTB\TaxCalculator.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
// LOG ON 
//( NAME = N'TaxCalculator_log', FILENAME = N'C:\Users\FTB\TaxCalculator_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
// WITH CATALOG_COLLATION = DATABASE_DEFAULT
//GO
//ALTER DATABASE [TaxCalculator] SET COMPATIBILITY_LEVEL = 150
//GO
//IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
//begin
//EXEC [TaxCalculator].[dbo].[sp_fulltext_database] @action = 'enable'
//end
//GO
//ALTER DATABASE [TaxCalculator] SET ANSI_NULL_DEFAULT OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET ANSI_NULLS OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET ANSI_PADDING OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET ANSI_WARNINGS OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET ARITHABORT OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET AUTO_CLOSE OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET AUTO_SHRINK OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET AUTO_UPDATE_STATISTICS ON 
//GO
//ALTER DATABASE [TaxCalculator] SET CURSOR_CLOSE_ON_COMMIT OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET CURSOR_DEFAULT  GLOBAL 
//GO
//ALTER DATABASE [TaxCalculator] SET CONCAT_NULL_YIELDS_NULL OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET NUMERIC_ROUNDABORT OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET QUOTED_IDENTIFIER OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET RECURSIVE_TRIGGERS OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET  DISABLE_BROKER 
//GO
//ALTER DATABASE [TaxCalculator] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET DATE_CORRELATION_OPTIMIZATION OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET TRUSTWORTHY OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET ALLOW_SNAPSHOT_ISOLATION OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET PARAMETERIZATION SIMPLE 
//GO
//ALTER DATABASE [TaxCalculator] SET READ_COMMITTED_SNAPSHOT OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET HONOR_BROKER_PRIORITY OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET RECOVERY SIMPLE 
//GO
//ALTER DATABASE [TaxCalculator] SET  MULTI_USER 
//GO
//ALTER DATABASE [TaxCalculator] SET PAGE_VERIFY CHECKSUM  
//GO
//ALTER DATABASE [TaxCalculator] SET DB_CHAINING OFF 
//GO
//ALTER DATABASE [TaxCalculator] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
//GO
//ALTER DATABASE [TaxCalculator] SET TARGET_RECOVERY_TIME = 60 SECONDS 
//GO
//ALTER DATABASE [TaxCalculator] SET DELAYED_DURABILITY = DISABLED 
//GO
//ALTER DATABASE [TaxCalculator] SET ACCELERATED_DATABASE_RECOVERY = OFF  
//GO
//ALTER DATABASE [TaxCalculator] SET QUERY_STORE = OFF
//GO
//USE [TaxCalculator]
//GO
///****** Object:  Table [dbo].[Employees2510]    Script Date: 18-12-2025 23:06:42 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[Employees2510](
//	[EmpCode] [int] IDENTITY(1,1) NOT NULL,
//	[Name] [nvarchar](100) NULL,
//	[Designation] [nvarchar](100) NULL,
//	[Salary] [decimal](18, 2) NULL,
//PRIMARY KEY CLUSTERED 
//(
//	[EmpCode] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  StoredProcedure [dbo].[CalculateTaxResult]    Script Date: 18-12-2025 23:06:42 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO

//Create PROCEDURE [dbo].[CalculateTaxResult]
//AS
//BEGIN
//    -- Temporary table to store the results
//    DECLARE @Results TABLE (
//        EmpCode INT,
//        Name NVARCHAR(100),
//        Designation NVARCHAR(100),
//        Salary DECIMAL(18, 2),
//        Tax DECIMAL(18, 2)
//    );
    
//    -- Variables for tax calculation
//    DECLARE @EmpCode INT, @Name NVARCHAR(100), @Designation NVARCHAR(100), 
//            @Salary DECIMAL(18, 2), @AnnualSalary DECIMAL(18, 2), @Tax DECIMAL(18, 2), @RemainingSalary DECIMAL(18, 2);
    
//    -- Cursor to iterate through each employee
//    DECLARE employee_cursor CURSOR FOR
//    SELECT EmpCode, Name, Designation, Salary FROM Employees2510;
    
//    OPEN employee_cursor;
    
//    FETCH NEXT FROM employee_cursor INTO @EmpCode, @Name, @Designation, @Salary;
    
//    WHILE @@FETCH_STATUS = 0
//    BEGIN
//        SET @AnnualSalary = @Salary * 12; -- Convert monthly salary to annual salary
//        SET @Tax = 0;
//        SET @RemainingSalary = @AnnualSalary;
        
//        -- Calculate tax based on annual salary slabs
//        IF @RemainingSalary > 1500000
//        BEGIN
//            SET @Tax = @Tax + (@RemainingSalary - 1500000) * 0.30;
//            SET @RemainingSalary = 1500000;
//        END
        
//        IF @RemainingSalary > 1200000
//        BEGIN
//            SET @Tax = @Tax + (@RemainingSalary - 1200000) * 0.20;
//            SET @RemainingSalary = 1200000;
//        END
        
//        IF @RemainingSalary > 1000000
//        BEGIN
//            SET @Tax = @Tax + (@RemainingSalary - 1000000) * 0.15;
//            SET @RemainingSalary = 1000000;
//        END
        
//        IF @RemainingSalary > 700000
//        BEGIN
//            SET @Tax = @Tax + (@RemainingSalary - 700000) * 0.10;
//            SET @RemainingSalary = 700000;
//        END
        
//        IF @RemainingSalary > 300000
//        BEGIN
//            SET @Tax = @Tax + (@RemainingSalary - 300000) * 0.05;
//        END
        
//        -- Insert result into temp table
//        INSERT INTO @Results (EmpCode, Name, Designation, Salary, Tax)
//        VALUES (@EmpCode, @Name, @Designation, @Salary, @Tax / 12); -- Divide tax by 12 to get monthly tax

//        -- Fetch the next employee
//        FETCH NEXT FROM employee_cursor INTO @EmpCode, @Name, @Designation, @Salary;
//    END
    
//    CLOSE employee_cursor;
//    DEALLOCATE employee_cursor;
    
//    -- Return the final results
//    SELECT * FROM @Results;
//END;
//GO
//USE [master]
//GO
//ALTER DATABASE [TaxCalculator] SET  READ_WRITE 
//GO

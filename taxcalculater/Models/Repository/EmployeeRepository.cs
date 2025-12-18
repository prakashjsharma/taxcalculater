using Dapper;
using taxcalculater.Models;
using Microsoft.Data.SqlClient;
using System.Data;


namespace taxcalculater.Models.Repository
{
    public class EmployeeRepository
    {
        private readonly string _connectionString;

        public EmployeeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<Employee> GetEmployeesWithTax()
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                return db.Query<Employee>("CalculateTaxResult", commandType: CommandType.StoredProcedure);
                //return result ?? new List<Employee>();
            }
        }
        public void AddEmployee(Employee employee)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                // Insert the employee data into the Employees2510 table
                db.Execute("INSERT INTO Employees2510 ( Name, Designation, Salary) VALUES ( @Name, @Designation, @Salary)", employee);
            }
        }

        public void UpdateEmployee(Employee employee)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                // Update the employee data and calculate new tax
                IDbConnection db1 = db;
                db.Execute("UPDATE Employees2510 SET Name = @Name, Designation = @Designation, Salary = @Salary WHERE EmpCode = @EmpCode", employee);
                //db.Execute("Update Employees2510 Set Name= @Name,Desiganation=@Desiganation, Salary=@Salary where EmpCode=@EmpCode", employee);
            }
        }
    }
}

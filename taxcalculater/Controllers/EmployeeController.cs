using System.Linq;
using taxcalculater.Models;
using Microsoft.AspNetCore.Mvc;
using taxcalculater.Models.Repository;

namespace taxcalculater.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeRepository _repository;

        public EmployeeController(EmployeeRepository repository)
        {
            _repository = repository;
        }

        public IActionResult Index()
        {
            var employees = _repository.GetEmployeesWithTax();
            return View(employees);
        }
        // GET: Employee/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Employee/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Employee employee)
        {
            if (ModelState.IsValid)
            {
                _repository.AddEmployee(employee);
                return RedirectToAction(nameof(Index));
            }
            return View(employee);
        }

        // GET: Employee/Edit/5
        public IActionResult Edit(int id)
        {
            // Fetch the employee to edit
            var employees = _repository.GetEmployeesWithTax();
            var employee = employees.FirstOrDefault(e => e.EmpCode == id);
            if (employee == null)
            {
                return NotFound();
            }
            return View(employee);
        }

        // POST: Employee/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Employee employee)
        {
            if (id != employee.EmpCode)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                // Update the employee's information
                _repository.UpdateEmployee(employee);

                // Redirect to Index to see the updated list with recalculated tax
                return RedirectToAction(nameof(Index));
            }
            return View(employee);
        }
    }
}

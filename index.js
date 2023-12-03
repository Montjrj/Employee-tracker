const inquirer = require("inquirer");
const db = require("./db/connection");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "next",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add a Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      //console.log(response);

      switch (response.next) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add a Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        default:
          quit();
      }
    });
}

function viewAllDepartments() {
  db.promise()
    .query("SELECT * FROM department")
    .then(([response]) => {
      console.table(response);
      mainMenu();
    });
}

function viewAllRoles() {
  db.promise()
    .query(
      "SELECT title, department.department_name as department, salary FROM role LEFT JOIN department on role.department_id = department.id"
    )
    .then(([response]) => {
      console.table(response);
      mainMenu();
    });
}

function viewAllEmployees() {
  db.promise()
    .query(
      `
      SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.department_name as department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) as manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `
    )
    .then(([response]) => {
      console.table(response), mainMenu();
    })
    .catch((error) => {
      console.error("Error querying employees:", error);
      mainMenu();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department? ",
      },
    ])
    .then((response) => {
      //let department_name = response;
      db.promise()
        .query("INSERT INTO department SET ?", response)
        .then(() => {
          console.log(
            `Added ${JSON.stringify(response.department_name)} to the database`
          );
        })
        .then(() => {
          //viewAllDepartments();
          mainMenu();
        })
        .catch((err) => {
          console.error("Error querying roles:", err);
        });
    });
  //console.log("add role employees");
}

function addEmployee() {
  db.promise()
    .query("SELECT * FROM role")
    .then(([res]) => {
      const getRoles = res.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      db.promise()
        .query(
          "SELECT id, CONCAT(first_name, ' ', last_name) as manager FROM employee"
        )
        .then(([managers]) => {
          const managerChoices = managers.map(({ id, manager }) => ({
            name: manager,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the last name of the employee?",
              },
              {
                type: "list",
                name: "role_id",
                message: "What is the role for this employee?",
                choices: getRoles,
              },
              {
                type: "list",
                name: "manager_id",
                message: "Who is the manager for this employee?",
                choices: managerChoices,
              },
            ])
            .then((response) => {
              db.promise()
                .query("INSERT INTO employee SET ?", response)
                .then(() => {
                  const { first_name, last_name } = response;
                  console.log(
                    `${first_name} ${last_name} has been added to the database.`
                  );
                  mainMenu();
                });
            });
        });
    });
}


const someArr = [[{data:"data from db"}],[{data:"soome trash meta data"}]]

const [departments] = someArr
function addRole() {
  db.promise()
    .query("SELECT id, department_name FROM department;")
    .then(([departments]) => {
      const depChoices = departments.map((dep) => {
        return { name: dep.department_name, value: dep.id };
      });

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the name of the role?  ",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?  ",
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?  ",
            choices: depChoices,
          },
        ])
        .then((answers) => {
          const { title, salary, department_id } = answers;

          // Assuming you have a 'role' table in your database
          const sql =
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
          const values = [title, salary, department_id];

          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("Error adding role:", error);
            } else {
              console.log(`Role '${title}' added successfully!`);
            }

            setTimeout(mainMenu, 4000);
          });
        });
    });
}

function updateEmployeeRole() {

db.promise ().query("SELECT id, first_name, last_name FROM employee ")
.then(([employeedata]) => {
  const employeeChoices = employeedata.map((employee)=> {
    console.log(employee);
    return {name: employee.first_name + " " + employee.last_name, value: employee.id };
  })
console.log(employeeChoices)
db.promise().query("SELECT id, title FROM role")
.then(([roledata]) => {
  const rolechoices = roledata.map((role) => {
    return {name: role.title, value: role.id}
  })
inquirer 
.prompt([ 
  {
    type:"list",
    name:"employee_id",
    message: "Which employee's role do you want to update?",
    choices: employeeChoices, 
  },
  {
    type:"list",
    name:"role_id",
    message: "Which role do you want to assign the selected employee? ",
    choices: rolechoices,
  },
])
.then((answer) => {
  const { employee_id, role_id} = answer; 

  const sql =
            "UPDATE employee SET role_id = ? where id =? "
          const values = [role_id, employee_id];

          db.query(sql, values, (error, results) => {
            if (error) {
              console.error("Error adding role:", error);
            } else {
              console.log(` Employee updated successfully!`);
            }

            setTimeout(mainMenu, 4000);
          });


})

})

})





}


function quit() {
  console.log("bye!");
  process.exit();
}

mainMenu();

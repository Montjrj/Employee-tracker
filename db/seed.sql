--// Insert data in the database
 

INSERT INTO department(department_name)
VALUES ("Sales"), 
        ("Information Tech"),
        ("Property Management"),
        ("Research and analysis"),
        ("Legal"),
        ("accounting");
    

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 150000.00, 1), 
        ("Sales Consulant", 90000.00, 1),
        ("Sr. Recruiter", 100000, 1),
         ("Systems analyst", 150000.00, 2), 
        ("service desk analyst", 90000.00, 2),
        ("Network Engineer", 100000, 2),
         ("On-Site propery Manager", 150000.00, 3), 
        ("Assistant propery Manager", 90000.00, 3),
        ("Sr. Propery Manager", 100000, 3),
         ("Data Scientist", 150000.00, 4), 
        ("process master", 90000.00, 4),
        ("product owner", 100000, 4),
         ("Attorney", 150000.00, 5), 
        ("Paralegal", 90000.00, 5),
        ("Social Worker", 100000, 5),
         ("Bookkeeper", 150000.00, 6), 
        ("staff accountants", 90000.00, 6),
        ("Sr.accountants", 100000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Reggie", "Miller", 2, 1),
        ("Scottie", "Pippen", 1, 1),
        ("Mike", "Jordan", 1, 3);


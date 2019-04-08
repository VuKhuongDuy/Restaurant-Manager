use restaurant;

CREATE TABLE MyTable
(
	id INT NOT NULL AUTO_INCREMENT,
	statusNow VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Bill
(
	id INT NOT NULL AUTO_INCREMENT,
    id_table INT NOT NULL,
    check_date DATE NOT NULL,
    total_cost INT NOT NULL,
    payment varchar(10) not null,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_id_table
    FOREIGN KEY(id_table)
    REFERENCES mytable(id)
);

CREATE TABLE Food
(
	id INT NOT NULL,
    food_name NVARCHAR(100),
    food_price INT,
    
    PRIMARY KEY (id)
);

CREATE TABLE Employee
(
	id INT NOT NULL,
    employee_name NVARCHAR(100) NOT NULL,
    sex VARCHAR(10),
    birthday DATE,
    phone VARCHAR(20),
    salary INT,
    count_leave INT,
    PRIMARY KEY (id)
);

CREATE TABLE BillDetail
(
	id INT NOT NULL,
    id_food INT,
    food_count INT,
    
    PRIMARY KEY (id, id_food),
    CONSTRAINT fk_id_Bill
    FOREIGN KEY (id)
    REFERENCES Bill(id),
    
    CONSTRAINT fk_id_food
	FOREIGN KEY (id_food)
	REFERENCES Food(id)
);

CREATE TABLE Account
(
	user_account VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (user_account, user_password)
);


CREATE TABLE Employ_work
(
    id INT NOT NULL,
    working NVARCHAR(50),
    countleave INT,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_id_employee
    FOREIGN KEY(id)
    REFERENCES Employee(id)
);

insert into MyTable(statusNow)
values 
("empty"),
("empty"),
("notempty"),
("empty"),
("empty"),
("empty"),
("notempty"),
("empty"),
("notempty");

INSERT INTO food(id,food_name,food_price)
values 
("1","Gà rán","30000"),
("2","Bít tết","200000"),
("3","Bò hầm","100000"),
("4","Bún bò","30000"),
("5","Mực xào","80000"),
("6","Mì gà","35000"),
("7","Pizza","60000");

INSERT INTO Account(user_account,user_password)
values 
("vuduy","manunited"),
("manager","12345678");

INSERT INTO Bill(id_table,check_date,total_cost,payment)
VALUES 
(2,"2019-03-26",1200000,'yes'),
(3,"2019-03-27",900000,'no'),
(1,"2019-03-21",1200000,'yes'),
(5,"2019-02-26",100000,'yes'),
(4,"2019-03-26",2300000,'yes'),
(6,"2019-03-26",100000,'yes'),
(7,"2019-03-26",100000,'yes'),
(9,"2019-03-26",100000,'yes');

INSERT INTO BillDetail(id,id_food,food_count)
VALUES 
(2,1,3),
(2,2,1),
(3,2,1),
(4,3,5),
(4,2,1),
(5,5,1),
(6,2,1),
(6,3,1);

INSERT INTO Employee(id,employee_name,sex,birthday,phone,salary,count_leave)
VALUES 
(1,"Vũ Khương Duy","male","1999-05-23","0858667208",15000000,0),
(2,"Nguyễn Đình Huy","male","1999-02-27","032327118",5000000,1),
(3,"Nguyễn Thị Thu Phương","female","1999-01-19","0851237223",5000000,3),
(4,"Linda Cofield","female","1999-11-12","099118555",6000000,2),
(5,"Abraham Trump","male","1980-05-23","0564561231",8000000,0);


INSERT INTO Employ_work(id,working,countleave)
VALUES 
(1,"Quản lí",0),
(2,"Đầu bếp",0),
(3,"Đầu bếp",1),
(4,"Phục vụ",2),
(5,"Phục vụ",2);

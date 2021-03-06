﻿use restaurant;

CREATE TABLE MyTable
(
	id INT NOT NULL AUTO_INCREMENT,
	status VARCHAR(25) NOT NULL,
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
	category varchar(20),
    food_name NVARCHAR(100),
    food_price INT,
    
    PRIMARY KEY (food_name)
);

CREATE TABLE Employee
(
	id INT NOT NULL,
	id_account int not null,
    name NVARCHAR(100) NOT NULL,
    sex VARCHAR(10),
    birthday DATE,
    phone VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE BillDetail
(
	id INT NOT NULL,
    food_name nvarchar(150),
    food_count INT,
    
    PRIMARY KEY (id, food_name),
    CONSTRAINT fk_id_Bill
    FOREIGN KEY (id)
    REFERENCES Bill(id),
    
    CONSTRAINT fk_food_name
	FOREIGN KEY (food_name)
	REFERENCES Food(food_name)
);

CREATE TABLE Account
(
	id int not null AUTO_INCREMENT,
	user_account VARCHAR(50) NOT NULL,
    	user_password VARCHAR(50) NOT NULL,
    	PRIMARY KEY (id)
);


CREATE TABLE Employ_work
(
    id INT NOT NULL,
    working NVARCHAR(50),
    salary INT,
    countleave INT,
    
    PRIMARY KEY (id),
    CONSTRAINT fk_id_employee
    FOREIGN KEY(id)
    REFERENCES Employee(id)
);

insert into MyTable(status)
values 
("empty"),
("empty"),
("empty"),
("empty"),
("empty"),
("empty"),
("empty"),
("empty"),
("empty");

INSERT INTO food(id,category,food_name,food_price)
values 
("1","food","Bít tết","200000"),
("2","food","Bò hầm","100000"),
("3","food","Bún bò","30000"),
("4","food","Mực xào","80000"),
("5","food","Mì gà","35000"),
("6","food","Pizza","60000"),
("7","food","Gà rán","30000"),
("8","food","Giò heo hầm ngải","80000"),
("9","food","Dê nướng","100000"),
("10","food","Lẩu thái","150000"),
("11","food","Lẩu gà","180000"),
("12","food","Cá nướng","90000"),
("13","food","Mực nướng","140000"),
("1","drinks","Cafe","30000"),
("2","drinks","CoCaCoLa","10000"),
("3","drinks","Cam vắt","25000"),
("4","drinks","Nước dưa hấu","20000"),
("5","drinks","Sữa chua dầm quả","20000"),
("6","drinks","Nước bưởi","20000"),
("7","drinks","Nước mía","10000"),
("8","drinks","Soda","10000"),
("9","drinks","Trà mộc","30000"),
("10","drinks","Sâm panh","200000"),
("11","drinks","Rượu nho","500000");

INSERT INTO Account(user_account,user_password)
values 
("vuduy","manunited"),
("manager","12345678");


INSERT INTO Employee(id,id_account,name,sex,birthday,phone)
VALUES 
(1,1,"Vũ Khương Duy","male","1999-05-23","0858667208"),
(2,2,"Nguyễn Đình Huy","male","1999-02-27","032327118"),
(3,3,"Nguyễn Thị Thu Phương","female","1999-01-19","0851237223"),
(4,4,"Linda Cofield","female","1999-11-12","099118555"),
(5,5,"Abraham Trump","male","1980-05-23","0564561231");


INSERT INTO Employ_work(id,working,salary,countleave)
VALUES 
(1,"Quản lí",10000,0),
(2,"Đầu bếp",5000,0),
(3,"Đầu bếp",7000,1),
(4,"Phục vụ",5000,2),
(5,"Phục vụ",4000,2);

CREATE TABLE blogs
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE authors
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(45) NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE tags
(
    id INT NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE blogtags
(
    blogid INT NOT NULL,
    tagid INT NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blogid,tagid),
    CONSTRAINT fk_mn_blogid 
        FOREIGN KEY(blogid)
        REFERENCES blogs(id),
    CONSTRAINT fk_mn_tagid
        FOREIGN KEY (tagid)
        REFERENCES tags(id)
        ON DELETE CASCADE
);

CREATE TABLE tokens
(
    id INT NOT NULL auto_increment,
    authorid INT NOT NULL,
  PRIMARY KEY (id, authorid),
 CONSTRAINT authorid_fk
    FOREIGN KEY (authorid)
    REFERENCES authors(id)

);

INSERT INTO blogs(title, content,_created)
VALUES('Blog Title 1','Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-18 09:38:32'),
('Blog Title 2','Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-19 09:38:33'),
('Blog Title 3','Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-20 09:38:34'),
('Blog Title 4','Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-21 09:38:35'),
('Blog Title 5','Words Words Words .Words .Words .Words. Words. Words .Words Words Words Words .Words','2018-09-24 09:38:36');

INSERT INTO authors(name,email,password)
VALUES  ('Charles','test1@test.com','********'),
        ('Jemma','test2@test.com','********'),
        ('Kim','test3@test.com','********'),
        ('Amanda','test4@test.com','********'),
        ('Kenji','test5@test.com','********'),
        ('John','test6@test.com','********'),
        ('Candice','test7@test.com','********'),
        ('Robert','test8@test.com','********'),
        ('Tina','test9@test.com','********'),
        ('Patricia','test10@test.com','********');

INSERT INTO tags(name)
VALUES  ('food'),      
        ('coding'),
        ('fun'),
        ('sports'),
        ('games'),
        ('television'),
        ('Covalence'),
        ('javascript'),
        ('movies'),
         ('tech');

INSERT INTO blogstags(blogid,tagid)
VALUES
(1,1),
(1,3),
(1,5),
(1,4),
(2,2),
(2,7),
(2,8),
(3,6),
(3,10),
(3,2),
(3,3),
(4,2),
(4,10),
(4,3),
(5,9),
(5,6),
(5,10),
(5,1),
(5,3);
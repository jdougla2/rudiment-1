create database workshop;
\c workshop

create table workshops (
	    wsName text
);

create table attendees (
	    attendee varchar,
	    workshop varchar
);

insert into attendees values 
    ('Ahmed Abdelali', 'React Fundamentals'),
    ('Ann Frank', 'React Fundamentals'),
    ('Ann Mulkern', 'React Fundamentals'),
    ('Clara Weick', 'React Fundamentals'),
    ('James Archer', 'React Fundamentals'),
    ('Linda Parker', 'React Fundamentals'),
    ('Lucy Smith', 'React Fundamentals'),
    ('Roz Billingsley', 'React Fundamentals'),
    ('Samantha Eggert', 'React Fundamentals'),
    ('Tim Smith', 'React Fundamentals');

insert into workshops values
    ('DevOps 101'),
    ('Docker Container Fundamentals'),
    ('Machine Learning'),
    ('Modern Javascript'),
    ('MongoDB'),
    ('React Fundamentals'),
    ('Self-Driving Cars');

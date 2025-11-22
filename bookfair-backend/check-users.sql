-- SQL queries to check users in the database

-- View all users
SELECT id, name, email, role, business_name, business_id, phone 
FROM users;

-- View users with their roles
SELECT email, name, role, business_name 
FROM users 
ORDER BY role, email;

-- Count users by role
SELECT role, COUNT(*) as count 
FROM users 
GROUP BY role;

-- View specific user by email
-- SELECT * FROM users WHERE email = 'your-email@example.com';


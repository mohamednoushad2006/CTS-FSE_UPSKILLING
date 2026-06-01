SELECT MONTH(registration_date) AS month, COUNT(*) AS total FROM Registrations
GROUP BY MONTH(registration_date);
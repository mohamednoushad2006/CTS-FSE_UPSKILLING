SELECT e.title, e.city, e.start_date FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
JOIN Users u ON u.user_id = r.user_id
WHERE e.status = 'upcoming' AND e.city = u.city
ORDER BY e.start_date;
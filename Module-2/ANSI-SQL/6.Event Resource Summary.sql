SELECT event_id, resource_type, COUNT(*) AS total FROM Resources
GROUP BY event_id, resource_type;
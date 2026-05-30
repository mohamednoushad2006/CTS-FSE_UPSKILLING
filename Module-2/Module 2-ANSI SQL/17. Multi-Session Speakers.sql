SELECT speaker_name, COUNT(*) AS sessions FROM Sessions
GROUP BY speaker_name
HAVING COUNT(*) > 1;
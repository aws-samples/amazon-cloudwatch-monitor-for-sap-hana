SELECT * FROM
	( SELECT 'MEDIUM' as "RATING", COUNT(ALERT_RATING) AS "ALERT_COUNT_MEDIUMS"
		FROM _SYS_STATISTICS.STATISTICS_CURRENT_ALERTS
		WHERE ALERT_RATING='3'
		GROUP BY ALERT_RATING )
;
select  max(date), 
	    sum(conf_count) confirmed, 
	    sum(cured_count) cured,
	    sum(dead_count) dead,
		(sum(conf_count) + sum(cured_count) + sum(dead_count)) total
        from daily_stats_world 
        where date = (select max(date ) from daily_stats_world) 

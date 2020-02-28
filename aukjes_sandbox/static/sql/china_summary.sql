select  max(date), 
	    sum(conf_count) total,
		sum(conf_count)-sum(cured_count)-sum(dead_count) sick,
	    sum(cured_count) cured, 
	    sum(dead_count) dead,
		round((sum(conf_count)-sum(cured_count)-sum(dead_count)) /cast(sum(conf_count)as decimal)*100,1) pct_sick,
		round(cast(sum(cured_count) as decimal)/sum(conf_count)*100,1) pct_cured,
		round(cast(sum(dead_count) as decimal)/sum(conf_count)*100,1) pct_dead
        from daily_stats
        where date = (select max(date ) from daily_stats)
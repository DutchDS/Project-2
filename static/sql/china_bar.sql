select date, 
	sum(conf_count)-sum(cured_count)-sum(dead_count) positive, 
	sum(cured_count) cured, 
	sum(dead_count) dead ,
	sum(susp_count) suspected
    from daily_stats
    group by date
    order by date  
select date, 
	sum(conf_count)-sum(cured_count)-sum(dead_count) positive, 
	sum(cured_count) cured, 
	sum(dead_count) dead 
    from daily_stats_world 
    where country <> 'China' 
    group by date
    order by date  
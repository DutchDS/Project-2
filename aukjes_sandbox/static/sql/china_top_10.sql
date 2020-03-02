select  
	american_name, 
	sum(conf_count) total,
	sum(conf_count)-sum(cured_count)-sum(dead_count) sick, 
	sum(cured_count) cured, 
	sum(dead_count) dead,
	max(date)
    from daily_stats 
    where date = (select max(date ) from daily_stats) 
    group by american_name 
    order by total desc 
	limit 10
	
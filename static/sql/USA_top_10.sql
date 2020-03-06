select  
	substring(american_name, position(', ' in american_name)+2, 2) state, 
	sum(conf_count) total,
	sum(conf_count)-sum(cured_count)-sum(dead_count) sick, 
	sum(cured_count) cured, 
	sum(dead_count) dead,
	max(date)
    from daily_stats_world 
    where date = (select max(date ) from daily_stats_world) and country = 'United States of America'
    group by country, substring(american_name, position(', ' in american_name)+2, 2)
	having substring(american_name, position(', ' in american_name)+2, 2) <> 'na'
    order by total desc 
	limit 10
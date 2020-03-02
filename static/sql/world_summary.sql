select  max(date),
		sum(conf_count) total,
		sum(conf_count)-sum(cured_count)-sum(dead_count) sick,
	    sum(cured_count) cured, 
	    sum(dead_count) dead,
		round((sum(conf_count)-sum(cured_count)-sum(dead_count)) /cast(sum(conf_count)as decimal)*100,1) pct_sick,
		round(cast(sum(cured_count) as decimal)/sum(conf_count)*100,1) pct_cured,
		round(cast(sum(dead_count) as decimal)/sum(conf_count)*100,1) pct_dead,
		'ALL (excl. China)' as group_country
        from daily_stats_world  
        where date = (select max(date ) from daily_stats_world)
		and country <> 'China'
		group by group_country

union

select  max(date),
		sum(conf_count) total,
		sum(conf_count)-sum(cured_count)-sum(dead_count) sick,
	    sum(cured_count) cured, 
	    sum(dead_count) dead,
		round((sum(conf_count)-sum(cured_count)-sum(dead_count)) /cast(sum(conf_count)as decimal)*100,1) pct_sick,
		round(cast(sum(cured_count) as decimal)/sum(conf_count)*100,1) pct_cured,
		round(cast(sum(dead_count) as decimal)/sum(conf_count)*100,1) pct_dead,
		'China' as group_country
        from daily_stats_world  
        where date = (select max(date ) from daily_stats_world)
		and country = 'China'
		group by group_country
union

select  max(date),
		sum(conf_count) total,
		sum(conf_count)-sum(cured_count)-sum(dead_count) sick,
	    sum(cured_count) cured, 
	    sum(dead_count) dead,
		round((sum(conf_count)-sum(cured_count)-sum(dead_count)) /cast(sum(conf_count)as decimal)*100,1) pct_sick,
		round(cast(sum(cured_count) as decimal)/sum(conf_count)*100,1) pct_cured,
		round(cast(sum(dead_count) as decimal)/sum(conf_count)*100,1) pct_dead,
		'USA' as group_country
        from daily_stats_world  
        where date = (select max(date ) from daily_stats_world)
		and country = 'United States of America'
		group by group_country
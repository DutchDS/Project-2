select date, 
-- 	substring(american_name, position(', ' in american_name)+2, 2) state, 
		us_state state,
	sum(conf_count)-sum(cured_count)-sum(dead_count) positive, 
	sum(cured_count) cured, 
	sum(dead_count) dead
from daily_stats_world, us_states
where country = 'United States of America' and position('(From Diamond Princess)' in american_name) = 0
	and substring(american_name, position(', ' in american_name)+2, 2) = abbr
group by date, state, us_state, substring(american_name, position(', ' in american_name)+2, 2)
having substring(american_name, position(', ' in american_name)+2, 2) <> 'na'
	and sum(conf_count) > 0
order by date, state
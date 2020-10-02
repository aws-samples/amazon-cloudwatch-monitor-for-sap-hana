select TOP 1 d.usage_type, ROUND(MAX( d.total_size)/1024/1024/1024, 1) AS "TOTAL_SIZE_DATA_GB", ROUND(MAX( d.used_size)/1024/1024/1024, 1) AS "USED_SIZE_DATA_GB"
from ( ( m_volumes as v1 join M_VOLUME_SIZES as v2 on v1.volume_id = v2.volume_id ) right outer join m_disks as d on d.disk_id = v2.disk_id )
where USAGE_TYPE = 'DATA' group by d.total_size, d.usage_type, d.used_size
-- Sequential clustering function that processes unassigned reports one by one
-- For each report, it tries to find a matching existing crime or creates a new one

CREATE OR REPLACE FUNCTION cluster_reports_sequential()
RETURNS TABLE(
    reports_processed INTEGER,
    new_crimes_created INTEGER,
    reports_assigned INTEGER
) 
LANGUAGE plpgsql AS $$
DECLARE
    report_record RECORD;
    matching_crime_id INTEGER;
    new_crime_id INTEGER;
    processed_count INTEGER := 0;
    new_crimes_count INTEGER := 0;
    assigned_count INTEGER := 0;
BEGIN
    -- Loop through all unassigned reports ordered by created_at
    FOR report_record IN 
        SELECT r.id, r.location, r.description, r.crime_category_id, r.created_at
        FROM "Report" r 
        WHERE r.crime_id IS NULL 
        ORDER BY r.created_at ASC
    LOOP
        processed_count := processed_count + 1;
        matching_crime_id := NULL;
        
        -- Try to find a matching existing crime
        -- Look for crimes that have at least one report matching our criteria
        SELECT DISTINCT c.id INTO matching_crime_id
        FROM "Crime" c
        INNER JOIN "Report" existing_r ON c.id = existing_r.crime_id
        WHERE 
            -- Same crime category
            existing_r.crime_category_id = report_record.crime_category_id
            -- Within 100 meters distance
            AND ST_DWithin(existing_r.location, report_record.location, 100)
            -- Within 1 hour time window
            AND ABS(EXTRACT(EPOCH FROM (existing_r.created_at - report_record.created_at))) <= 3600
        LIMIT 1;
        
        IF matching_crime_id IS NOT NULL THEN
            -- Assign report to existing crime
            UPDATE "Report" 
            SET crime_id = matching_crime_id
            WHERE id = report_record.id;
            
            assigned_count := assigned_count + 1;
        ELSE
            -- Create new crime and assign report to it
            INSERT INTO "Crime" (location, description, crime_category_id, created_at, updated_at)
            VALUES (
                report_record.location,
                report_record.description,
                report_record.crime_category_id,
                report_record.created_at,
                NOW()
            )
            RETURNING id INTO new_crime_id;
            
            -- Assign report to new crime
            UPDATE "Report" 
            SET crime_id = new_crime_id
            WHERE id = report_record.id;
            
            new_crimes_count := new_crimes_count + 1;
            assigned_count := assigned_count + 1;
        END IF;
    END LOOP;
    
    -- Return statistics
    reports_processed := processed_count;
    new_crimes_created := new_crimes_count;
    reports_assigned := assigned_count;
    
    RETURN NEXT;
END;
$$;

-- Usage example (commented out):
-- SELECT * FROM cluster_reports_sequential();
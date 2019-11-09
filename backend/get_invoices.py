import json
import logging
import os
import pymysql


rds_host = os.environ.get('DB_HOST')
name = os.environ.get('DB_USER')
password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=3, autocommit=True)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

query = """
SELECT
    ci.`qty`,
    i.`id`,
    i.`name`,
    i.`price`,
    i.`taxable`,
    i.`imported`
FROM
    `carts` c
    INNER JOIN `cart_items` ci ON c.`id` = ci.`cart_id`
    INNER JOIN `items` i ON i.`id` = ci.`item_id`
WHERE
    c.`alias` = %s
"""

def lambda_handler(event, context):
    with conn.cursor() as cur:
        cur.execute(query, (event['pathParameters']['id']))
        
        result = cur.fetchall()
        
        items = []
        for row in result:
            items.append({
                'qty': row[0],
                'item': {
                    'id': row[1],
                    'name': row[2],
                    'price': row[3],
                    'taxable': row[4] == 1,
                    'imported': row[5] == 1,
                }
            })

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({
                'alias': event['pathParameters']['id'],
                'items': items,
            })
        }

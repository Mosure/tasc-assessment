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

query_cart = """
    INSERT INTO `carts` (alias)
    VALUES (%s);
"""

query_cart_items = """
    INSERT INTO `cart_items` (cart_id, item_id, qty) VALUES (%s, %s, %s);
"""

def lambda_handler(event, context):
    with conn.cursor() as cur:
        cart = json.loads(event['body'])

        cur.execute(query_cart, cart['alias'])

        cart_id = cur.lastrowid

        cur.executemany(query_cart_items, [(cart_id, item['item']['id'], item['qty']) for item in cart['items']])

        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            'body': json.dumps({
                'id': cart_id,
            })
        }

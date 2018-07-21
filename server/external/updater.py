#!/usr/bin/env python3

from youtrack.connection import Connection as YT
import argparse
import requests
from urllib.parse import quote

TOKEN = 'perm:YS5icnl1a2hhbm92.SVNQ.IeAi1lOi1y3HkzATC9xxI5LzW1kMEx'
LOGIN = 'a.bryukhanov'
PASSWORD = 'L;tr1Djhj,tq2'
ID = 'ISP'
MAX = 500
AFTER = 0
TEST_NAME = 'Заварушка в Доренберге'
YT_PATH = 'https://yohoho.myjetbrains.com/youtrack/'

BASE_FILTER = 'type:Task '
FILTER_FINISHED = 'state:Done '
FILTER_CRITICAL = 'priority:Critical '
FILTER_PARROT = 'tag:Попугай '
FILTER_RUM = 'tag:{Бутылка рома} '


class Fish:
    def __init__(self):
        self.conn = YT(YT_PATH, LOGIN, PASSWORD)

    def get_issue_data(self, project_id, request_filter, divider):
        issues = self.conn.get_issues(project_id, request_filter, AFTER, MAX)
        total_reward = 0
        for issue in issues:
            total_reward += int(issue.get('Estimation', 0))

        finished_issues = self.conn.get_issues(project_id, request_filter + FILTER_FINISHED, AFTER, MAX)
        total_cost = 0
        for issue in finished_issues:
            total_cost += int(issue.get('Spent time', 0)) if int(issue.get('Spent time', 0)) < int(issue.get('Estimation', 0)) else int(issue.get('Estimation', 0))

        return list(map(lambda x: x // divider, [total_reward, total_cost]))


def main():
    parser = argparse.ArgumentParser(description='')
    args = parser.parse_args()

    conn = Fish()

    gold_filter = BASE_FILTER + 'sprints:{' + TEST_NAME + '} ' + FILTER_CRITICAL
    parrot_filter = gold_filter + FILTER_PARROT
    rum_filter = gold_filter + FILTER_RUM

    gold = conn.get_issue_data(ID, gold_filter, 1)
    parrot = conn.get_issue_data(ID, parrot_filter, 60)
    rum = conn.get_issue_data(ID, rum_filter, 60)

    data = {
        'name': TEST_NAME,
        'begin': '21/07/2018',
        'end': '22/07/2018',
        'gold': gold[0], 'curr_gold': gold[1], 'total_gold': 5000,
        'parrot': parrot[0], 'curr_parrot': parrot[1], 'total_parrot': 10,
        'diamond': rum[0], 'curr_diamond': rum[1], 'total_diamond': 20,
        'total_scull': 50,
        'total_crown': 3,
        'task1': 'Read map', 'count1': 4,
        'task2': 'Tales', 'count2': 2,
        'current': 1,
    }

    if requests.get('http://localhost:3000/api/sprint/' + quote(TEST_NAME)).json() is not None:
        print('update sprint: ' + TEST_NAME)
        print(requests.put('http://localhost:3000/api/sprint/' + quote(TEST_NAME), data))
    else:
        print('new sprint: ' + TEST_NAME)
        print(requests.post('http://localhost:3000/api/sprint', data))


if __name__ == '__main__':
    main()

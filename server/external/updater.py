#!/usr/bin/env python3

from youtrack.connection import Connection as YT
import argparse
import json
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
SPRINT_FILTER = 'sprints:{Заварушка в Доренберге} '
FILTER_FINISHED = 'state:Done '
FILTER_CRITICAL = 'priority:Critical '
FILTER_PARROT = 'tag:Попугай '
FILTER_RUM = 'tag:{Бутылка рома} '


class Fish:
    def __init__(self):
        self.conn = YT(YT_PATH, LOGIN, PASSWORD)

    def get_issue_data(self, project_id, filter):
        issues = self.conn.get_issues(project_id, filter, AFTER, MAX)
        total_reward = 0
        for issue in issues:
            total_reward += int(issue.get('Estimation', 0))

        finished_issued = self.conn.get_issues(project_id, filter + FILTER_FINISHED, AFTER, MAX)
        total_cost = 0
        for issue in finished_issued:
            total_cost += int(issue.get('Spent time', 0)) if int(issue.get('Spent time', 0)) < int(issue.get('Estimation', 0)) else int(issue.get('Estimation', 0))

        return [total_reward, total_cost]


def main():
    parser = argparse.ArgumentParser(description='')
    args = parser.parse_args()

    sprint = Fish()

    gold_filter = BASE_FILTER + SPRINT_FILTER + FILTER_CRITICAL
    parrot_filter = gold_filter + FILTER_PARROT
    rum_filter = gold_filter + FILTER_RUM

    gold = sprint.get_issue_data(ID, gold_filter)
    parrot = sprint.get_issue_data(ID, parrot_filter)
    rum = sprint.get_issue_data(ID, rum_filter)

    data = {
        'name': TEST_NAME,
        'gold': gold[0], 'curr_gold': gold[1],
        'parrot': parrot[0], 'curr_parrot': parrot[1],
        'diamond': rum[0], 'curr_diamond': rum[1]
    }

    if '_id' in requests.get('http://localhost:3000/api/sprint/' + quote(TEST_NAME)).json():
        print('update sprint: ' + TEST_NAME)
        print(requests.put('http://localhost:3000/api/sprint/' + quote(TEST_NAME), data))
    else:
        print('new sprint: ' + TEST_NAME)
        print(requests.post('http://localhost:3000/api/sprint', data))


if __name__ == '__main__':
    main()
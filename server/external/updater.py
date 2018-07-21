#!/usr/bin/env python3

from youtrack.connection import Connection as YT
import argparse
import json
import requests


TOKEN = 'perm:YS5icnl1a2hhbm92.SVNQ.IeAi1lOi1y3HkzATC9xxI5LzW1kMEx'
ID = 'ISP'
MAX = 500
AFTER = 0

BASE_FILTER = 'type:Task '
SPRINT_FILTER = 'sprints:{Заварушка в Доренберге} '
FILTER_FINISHED = 'state:Done '
FILTER_CRITICAL = 'priority:Critical '
FILTER_PARROT = 'tag:Попугай '
FILTER_ROME = 'tag:{Бутылка рома} '


class Project:
    def __init__(self, yt_path):
        self.conn = YT(url=yt_path, login='a.bryukhanov', password='L;tr1Djhj,tq2')

    def update(self, local_path, data):
        # get data
        r = requests.post(url=local_path, data=data)


def main():
    parser = argparse.ArgumentParser(description='')
    parser.add_argument('--yt')
    parser.add_argument('--port')
    parser.add_argument('--type')
    args = parser.parse_args()

    conn = Project(args.yt).conn

    common_filter = BASE_FILTER + SPRINT_FILTER + FILTER_CRITICAL# + FILTER_FINISHED
    get_common = conn.get_issues(ID, common_filter, AFTER, MAX)

    gold = 0
    gold_cost = 0
    for issue in get_common:
        reward = int(issue.get('Estimation', 0))
        gold += reward
        cost = int(issue.get('Spent time', 0))
        gold_cost += cost if cost < reward else reward

    parrots_filter = common_filter + FILTER_PARROT
    get_parrots = conn.get_issues(ID, parrots_filter, AFTER, MAX)

    parrots = 0
    parrots_cost = 0
    for issue in get_parrots:
        reward = int(issue.get('Estimation', 0))
        parrots += reward
        cost = int(issue.get('Spent time', 0))
        parrots_cost += cost if cost < reward else reward

    rum_filter = common_filter + FILTER_ROME
    get_rum = conn.get_issues(ID, rum_filter, AFTER, MAX)

    rum = 0
    rum_cost = 0
    for issue in get_rum:
        reward = int(issue.get('Estimation', 0))
        rum += reward
        cost = int(issue.get('Spent time', 0))
        rum_cost += cost if cost < reward else reward

    result = {'gold': {'estimated': gold, 'spent': gold_cost},
              'parrots': {'estimated': parrots, 'spent': parrots_cost},
              'rum': {'estimated': rum, 'spent': rum_cost}}

    print(json.dumps(result))


if __name__ == '__main__':
    main()
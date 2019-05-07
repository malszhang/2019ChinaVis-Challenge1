# 该程序对fr的要求：
# 以time为主因素升序排序
import json

for f_id in range(3):
    file_id = str(f_id+1)
    fr = "../data/day"+file_id+".csv"
    fw_time = "../show_data/day"+file_id+"_time.json"
    fw_timeline = "../show_data/day"+file_id+"_timeline.json"
    fo1 = open(fr, "r")  #打开csv文件
    ls = []
    for line in fo1:
        line = line.replace("\n", "")
        ls.append(line.split(","))
    start = int(ls[1][2])
    _data = []
    pData = []
    timeline = []
    for l in ls:
        if int(l[2]) - start <= 60:
            _data.append(l)
        else:
            pData.append(_data)
            timeline.append(start)
            start = int(l[2])
            _data = []
    timeline.append(start)
    fo1.close()  # 关闭文件流
    fw_time = open(fw_time, "w")  # 打开json文件
    fw_timeline = open(fw_timeline, "w")
    json.dump(pData[0:], fw_time, indent=4)
    json.dump(timeline[0:], fw_timeline, indent=4)
    fw_time.close()
    fw_timeline.close()


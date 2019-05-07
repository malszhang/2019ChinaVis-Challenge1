import json
for f_id in range(3):
    file_id = str(f_id+1)
    file_read = "../data/day"+file_id+".csv"
    file_write = "../show_data/day"+file_id+"_person.json"
    fo1 = open(file_read, "r")  #打开csv文件
    ls = []
    for line in fo1:
        line = line.replace("\n", "")
        ls.append(line.split(","))
    pData = []
    _data = []
    p_id = ls[0][0]
    for l in ls:
        if p_id == l[0]:
            _data.append(l)
        else:
            pData.append(_data)
            _data = []
            p_id = l[0]
    fo1.close()
    fw = open(file_write, "w")
    json.dump(pData[0:], fw, indent=4)
    fw.close()
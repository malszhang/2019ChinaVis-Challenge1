# ===K-means聚类分析===
import numpy as np
import json


class K_means:
    def __init__(self, k=5, maxiter=100):
        self.k = k
        self.maxiter = maxiter

    def dist(self, x, y):
        # 欧式距离公式
        return (sum((x - y) ** 2)) ** 0.5

    def fit(self, data, Iter=0):
        '''
        K-Means算法过程
        :param data: 待聚类样本
        :param Iter: 迭代次数
        :return: 聚类结果,各类中心
        '''
        n, m = data.shape
        dis = np.zeros([n, self.k + 1])  # 构建存放聚类结果的数据框架
        # 1.选中心: 选取前k个样本作为初始聚类中心
        centers = data[:self.k, 1:]
        while Iter < self.maxiter:
            # 2.求距离: 求各样本至各类中心的距离
            for i in range(n):
                for j in range(self.k):
                    dis[i, j] = self.dist(data[i, 1:], centers[j, :])
                # 3.归类: 将每个样本归类为最近的类中心
                dis[i, self.k] = np.argmin(dis[i, :self.k])
            # 4.求新类中心: 将各类中所有样本均值作为新类中心
            centers_new = np.zeros([self.k, m - 1])
            for i in range(self.k):
                index = dis[:, self.k] == i
                if sum(index) > 0:
                    centers_new[i, :] = np.mean(data[index, 1:], axis=0)
                else:
                    centers_new[i, :] = centers[i, :]
            # 5.判定结束: 若类中心不再发生变化或达到迭代次数则算法结束
            if np.all(centers == centers_new) == True:
                break
            centers = centers_new  # 更新类中心
            Iter += 1  # 迭代次数加1
        return dis, centers


for f_id in range(3):
    file_id = str(f_id+1)
    file_read = "../data/day"+file_id+".csv"
    file_write = "../show_data/day"+file_id+"_means.json"
    fo1 = open(file_read, "r")  #打开csv文件
    ls = []
    for line in fo1:
        line = line.replace("\n", "")  #将换行换成空
        ls.append(line.split(","))  #以，为分隔符

    pData = [[ls[0][0], int(ls[0][2]), 0]]  #id + start_time + end_time
    for l in ls:
        if l[0] == pData[-1][0] and int(l[2]) > pData[-1][2]:
            pData[-1][2] = int(l[2])
        if l[0] != pData[-1][0]:
            pData.append([l[0], int(l[2]), 0])
    fo1.close()  #关闭文件流
    n_pData = np.array(pData, dtype='int')
    k = K_means()
    result_dis, result_cen = k.fit(n_pData, 0)

    data = []
    for d_id in pData:
        data.append([d_id[0], 0])
    #groupData 分组信息的数组
    groupData = result_dis[:, -1].tolist()

    i = 0
    for d_group in groupData:
        data[i] = [data[i][0], str(int(d_group))]
        i = i +1

    fw = open(file_write, "w")
    json.dump(data[0:], fw, indent=4)
    fw.close()

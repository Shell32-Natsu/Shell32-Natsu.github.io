---
title: Python+OpenCV图像直方图均衡化处理
url: 176.html
id: 176
categories:
  - Python
date: 2014-11-08 20:29:29
tags:
  - OpenCV
  - Python
---

```python
#coding=utf-8
import cv2
import numpy

print u"图片为同目录下的test.jpg，先显示原图的灰度直方图，关闭后显示变换后的直方图，再关闭显示变换后的图片".encode("gbk")

img = cv2.imread('test.jpg',0)
rows,cols = img.shape

grey_img = numpy.zeros((256,256),numpy.uint8)

hist= cv2.calcHist([img], [0], None, [256], [0.0,255.0])
minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(hist)

for h in range(256):
    intensity = int(hist[h]*256/maxVal)
    cv2.line(grey_img,(h,256), (h,256-intensity),(255,255,255))

cv2.imshow(u"原灰度图".encode('gbk'), grey_img)
cv2.waitKey (0)
cv2.destroyAllWindows()

grey_img_arr = []

for i in hist:
    grey_img_arr.append(int(i[0]))

grey_img_arr_2 = [grey_img_arr[0]]

grey_img_arr_3 = []

for i in range(1,256):
    grey_img_arr_2.append(grey_img_arr_2[i-1] + grey_img_arr[i])

for i in grey_img_arr_2:
    a = (i/921600.0)/(1.0/255.0)
    if a-int(a) > 0.5:
        grey_img_arr_3.append(int(a)+1)
    else:
        grey_img_arr_3.append(int(a))

for i in range(len(grey_img_arr_2)):
    grey_img_arr_2[i] = 0

for i in range(rows):
    for j in range(cols):
        img[i,j] = grey_img_arr_3[img[i,j]]

hist= cv2.calcHist([img], [0], None, [256], [0.0,255.0])
minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(hist)

for h in range(256):
    intensity = int(hist[h]*256/maxVal)
    cv2.line(grey_img,(h,256), (h,256-intensity),(255,255,255))

cv2.imshow(u"变换过的直方图图".encode('gbk'),grey_img)
cv2.waitKey (0)
cv2.destroyAllWindows()

cv2.imshow(u"变换过的图片".encode('gbk'),img)
cv2.waitKey (0)
cv2.destroyAllWindows()
```
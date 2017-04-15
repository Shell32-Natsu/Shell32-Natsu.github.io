---
title: Python+OpenCV图片旋转
url: 116.html
id: 116
categories:
  - Python
date: 2014-10-13 20:31:07
tags:
  - OpenCV
  - Python
  - 备忘
---

```python
import cv2
#载入图片
img = cv2.imread('test.jpg')
#获取长宽
rows,cols,depth = img.shape
#输入要旋转的角度（逆时针）
print 'Please input angle to rotate counterclockwise:'
degree = raw_input()
degree = float(degree)
#旋转
M = cv2.getRotationMatrix2D((cols/2,rows/2),degree,1)
dst = cv2.warpAffine(img,M,(cols,rows))
#显示旋转后的图片
cv2.namedWindow("Image") 
cv2.imshow("Image", dst) 
cv2.waitKey (0)
cv2.destroyAllWindows()
```
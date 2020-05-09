#! /usr/bin/env python3
import unicodedata
import re
import sys
import os
from datetime import datetime

def slugify(value):
  """
  Convert to ASCII if 'allow_unicode' is False. Convert spaces to hyphens.
  Remove characters that aren't alphanumerics, underscores, or hyphens.
  Convert to lowercase. Also strip leading and trailing whitespace.
  """
  value = str(value)
  value = unicodedata.normalize('NFKC', value)
  value = re.sub(r'[^\w\s-]', '', value).strip().lower()
  return value


yaml_headers = '''---
title: '{}'
tags:
  -
categories:
  -
date: {}
---

<!-- more -->

'''

if __name__ == '__main__':
  if len(sys.argv) != 2:
    print('Usage: ./new_post.py [title]')
    exit(1)
  title = sys.argv[1]
  print(f'Title: {title}')
  filename = slugify(title) + '.md'
  print(f'File name: {title}')
  path = os.path.join('source/_posts', filename)
  print(f'File path: {path}')

  if os.path.exists(path):
    print(f'File {path} has already exisited')
    exit(1)

  with open(path, "w+") as f:
    f.write(yaml_headers.format(title, datetime.now().strftime("%Y-%m-%d %H:%M:%S")))

  print('Done.')

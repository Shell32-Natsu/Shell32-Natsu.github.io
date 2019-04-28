hexo.extend.tag.register('sinaimage', function(args){
  const image_url = args[0];
  return `<img src="${image_url}" alt="" referrerpolicy="no-referrer"></img>`
});
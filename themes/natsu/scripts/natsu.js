'use strict';

/* global hexo */

const { stripHTML } = require('hexo-util');

const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g;

function homeConfig() {
  return (hexo.theme.config && hexo.theme.config.home) || {};
}

function isExcluded(post) {
  const excluded = homeConfig().exclude_categories || [];
  if (!excluded.length || !post.categories) return false;
  return post.categories.some(c => excluded.includes(c.name));
}

function plainText(html) {
  return stripHTML(html || '').replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

// Replaces hexo-generator-index: the homepage is a single page listing every
// post except the ones in `home.exclude_categories`.
hexo.extend.generator.register('index', function(locals) {
  const posts = locals.posts.sort('-date').filter(post => !isExcluded(post));
  return {
    path: '',
    layout: ['index', 'archive'],
    data: { __index: true, posts, base: '', total: 1, current: 1 }
  };
});

// Lightweight client-side search index, fetched only when search is opened.
hexo.extend.generator.register('natsu_search', function(locals) {
  const root = this.config.root;
  const posts = locals.posts.sort('-date').map(post => ({
    t: post.title || '',
    u: root + post.path,
    d: post.date.format('YYYY-MM-DD'),
    c: post.categories.map(c => c.name),
    g: post.tags.map(t => t.name),
    x: plainText(post.content).slice(0, 6000)
  }));
  return { path: 'search.json', data: JSON.stringify(posts) };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

hexo.extend.helper.register('natsu_excerpt', (post, length = 140) => {
  if (post.description) return post.description;
  const text = plainText(post.excerpt || post.content);
  return text.length > length ? text.slice(0, length).trim() + '…' : text;
});

// Rough reading time: ~400 CJK characters or ~220 latin words per minute.
hexo.extend.helper.register('natsu_reading_minutes', content => {
  const text = plainText(content);
  const cjk = (text.match(CJK) || []).length;
  const words = (text.replace(CJK, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
});

// Groups a (date-descending) post collection into [{ year, posts }]
hexo.extend.helper.register('natsu_group_by_year', posts => {
  const groups = [];
  posts.forEach(post => {
    const year = post.date.year();
    let last = groups[groups.length - 1];
    if (!last || last.year !== year) {
      last = { year, posts: [] };
      groups.push(last);
    }
    last.posts.push(post);
  });
  return groups;
});

hexo.extend.helper.register('natsu_is_excluded', isExcluded);

hexo.extend.helper.register('natsu_category', post => {
  if (!post.categories || !post.categories.length) return null;
  return post.categories.data[post.categories.length - 1];
});

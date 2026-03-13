{% extends "_layout.swig" %}

{% block title %} {{ config.title }} {% endblock %}

{% block content %}
  <section class="home-posts">
    {% for post in page.posts %}
      <article class="home-post">
        <h2 class="home-post-title">
          <a href="{{ url_for(post.path) }}">{{ post.title }}</a>
        </h2>
        <div class="home-post-meta">
          <time>{{ date(post.date, 'MMM D, YYYY') }}</time>
          {% if post.categories and post.categories.length %}
            <span class="sep">·</span>
            {% for cat in post.categories %}<a href="{{ url_for(cat.path) }}" class="home-post-category">{{ cat.name }}</a>{% endfor %}
          {% endif %}
        </div>
        {% if post.excerpt or post.description %}
          <div class="home-post-excerpt">
            {{ strip_html(post.excerpt or post.description) | truncate(160) }}
          </div>
        {% endif %}
      </article>
    {% endfor %}
  </section>

  {% include "_partial/pagination.swig" %}
{% endblock %}

{% if theme.social %}
  <div class="social-links">
    {% for name, path in theme.social %}
      {% if path %}
        {% if name == 'email' %}
          <a href="mailto:{{ path }}" class="social-link" title="Email">Email</a>
        {% else %}
          <a href="{{ url_for(path) }}" class="social-link" title="{{ name }}" target="_blank" rel="noopener">{{ name | capitalize }}</a>
        {% endif %}
      {% endif %}
    {% endfor %}

    {% if theme.rss %}
      <a href="{{ url_for('atom.xml') }}" class="social-link" title="RSS">RSS</a>
    {% endif %}
  </div>
{% endif %}

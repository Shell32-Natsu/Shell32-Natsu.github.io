{% if theme.friend_links %}
<div class="friend-links">
    <span>Links:&nbsp;</span>
    {% for name, path in theme.friend_links %}
        <a href="{{ url_for(path) }}" class="friend-links-item">{{ name }}</a>
    {% endfor %}
</div>
{% endif %}
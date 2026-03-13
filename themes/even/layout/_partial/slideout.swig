<div id="mobile-navbar" class="mobile-navbar">
  <div class="mobile-header-logo">
    <a href="{{ url_for('.') }}" class="logo">{{ config.title }}</a>
  </div>
  <div class="mobile-navbar-icon icon-out">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>

<nav id="mobile-menu" class="mobile-menu">
  <ul class="mobile-menu-list">
    {% for name, path in theme.menu %}
      <a href="{{ url_for(path) }}">
        <li class="mobile-menu-item">
          {% set itemName = 'menu.' + name.toLowerCase() %}
          {% if itemName.startsWith('menu') %}
            {{ name }}
          {% else %}
            {{ __(itemName) }}
          {% endif %}
        </li>
      </a>
    {% endfor %}
    <li class="mobile-menu-item">
      <button id="theme-toggle-mobile" class="theme-toggle" aria-label="Toggle dark mode" onclick="document.getElementById('theme-toggle').click()">
        <span class="moon">☾ Dark</span><span class="sun">☀ Light</span>
      </button>
    </li>
  </ul>
</nav>

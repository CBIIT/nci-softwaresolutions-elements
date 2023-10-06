# nci-softwaresolutions-elements

This repository demonstrates a pattern for efficiently distributing alerts across websites. A centralized HTML snippet, loaded by a web component, is rendered in the header of each application. This approach enables applications to display up-to-date alerts, such as official shutdown notices, without requiring code changes.

### Example Usage
```html
<head>
  ...
  <!-- Import web component -->
  <script src="https://cbiit.github.io/nci-softwaresolutions-elements/components/include-html.js"></script>
</head>

<body>
  <header>
    <!-- Set component's src attribute to url of html snippet -->
    <include-html src="https://cbiit.github.io/nci-softwaresolutions-elements/banners/government-shutdown-test.html"></include-html>
    ...
  </header>
  ...
</body>
```
<!DOCTYPE html>

<html lang="fr-FR">
<head>
    <meta charset="utf-8">
    <title>TITLE</title>
    <meta name="description" content="DESCRIPTION">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="AUTHOR">
    <link rel="stylesheet" href="/assets/style.css">
</head>

<body>
<div>
  <form action="" method="POST" id="example-form" class="form" autocomplete="off">
    <fieldset class="form__fieldset">

      <div class="form__field">
        <label for="name" class="form__label">Nom</label>
        <input 
          type="text" 
          id="name" 
          class="form__input" 
          name="name" 
          required
        >
      </div>

      <div class="form__field">
        <label for="email" class="form__label">Email</label>
        <input 
          type="text" 
          id="email" 
          class="form__input" 
          name="email" 
          required
        >
      </div>

      <div class="form__field">
        <label for="shirtsize" class="form__label">Taille de T-Shirt</label>
        <select 
          id="shirtsize" 
          class="form__input" 
          name="shirtsize"
        >
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">XLarge</option>
        </select>
      </div>

      <div class="form__actions">
        <button type="submit" class="btn btn--primary" id="submit">Valider</button>
        <div id="feedback" class="form__feedback" aria-live="assertive" role="alert"></div>
      </div>

    </fieldset>
  </form>
</div>
    <script type='text/javascript' src="./assets/axios.min.js"></script>
    <script type='text/javascript' src='./assets/offlineforms.js'></script>
</body>
</html>
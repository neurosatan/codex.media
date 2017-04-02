<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="language" content="<?= I18n::$lang ?>">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:site_name" content="<?= $GLOBALS['SITE_NAME'] ?>" />

    <title><?= $title ? $title : $GLOBALS['SITE_NAME'] . ': ' . $GLOBALS['SITE_SLOGAN'] ?></title>

    <base href="/" />

    <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700&subset=cyrillic" rel="stylesheet">


    <link rel="stylesheet" type="text/css" media="all" href="/public/build/bundle.css?v=<?= filemtime('public/build/bundle.css'); ?>">
    <link rel="icon" type="image/png" href="/favicon.png">

    <script src="/public/build/bundle.js?v=<?= filemtime('public/build/bundle.js'); ?>"></script>

</head>
<body class="fullscreen-writing">

<?= View::factory('templates/components/branding')->render(); ?>

<div class="center-col" id="js-layout-holder">

    <div class="grid-cols-wrapper">

        <? /* Main block for page */ ?>
        <div class="grid-content grid-content--no-border">
            <?= View::factory('templates/pages/writing', array('page' => $page)) ?>
        </div>

    </div>

</div>

<? /* Scripts */ ?>

<script>

    window.csrf = '<?= Security::token(); ?>';

</script>

<? /* end Scripts */ ?>


<? if ( Kohana::$environment === Kohana::PRODUCTION ): ?>

    <!-- Yandex.Metrika counter -->

    <!-- /Yandex.Metrika counter -->

<? endif; ?>

</body>
</html>

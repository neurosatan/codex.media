<? if (!empty($site_menu)): ?>
    <ul class="menu" id="menu">
        <? foreach ($site_menu as $item): ?>
            <li><a href="/p/<?= $item->id ?>/<?= $item->uri ?>"><?= $item->title ?></a></li>
        <? endforeach ?>
    </ul>
<? else: ?>
    <ul class="menu" id="menu"></ul>
<? endif; ?>
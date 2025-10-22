<div class="cms-sitename">
    <a href="#" class="cms-sitename__link font-icon-silverstripe font-icon-large" target="_blank">
    </a>
    <a class="cms-sitename__logo" href="{$BaseHref}" target="_blank">
        <% with $SiteConfig %>
            <div class="cms-sitename__image darkmode-on">
                <% if $getLogoOnBlackURL(false) %>
                    <img src="{$LogoOnBlackURL}" width="{$LogoOnBlackWidth}" height="{$LogoOnBlackHeight}" alt="{$Title}">
                <% else %>
                    <b class="cms-sitename__heading">{$Title}</b>
                <% end_if %>
            </div>

            <div class="cms-sitename__image darkmode-off">
                <% if $getLogoOnWhiteURL(false) %>
                    <img src="{$LogoOnWhiteURL}" width="{$LogoOnWhiteWidth}" height="{$LogoOnWhiteHeight}" alt="{$Title}">
                <% else %>
                    <b class="cms-sitename__heading">{$Title}</b>
                <% end_if %>
            </div>
        <% end_with %>
    </a>
</div>

<cms-colour-picker class="silverstripe-cms-theme" data-colours="#77cdff, #af9fff, #FFA6C9, #ff7d7d, #ffa070, #f5d679, #98c894">
    <template>
        <div class="silverstripe-cms-theme__option">
            <input type="radio" name="cms-theme" id="CMSThemeColour_{{index}}" value="{{value}}">
            <label for="CMSThemeColour_{{index}}" class="silverstripe-cms-theme__label" style="background-color: {{value}};"></label>
        </div>
    </template>
</cms-colour-picker>

<div class="silverstripe-cms-version">
    <span>SilverStripe {$CMSVersionNumber} | Marmalade 6</span>
</div>
